// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import { AbortController } from "@azure/abort-controller";
import { env, delay } from "@azure/test-utils-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientSecretCredential, RegionalAuthority } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { Context } from "mocha";

describe("ClientSecretCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function(this: Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    );
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Authenticates silently after the initial request", async function() {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);

    // Even though we're providing the same default in memory persistence cache that we use for DeviceCodeCredential,
    // The Client Secret flow does not return the account information from the authentication service,
    // so each time getToken gets called, we will have to acquire a new token through the service.
    assert.equal(doGetTokenSpy.callCount, 2);
  });

  it("supports specifying the regional authority", async function() {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET,
      {
        regionalAuthority: RegionalAuthority.AutoDiscoverRegion
      }
    );

    // We'll abort since we only want to ensure the parameters are sent apporpriately.
    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal
    });
    await delay(5);
    controller.abort();
    try {
      await getTokenPromise;
    } catch (e) {
      // Nothing to do here.
    }

    assert.equal(
      doGetTokenSpy.getCall(0).args[0].azureRegion,
      RegionalAuthority.AutoDiscoverRegion
    );
  });
});
