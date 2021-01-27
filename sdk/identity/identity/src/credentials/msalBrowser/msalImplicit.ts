import * as msal from "msal";
import { AuthenticationRecord } from "../../client/msalClient";
import { credentialLogger } from "../../util/logging";
import { BrowserLoginStyle } from "../interactiveBrowserCredentialOptions";
import { MSALBrowserFlow, MSALOptions } from "./msalCommon";

const logger = credentialLogger("MSAL Browser v1 - Implicit Grant Flow");

export class MSALImplicit implements MSALBrowserFlow {
  private config: msal.Configuration;
  private app: msal.UserAgentApplication;  
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
      }
    };

    this.app = new msal.UserAgentApplication(this.config);
  }

  private async handleResult(result: msal.AuthResponse | null): Promise<AuthenticationRecord | undefined> {
  }

  public async handleRedirect(): Promise<AuthenticationRecord | undefined> {
    this.app.handleRedirectCallback((error) => {
      if (error) {
        throw error;
      }
      logger.info(`Authentication successful.`);
    });
  }

  public async login(scopes: string | string[] = []): Promise<AuthenticationRecord | undefined> {
    switch (this.loginStyle) {
      case "redirect": {
        const loginPromise = new Promise<msal.AuthResponse>((resolve, reject) => {
          this.app.handleRedirectCallback(resolve, reject);
        });
        this.app.loginRedirect();
        return loginPromise;
      }
      case "popup":
        return this.app.loginPopup();
    }
  }

  public getActiveAccount(): AuthenticationRecord | undefined {
    return this.app.getActiveAccount() || undefined;
  }
}
