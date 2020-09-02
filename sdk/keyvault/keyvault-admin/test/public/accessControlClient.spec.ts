// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { v4 as uuidv4 } from "uuid";
import { env, Recorder } from "@azure/test-utils-recorder";
// import { AbortController } from "@azure/abort-controller";

import { KeyVaultAccessControlClient } from '../../src';
// import { assertThrowsAbortError } from "../utils/common";
// import { testPollerProperties } from "../utils/recorder";
import { authenticate } from "../utils/authentication";

describe("KeyVaultAccessControlClient", () => {
  let client: KeyVaultAccessControlClient;
  let recorder: Recorder;
  const globalScope = "/";

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("listRoleDefinitions", async function() {
    const expectedType = "Microsoft.Authorization/roleDefinitions";
    let receivedRoles: string[] = [];

    for await (const roleDefinition of client.listRoleDefinitions("/")) {
      // Each role definition will have the shape of:
      //
      //   {
      //     id: 'Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/<ID>',
      //     name: '<ID>',
      //     type: '<role-type>',
      //     roleName: '<role-name>',
      //     // ...
      //   }
      //
      assert.equal(roleDefinition.type, expectedType);
      receivedRoles.push(roleDefinition.roleName!);
    }

    assert.deepEqual(receivedRoles, [
      "Managed HSM Administrator",
      "Managed HSM Crypto Officer",
      "Managed HSM Crypto User",
      "Managed HSM Policy Administrator",
      "Managed HSM Crypto Auditor",
      "Managed HSM Crypto Service Encryption"
    ]);
  });

  it("createRoleAssignment and deleteRoleAssignment", async function() {
    const roleDefinition = (await client.listRoleDefinitions(globalScope).next()).value;
    const name = uuidv4();
    const assignment = await client.createRoleAssignment(globalScope, name, roleDefinition.id!, env.AZURE_TENANT_ID);
    assert.equal(assignment.name, name);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.AZURE_TENANT_ID);
    await client.deleteRoleAssignment(globalScope, name);
  });

  it("createRoleAssignment, getRoleAssignment and deleteRoleAssignment", async function() {
    const roleDefinition = (await client.listRoleDefinitions(globalScope).next()).value;
    const name = uuidv4();
    await client.createRoleAssignment(globalScope, name, roleDefinition.id!, env.AZURE_TENANT_ID);
    const assignment = await client.getRoleAssignment(globalScope, name);    
    assert.equal(assignment.name, name);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.AZURE_TENANT_ID);
    await client.deleteRoleAssignment(globalScope, name);
  });
});