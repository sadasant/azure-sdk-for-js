// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import * as assert from "assert";
import { Recorder } from "@azure/test-utils-recorder";
// import { AbortController } from "@azure/abort-controller";

import { KeyVaultAccessControlClient } from '../../src';
// import { assertThrowsAbortError } from "../utils/common";
// import { testPollerProperties } from "../utils/recorder";
import { authenticate } from "../utils/authentication";

describe("KeyVaultAccessControlClient", () => {
  // const prefix = "RBAC";
  // let suffix: string;
  let client: KeyVaultAccessControlClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    // suffix = authentication.suffix;
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow
  it("listRoleDefinitions", async function() {
    for await (const roleDefinitions of client.listRoleDefinitions("/")) {
      console.log("Role definition: ", roleDefinitions);
    }
  });
  it("createRoleAssignment", async function() {
  });
  it("getRoleAssignment", async function() {
  });
  it("deleteRoleAssignment", async function() {
  });
});