import { AuthenticationRecord } from "../../client/msalClient";
import { BrowserLoginStyle } from "../interactiveBrowserCredentialOptions";

export interface MSALOptions {
  clientId?: string;
  tenantId?: string;
  authorityHost?: string;
  knownAuthorities?: string[];
  redirectUri?: string;
  postLogoutRedirectUri?: string,
  authenticationRecord?: AuthenticationRecord,
  loginStyle: BrowserLoginStyle
}

export interface MSALBrowserFlow {
  handleRedirect(): Promise<AuthenticationRecord | undefined>;
  login(scopes: string | string[]): Promise<AuthenticationRecord | undefined>;
  getActiveAccount(): AuthenticationRecord | undefined;
}
