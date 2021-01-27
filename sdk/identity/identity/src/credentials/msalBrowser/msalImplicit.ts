import * as msal from "msal";
import { AuthenticationRecord } from "../../client/msalClient";
import { credentialLogger } from "../../util/logging";
import {
  BrowserLoginStyle,
  InteractiveBrowserAuthenticateOptions
} from "../interactiveBrowserCredentialOptions";
import { IMSALBrowserFlow, IMSALToken, MSALOptions } from "./msalCommon";

const logger = credentialLogger("MSAL Browser v1 - Implicit Grant Flow");

export class MSALImplicit implements IMSALBrowserFlow {
  private config: msal.Configuration;
  private app: msal.UserAgentApplication;
  private loginStyle: BrowserLoginStyle;
  private correlationId?: string;
  private tenantId: string;

  constructor(options: MSALOptions) {
    this.loginStyle = options.loginStyle;
    this.correlationId = options.correlationId;
    this.tenantId = options.tenantId!;
    this.config = {
      auth: {
        clientId: options.clientId!, // we just initialized it above
        authority: `${options.authorityHost}/${options.tenantId}`,
        knownAuthorities: options.knownAuthorities,
        redirectUri: options.redirectUri,
        postLogoutRedirectUri: options.postLogoutRedirectUri
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true // Set to true to improve the experience on IE11 and Edge.
      }
    };

    this.app = new msal.UserAgentApplication(this.config);
  }

  private handleAccount(account: msal.Account): AuthenticationRecord {
    return {
      homeAccountId: account.homeAccountIdentifier,
      environment: account.environment,
      tenantId: this.tenantId,
      localAccountId: account.accountIdentifier,
      username: account.environment
    };
  }

  private async handleResult(
    result: msal.AuthResponse | null
  ): Promise<AuthenticationRecord | undefined> {
    if (result?.account) {
      return this.handleAccount(result?.account);
    }
    return;
  }

  public async handleRedirect(): Promise<AuthenticationRecord | undefined> {
    this.app.handleRedirectCallback((error) => {
      if (error) {
        throw error;
      }
      logger.info(`Authentication successful.`);
    });
    return;
  }

  public async login(): Promise<AuthenticationRecord | undefined> {
    switch (this.loginStyle) {
      case "redirect": {
        const loginPromise = new Promise<msal.AuthResponse>((resolve, reject) => {
          this.app.handleRedirectCallback(resolve, reject);
        });
        this.app.loginRedirect();
        return this.handleResult(await loginPromise);
      }
      case "popup":
        return this.handleResult(await this.app.loginPopup());
    }
  }

  public getActiveAccount(): AuthenticationRecord | undefined {
    return this.handleAccount(this.app.getAccount()) || undefined;
  }

  /**
   * Allows users to manually authenticate and retrieve the AuthenticationRecord.
   * @param options Optional parameters to authenticate with, like the scope.
   */
  public async authenticate(): Promise<AuthenticationRecord | undefined> {
    // We ensure that redirection is handled at this point.
    await this.handleRedirect();

    // If we have an active account, we return that.
    let account = this.getActiveAccount();
    if (account) {
      return account;
    }

    // Otherwise we try to login.
    return this.login();
  }

  public async acquireToken(
    options: InteractiveBrowserAuthenticateOptions
  ): Promise<IMSALToken | undefined> {
    await this.authenticate();

    const scopes = options.scopes;
    if (!scopes) {
      throw new Error(
        `Invalid scopes in the acquireToken function of the MSAL Auth Code flow. Received: ${scopes}`
      );
    }

    const silentRequest: msal.AuthenticationParameters = {
      authority: this.config.auth.authority!,
      correlationId: this.correlationId, // If undefined, MSAL will automatically generate one.
      scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
    };

    let authResponse: msal.AuthResponse | undefined;

    try {
      logger.info("Attempting to acquire token silently");
      authResponse = await this.app.acquireTokenSilent(silentRequest);
    } catch (err) {
      if (err instanceof msal.AuthError) {
        switch (err.errorCode) {
          case "consent_required":
          case "interaction_required":
          case "login_required":
            logger.info(`Authentication returned errorCode ${err.errorCode}`);
            break;
          default:
            logger.info(`Failed to acquire token: ${err.message}`);
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
          await this.app.acquireTokenRedirect(silentRequest);
          return undefined;
        case "popup":
          authResponse = await this.app.acquireTokenPopup(silentRequest);
          break;
      }
    }

    return {
      accessToken: authResponse.accessToken,
      expiresOn: authResponse.expiresOn
    };
  }
}
