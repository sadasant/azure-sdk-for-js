// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import * as crypto from "crypto";
import keyto from "@trust/keyto";
import { getKeyvaultName } from "./utils/utils.common";
import { KeysClient } from "../src";
import { EnvironmentCredential } from "@azure/identity";
import {
  record,
  setReplaceableVariables,
  setReplacements,
} from "./utils/recorder";

describe.only("Keys client - encrypt & decrypt", () => {
  let client: KeysClient;
  let recorder: any;

  before(async function() {
    // NOTE:
    // setReplaceableVariables and setReplacements are reused just to put their ussage in the open,
    // to avoid having them obscured into a generic utility file. Once the recording tool is centralized
    // we can move these somewhere else!
    setReplaceableVariables({
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    });

    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
    ]);

    recorder = record(this); // eslint-disable-line no-invalid-this
    const credential = await new EnvironmentCredential();
    const keyVaultName = getKeyvaultName();
    const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);
  });

  after(async function() {
    recorder.stop();
  });

  // The tests follow

  it("RSA-OAEP", async function() {
    const keyName = "CRYPTOTEST01";
    const key = await client.getKey(keyName);
    const keyPEM = keyto.from(key.keyMaterial!, "jwk").toString('pem', 'public_pkcs1');
    const source = "ornithorhynchus anatinus";
    const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(source));
    const { result } = await client.decrypt(keyName, key.version, "RSA-OAEP", new Uint8Array(encrypted));
    assert.equal(result.toString("utf8"), source);
  });

  it("RSA-OAEP-256", async function() {
    // Not a thing yet: https://github.com/nodejs/node/pull/28335
  });

  it("RSA1_5", async function() {
    const keyName = "CRYPTOTEST01";
    const key = await client.getKey(keyName);
    const keyPEM = keyto.from(key.keyMaterial!, "jwk").toString('pem', 'public_pkcs1');
    const source = "ornithorhynchus anatinus";
    const encrypted = crypto.publicEncrypt({
      key: keyPEM,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(source));
    const { result } = await client.decrypt(keyName, key.version, "RSA1_5", new Uint8Array(encrypted));
    assert.equal(result.toString("utf8"), source);
  });

});
