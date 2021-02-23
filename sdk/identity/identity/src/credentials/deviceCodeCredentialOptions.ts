// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationRecord } from "../client/msalClient";

/**
 * Defines options for the DeviceCodeCredential class.
 */
export interface DeviceCodeCredentialOptions extends TokenCredentialOptions {
  /**
   * Correlation ID that can be customized to keep track of the browser authentication requests.
   */
  correlationId?: string;

  /**
   * Result of a previous authentication that can be used to retrieve the cached credentials of each individual account.
   * This is necessary to provide in case the application wants to work with more than one account per
   * Client ID and Tenant ID pair.
   *
   * This record can be retrieved by calling to the InteractiveBrowserCredential's `authenticate()` method, as follows:
   *
   *     const authenticationRecord = await credential.authenticate();
   *
   */
  authenticationRecord?: AuthenticationRecord;
}
