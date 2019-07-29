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
  let localCryptoClient: CryptographyClient;
  let remoteCryptoClient: CryptographyClient;
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
    keyName = testClient.formatName("CryptographyClientTestKey0002");
    key = await client.createKey(keyName, "RSA");
    keyVaultUrl = key.vaultUrl;
    keyUrl = key.keyMaterial!.kid as string;
    remoteCryptoClient = new CryptographyClient(keyVaultUrl, key.keyMaterial!.kid!, credential);
    localCryptoClient = new CryptographyClient(keyVaultUrl, key.keyMaterial!, credential);
  });

  after(async function() {
    await testClient.flushKey(keyName);
    recorder.stop();
  });

  // The tests follow

  it("getKey from client initialized with a key URL", async function() {
    const getKeyResult = await remoteCryptoClient.getKey();
    assert.equal(getKeyResult.kid, keyUrl);
  });

  it("getKey from client initialized with a JWK key", async function() {
    const getKeyResult = await localCryptoClient.getKey();
    assert.equal(getKeyResult.kid, key.keyMaterial!.kid);
  });

  it("encrypt & decrypt remotely with RSA1_5", async function() {
    const text = this.test!.title;
    const encrypted = await remoteCryptoClient.encrypt(str2ab(text), "RSA1_5");
    const decrypted = await remoteCryptoClient.decrypt(encrypted, "RSA1_5");
    const decryptedText = ab2str(decrypted);
    assert.equal(text, decryptedText);
  });

  it("encrypt & decrypt locally with RSA1_5", async function() {
    const text = this.test!.title;
    const encrypted = await localCryptoClient.encrypt(str2ab(text), "RSA1_5");
    const decrypted = await localCryptoClient.decrypt(encrypted, "RSA1_5");
    const decryptedText = ab2str(decrypted);
    assert.equal(text, decryptedText);
  });
});
