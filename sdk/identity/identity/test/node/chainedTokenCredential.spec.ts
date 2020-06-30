// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { TokenCredential } from "@azure/core-http";
import {
  ChainedTokenCredential,
  EnvironmentCredential,
  TokenCredentialOptions,
  ManagedIdentityCredential
} from "../../src";

const errorMessages: Record<string, Record<string, string>> = {
  EnvironmentCredential: {
    environmentVariables: `* EnvironmentCredential - Environment variables are not fully configured.
  * Missing environment variables: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_CLIENT_CERTIFICATE_PATH, AZURE_USERNAME, AZURE_PASSWORD
  * Note:
    To authenticate with a service principal AZURE_TENANT_ID, AZURE_CLIENT_ID, and either AZURE_CLIENT_SECRET or AZURE_CLIENT_CERTIFICATE_PATH must be set.
    To authenticate with a user account AZURE_TENANT_ID, AZURE_USERNAME, and AZURE_PASSWORD must be set.
`
  },
  ManagedIdentityCredential: {
    noEndpoint: `* ManagedIdentityCredential - No managed identity endpoint found.`
  }
};

function newTestChainCredential(...credentialClasses: any[]): ChainedTokenCredential {
  class TestCredential extends ChainedTokenCredential {
    static credentials(tokenCredentialOptions?: TokenCredentialOptions): TokenCredential[] {
      return credentialClasses.map((X) => new X(tokenCredentialOptions));
    }
    constructor(tokenCredentialOptions?: TokenCredentialOptions) {
      super(...TestCredential.credentials(tokenCredentialOptions));
      this.classTitle = this.constructor.name;
    }
  }

  return new TestCredential();
}

async function getToken(credential: ChainedTokenCredential): Promise<Error> {
  let error: Error | undefined = undefined;
  try {
    await credential.getToken(["https://service/.default"], {
      requestOptions: { timeout: 100 }
    });
  } catch (e) {
    error = e;
  }
  return error!;
}

describe.only("ChainedTokenCredential", function() {
  describe("expected errors", function() {
    it("Throws as expected for EnvironmentCredential", async function() {
      const credential = newTestChainCredential(EnvironmentCredential);
      const error = await getToken(credential);
      assert.equal(
        error.message,
        `TestCredential tried the following credentials:

${errorMessages.EnvironmentCredential.environmentVariables}`
      );
    });

    it("Throws as expected for ManagedIdentityCredential", async function() {
      const credential = newTestChainCredential(ManagedIdentityCredential);
      const error = await getToken(credential);
      assert.equal(
        error!.message,
        `TestCredential tried the following credentials:

${errorMessages.ManagedIdentityCredential.noEndpoint}`
      );
    });

    it("Throws as expected when mixing both EnvironmentCredential and ManagedIdentityCredential", async function() {
      const credential = newTestChainCredential(EnvironmentCredential, ManagedIdentityCredential);
      const error = await getToken(credential);
      assert.equal(
        error!.message,
        `TestCredential tried the following credentials:

${errorMessages.EnvironmentCredential.environmentVariables}
${errorMessages.ManagedIdentityCredential.noEndpoint}`
      );
    });
  });
});
