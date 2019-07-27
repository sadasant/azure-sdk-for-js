// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";
import { CryptographyClient, Key, KeysClient } from "../src";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { str2ab, ab2str } from "./utils/crypto"

describe.only("CryptographyClient", () => {
  let client: KeysClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: any;
  let credential: ClientSecretCredential;
  let keyName: string;
  let key: Key;
  let keyVaultUrl: string;
  let keyUrl: string;

  before(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keyName = testClient.formatName("CryptographyClientTestKey");
    key = await client.createKey(keyName, "RSA");
    keyVaultUrl = key.vaultUrl;
    keyUrl = key.keyMaterial!.kid as string;
    cryptoClient = new CryptographyClient(keyVaultUrl, keyUrl, credential);
  });

  after(async function() {
    await testClient.flushKey(keyName);
    recorder.stop();
  });

  // The tests follow

  it("getKey from key URL", async function() {
    const cryptoClient = new CryptographyClient(keyVaultUrl, keyUrl, credential);
    const getKeyResult = await cryptoClient.getKey();
    assert.equal(getKeyResult.kid, keyUrl)
  });

  it.skip("getKey from JWK key");

  // TODO: How to make a key that can't be read locally?
  // I did run this test before adding local support.
  it.skip("encrypt & decrypt remotely with RSA-OAEP", async function() {
    const cryptoClient = new CryptographyClient(keyVaultUrl, keyUrl, credential);
    const text = this.test!.title;
    const bufferText = str2ab(text);
    const encrypted = await cryptoClient.encrypt(bufferText, "RSA-OAEP");
    const decrypted = await cryptoClient.decrypt(encrypted, "RSA-OAEP");
    const decryptedText = ab2str(decrypted);
    assert.equal(text, decryptedText);
  });
 
  it("encrypt & decrypt locally with RSA-OAEP", async function() {
    const text = this.test!.title;
    const bufferText = str2ab(text);
    const encrypted = await cryptoClient.encrypt(bufferText, "RSA-OAEP");
    const decrypted = await cryptoClient.decrypt(encrypted, "RSA-OAEP");
    const decryptedText = ab2str(decrypted);
    assert.equal(text, decryptedText);
  });
});
