// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalBrowser from "@azure/msal-browser";
import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { IdentityClient } from "../client/identityClient";
import {
  BrowserLoginStyle,
  InteractiveBrowserCredentialAuthenticateOptions,
  InteractiveBrowserCredentialOptions
} from "./interactiveBrowserCredentialOptions";
import { createSpan } from "../util/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { AuthenticationRecord } from "../client/msalClient";
import { MSAL2, MSALAuthCode } from "./msalBrowser/msalAuthCode";
import { MSAL1, MSALImplicit } from "./msalBrowser/msalImplicit";
import { MSALOptions } from "./msalBrowser/msalCommon";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private tenantId: string;
  private clientId: string;
  private loginStyle: BrowserLoginStyle;
  private correlationId: string | undefined;
  private msal: MSALImplicit | MSALAuthCode;

  /**
   * Creates an instance of the InteractiveBrowserCredential with the
   * details needed to authenticate against Azure Active Directory with
   * a user identity.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options?: InteractiveBrowserCredentialOptions) {
    this.tenantId = (options && options.tenantId) || DefaultTenantId;

    // TODO: temporary - this is the Azure CLI clientID - we'll replace it when
    // Developer Sign On application is available
    // https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/identity/Azure.Identity/src/Constants.cs#L9
    this.clientId = (options && options.clientId) || DeveloperSignOnClientId;

    options = {
      ...IdentityClient.getDefaultOptions(),
      ...options,
      tenantId: this.tenantId,
      clientId: this.clientId
    };

    this.loginStyle = options.loginStyle || "popup";
    const loginStyles = ["redirect", "popup"];
    if (loginStyles.indexOf(this.loginStyle) === -1) {
      const error = new Error(
        `Invalid loginStyle: ${
          options.loginStyle
        }. Should be any of the following: ${loginStyles.join(", ")}.`
      );
      logger.info(formatError("", error));
      throw error;
    }
      

    this.correlationId = options.correlationId;

    const msalOptions: MSALOptions = {
      loginStyle: this.loginStyle,
      clientId: options.clientId,
      tenantId: options.tenantId,
      authorityHost: options.authorityHost,
      knownAuthorities: options.tenantId === "adfs" ? (options.authorityHost ? [options.authorityHost] : []) : [],
      redirectUri: typeof options.redirectUri === "function" ? options.redirectUri() : options.redirectUri,
      postLogoutRedirectUri:
      typeof options.postLogoutRedirectUri === "function"
        ? options.postLogoutRedirectUri()
        : options.postLogoutRedirectUri,
      authenticationRecord: options.authenticationRecord
    };

    if (options.flow === "implicit-grant") {
      this.msal = new MSALImplicit(msalOptions);
    } else {
      this.msal = new MSALAuthCode(msalOptions);
    }

    if (options.loginStyle === "redirect") {
      this.msal.handleRedirect();
    }
  }

  /**
   * Allows users to manually authenticate and retrieve the AuthenticationRecord.
   * @param options Optional parameters to authenticate with, like the scope.
   */
  public async authenticate(
    options: InteractiveBrowserCredentialAuthenticateOptions
  ): Promise<AuthenticationRecord | undefined> {
    // We ensure that redirection is handled at this point.
    await this.msal.handleRedirect();

    // If we have an active account, we return that.
    let account = this.msal.getActiveAccount();
    if (account) {
      return account;
    }

    // Otherwise we try to login.
    return this.handleAuthResult(await this.login(options.scopes!));
  }

  private async acquireToken(
    authParams: msalBrowser.SilentRequest
  ): Promise<msalBrowser.AuthenticationResult | undefined> {
    let authResponse: msalBrowser.AuthenticationResult | undefined;
    try {
      logger.info("Attempting to acquire token silently");
      authResponse = await this.msalObject.acquireTokenSilent(authParams);
    } catch (err) {
      if (err instanceof msalBrowser.AuthError) {
        switch (err.errorCode) {
          case "consent_required":
          case "interaction_required":
          case "login_required":
            logger.info(`Authentication returned errorCode ${err.errorCode}`);
            break;
          default:
            logger.info(formatError(authParams.scopes, `Failed to acquire token: ${err.message}`));
            throw err;
        }
      }
    }

    if (authResponse === undefined) {
      logger.info(
        `Silent authentication failed, falling back to interactive method ${this.loginStyle}`
      );
      switch (this.loginStyle) {
        case "redirect":
          // This will go out of the page.
          // Once the InteractiveBrowserCredential is initialized again,
          // we'll load the MSAL account in the constructor.
          await this.msalObject.acquireTokenRedirect(authParams);
          return undefined;
        case "popup":
          authResponse = await this.msalObject.acquireTokenPopup(authParams);
          break;
      }
    }

    return authResponse;
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                  TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span } = createSpan("InteractiveBrowserCredential-getToken", options);
    try {
      const account = await this.authenticate({
        scopes,
        ...options
      });

      const authResponse = await this.acquireToken({
        authority: this.msalConfig.auth.authority!,
        correlationId: this.correlationId, // If undefined, MSAL will automatically generate one.
        account,
        forceRefresh: false,
        scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
      });

      if (!authResponse) {
        logger.getToken.info("No response");
        return null;
      }

      if (!authResponse.expiresOn) {
        logger.getToken.info(`Response had no "expiresOn" property.`);
        return null;
      }

      if (authResponse) {
        const expiresOnTimestamp = authResponse.expiresOn.getTime();
        logger.getToken.info(formatSuccess(scopes));
        return {
          token: authResponse.accessToken,
          expiresOnTimestamp
        };
      } else {
        logger.getToken.info("No response");
        return null;
      }
    } catch (err) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });
      logger.getToken.info(formatError(scopes, err));
      throw err;
    } finally {
      span.end();
    }
  }
}
