import * as msalBrowser from "@azure/msal-browser";
import { AuthenticationRecord } from "../../client/msalClient";
import { credentialLogger } from "../../util/logging";
import { BrowserLoginStyle } from "../interactiveBrowserCredentialOptions";
import { MSALBrowserFlow, MSALOptions } from "./msalCommon";

const logger = credentialLogger("MSAL Browser v2 - Auth Code Flow");

// We keep a copy of the redirect hash.
const redirectHash = window.location.hash;

export class MSALAuthCode implements MSALBrowserFlow {
  private config: msalBrowser.Configuration;
  private app: msalBrowser.PublicClientApplication;
  private loginStyle: BrowserLoginStyle;
  
  constructor(options: MSALOptions) {
    this.loginStyle = options.loginStyle;
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
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case msalBrowser.LogLevel.Error:
                logger.info(`MSAL Browser V2 error: ${message}`);
                return;
              case msalBrowser.LogLevel.Info:
                logger.info(`MSAL Browser V2 info message: ${message}`);
                return;
              case msalBrowser.LogLevel.Verbose:
                logger.info(`MSAL Browser V2 verbose message: ${message}`);
                return;
              case msalBrowser.LogLevel.Warning:
                logger.info(`MSAL Browser V2 warning: ${message}`);
                return;
            }
          }
        }
      }
    };

    this.app = new msalBrowser.PublicClientApplication(this.config);

    if (options.authenticationRecord) {
      this.app.setActiveAccount(options.authenticationRecord);
    }
  }

  private async handleResult(result: msalBrowser.AuthenticationResult | null): Promise<AuthenticationRecord | undefined> {
    try {
      if (result && result.account) {
        logger.info(`MSAL Browser V2 authentication successful.`);
        this.app.setActiveAccount(result.account);
        return result.account;
      }

      // If by this point we happen to have an active account, we should stop trying to parse this.
      const activeAccount = this.app.getActiveAccount();
      if (activeAccount) {
        return activeAccount;
      }

      // If we don't have an active account, we try to activate it from all the already loaded accounts.
      const accounts = this.app.getAllAccounts();
      if (accounts.length > 1) {
        // If there's more than one account in memory, we force the user to authenticate again.
        // At this point we can't identify which account should this credential work with,
        // since at this point the user won't have provided enough information.
        // We log a message in case that helps.
        logger.info(
          [
            "More than one account was found authenticated for this Client ID and Tenant ID.",
            "However, no `authenticationRecord` has been provided for this credential,",
            "therefore we're unable to pick between these accounts.",
            "A new login attempt will be requested, to ensure the correct account is picked.",
            "To work with multiple accounts for the same Client ID and Tenant ID, please provide an `authenticationRecord` when initializing `InteractiveBrowserCredential`."
          ].join("\n")
        );
        // To safely trigger a new login, we're also ensuring the local cache is cleared up for this MSAL object.
        // However, we want to avoid kicking the user out of their authentication on the Azure side.
        // We do this by calling to logout while specifying a `onRedirectNavigate` that returns false.
        await this.app.logout({
          onRedirectNavigate: () => false
        });
        return;
      }

      // If there's only one account for this MSAL object, we can safely activate it.
      if (accounts.length === 1) {
        this.app.setActiveAccount(accounts[0]);
        return accounts[0];
      }

      logger.info(`No accounts were found through MSAL.`);
    } catch (e) {
      logger.info(`Failed to acquire token through MSAL. ${e.message}`);
    }
    return;    
  }

  public async handleRedirect(): Promise<AuthenticationRecord | undefined> {
    return this.handleResult(await this.app.handleRedirectPromise(redirectHash));
  }

  public async login(scopes: string | string[] = []): Promise<AuthenticationRecord | undefined> {
    const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
    const loginRequest = {
      scopes: arrayScopes
    };
    switch (this.loginStyle) {
      case "redirect": {
        await this.app.loginRedirect(loginRequest);
        return;
      }
      case "popup":
        return this.handleResult(await this.app.loginPopup(loginRequest));
    }
  }

  public getActiveAccount(): AuthenticationRecord | undefined {
    return this.app.getActiveAccount() || undefined;
  }
}
