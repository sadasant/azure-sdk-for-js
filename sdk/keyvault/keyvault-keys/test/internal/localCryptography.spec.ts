// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  validators,
  localSupportedAlgorithms,
  LocalSupportedAlgorithmName
} from "../../src/localCryptography/algorithms";
import { JsonWebKey, KeyClient, CryptographyClient, SignatureAlgorithm, LocalCryptographyClient } from "../../src";
import * as chai from "chai";
import { isNode } from "@azure/core-http";
import { createHash } from "crypto";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { Recorder, env } from "@azure/test-utils-recorder";
import { ClientSecretCredential } from "@azure/identity";
const { assert } = chai;

describe("Local cryptography tests", () => {
  const keyPrefix = `localCrypto${env.KEY_NAME || "KeyName"}`;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keySuffix: string;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
  });

  afterEach(async function() {
    recorder.stop();
  });

  describe("validators", () => {
    describe("keyOps", () => {
      it("can validate if a key has a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [supportedOperation]
        };
        assert.doesNotThrow(() => validators.keyOps(jsonWebKey, supportedOperation));
      });
      it("throws if a key doesn't have a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [
            /* No supported operation */
          ]
        };
        assert.throws(() => validators.keyOps(jsonWebKey, supportedOperation));
      });
    });

    describe("rsa", () => {
      it("can validate if a key type is RSA", async function() {
        const jsonWebKey: JsonWebKey = {
          kty: "RSA"
        };
        assert.doesNotThrow(() => validators.rsa(jsonWebKey));
      });
      it("throws if a key type is not RSA", async function() {
        const jsonWebKey: JsonWebKey = {};
        assert.throws(() => validators.rsa(jsonWebKey));
      });
    });

    describe("nodeOnly", () => {
      it("passes only if we're in node", async function() {
        if (!isNode) {
          this.skip();
          return;
        }
        assert.doesNotThrow(() => validators.nodeOnly());
      });
      it("throws if we're not in node", async function() {
        if (isNode) {
          this.skip();
          return;
        }
        assert.throws(() => validators.nodeOnly());
      });
    });
  });

  describe("client public operations", () => {
    describe("encrypt & decrypt", () => {
      it("RSA1_5", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const text = Buffer.from(this.test!.title);
        const encrypted = await localCryptoClient.encrypt("RSA1_5", text);
        const unwrapped = await localCryptoClient.decrypt("RSA1_5", encrypted.result);
        assert.deepEqual(unwrapped.result, text);
        await testClient.flushKey(keyName);
      });
      it.only("RSA-OAEP", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const jsonWebKey: JsonWebKey = {
          "p": Buffer.from("5qCPf-yxEMHHCiTodWnVRz23421vhA_LB3rd-3vKlnINQoN1pxCnkFpKXMxKnmu3eAahRe9g8D1iTbo50t4OTHyXQzPYBNrSfX0xp8zcaPmH5ba-piiMcNGMFOQg_N7oywMwfuASEPP5Ex1CyyC9mJlCV_QN1UC7yWpgp1Uso3k", "base64"),
          "kty": "RSA",
          "q": Buffer.from("lTgmsfChDLBWHvFuAgnlGcvO-uzp6fE-JNSIBPsDZbNoznJJSr-xzmLDgZtmcIIzvQ-xfV7Ipj_TdV2e89NbE7tonxJPbqgd2lswe9ZaRUYGe9r7imfZQDIvr1YBUF4SV5nfze6In2gV6oVK8e2DyqUSxnNm8zFfMIWT2-TJN9U", "base64"),
          "d": Buffer.from("kXR-1BGrMQnqBlBIfQ5606deI1GpOMMUDzfQcMMa-3tn4NgHfR4cUvxD__rrTHfxV-0IEcsJdvEYJD2_SJHZk6euY0QtVPkZ5PfLU1Mk3qjNqsLQn-XcinhVfvo4UYRxqQoF9KpepE6EMVDwVRKTh32D2qfen0SM5Vy9FaH_ZVN4gGoJ-CcUAszMWCP_vnxCTaScy7mFs8QIDYpJfx4Z_2Hbyc71-rJqvPa5mEy3W1puWGC8nNYzZ1L7ig9FWHT0Jmuvnt47ym58C7xr2uh8lDCYN38yuxNh9FbFUdrXmeU4dpgTRq7YljpgcfAM2Vq-eMsWI27r_u2u8iMGr5rh", "base64"),
          "e": Buffer.from("AQAB", "base64"),
          "keyOps": ["encrypt", "decrypt"],
          "kid": "1",
          "qi": Buffer.from("gHF9gPFBhpi0Et20CZPTPGyLr3U9pmbVwDJkERRvVL22zJ0F9fJ0AGg0gaGKi1kRYCNm5LRbzoDK2HZYGC3MoT_s9WcNqv3KI97fbppFnQwwRm2A73mfCB64wToGKE_V2CPCv27NGyrVcMKjUc5a3TX1gK8GDaV3nTI8Utr96S8", "base64"),
          "dp": Buffer.from("dmbMBVMQ_Jdfhle4eD8jXfXTqJEQhW5OP8LWoDvHoEFhiVpQVrr4K-YO82F2laqbgKV2up7Q18XL6DfJY_bYxG_agIfnSWbGVeKmUY2dQs-I82hErK14nJsYHcmZHfma7k7u4NRMsiNvJl8JYZuneuaD5v_G8krPnfJdOMtDpZE", "base64"),
          "dq": Buffer.from("aSzv0UHrMhdkTGEdieBRk_IcjK7KXPOGOs12phQLG_bt632QfVhKSk9AwCy5cpnDQAI8t0JEqTGZqUL406Fos6rHnj94r2VdzVey_8ZhUCyAS3JZFAAImAAHrk0vlecIhKhXoD3-HGVv9SJIZedkmkPpzOjwan-lOX0db8N9tJU", "base64"),
          "n": Buffer.from("hm4JgPvWpwHyMh3bxhcTTNS-MLFCHfcJE66OAmGLUPJ-8l4uhEtpxAQ96DLBabc2WnLyIghqhRA6TQSEpMxeZw0tUyDeW6IiEowwVDYJa_LCYY-xzOd_BO1mjbBB5AgZHgVAsDty4iB-Jqk_ca-C3d3YlAcjYD4Ue8KqdqOoOodeHP7H7_tJCKTW98h1f0QV-5LOH4NP5oAlrFh0BYDn6687oVZHkTAl10iFRnGTsekpt-Ep4aNogHe8f2UTxmqTnChli_r0lRz1ZfzpCS3BLp8tRC4YvtwXoJaLiUSldR0qVqdwuvkRpg_hm3NlD424G7XAEulJTex4b1Otk0QCrQ", "base64")
      }
        const localCryptoClient = new LocalCryptographyClient(jsonWebKey)!;
        const text = Buffer.from(this.test!.title);
        const encrypted = await localCryptoClient.encrypt("RSA-OAEP", text);
        const decrypted = await localCryptoClient.decrypt("RSA-OAEP", encrypted.result);
        assert.deepEqual(decrypted.result, text);
        await testClient.flushKey(keyName);
      });
    });

    describe("wrapKey & unwrapKey", () => {
      it("RSA1_5", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const data = Buffer.from("arepa");
        const wrapped = await localCryptoClient.wrapKey("RSA1_5", data);

        // Local Cryptography Client part
        // unwrapKey is not implemented locally yet
        const unwrapped = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
        assert.deepEqual(unwrapped.result, data);
        await testClient.flushKey(keyName);
      });
      it("RSA-OAEP", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const data = Buffer.from("arepa");
        const wrapped = await localCryptoClient.wrapKey("RSA-OAEP", data);

        // Local Cryptography Client part
        // unwrapKey is not implemented locally yet
        const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
        assert.deepEqual(unwrapped.result, data);
        await testClient.flushKey(keyName);
      });
    });

    describe("verify", () => {
      const localSupportedAlgorithmNames = Object.keys(localSupportedAlgorithms);

      for (const localAlgorithmName of localSupportedAlgorithmNames) {
        const algorithm =
          localSupportedAlgorithms[localAlgorithmName as LocalSupportedAlgorithmName];
        const signAlgorithm = algorithm.signAlgorithm;

        if (!signAlgorithm) {
          continue;
        }

        it(localAlgorithmName, async function(): Promise<void> {
          recorder.skip(
            "browser",
            `Local sign of algorithm ${localAlgorithmName} is only supported in NodeJS`
          );

          if (!isNode) {
            // recorder.skip is not meant for TEST_MODE=live
            return this.skip();
          }

          const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
          const keyVaultKey = await client.createKey(keyName, "RSA");
          const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

          // Sign is not implemented yet.
          // This boils down to the JWK to PEM conversion, which doesn't support private keys at the moment.
          const signatureValue = this.test!.title;
          const hash = createHash(signAlgorithm);
          hash.update(signatureValue);
          const digest = hash.digest();
          const signature = await cryptoClient.sign(
            localAlgorithmName as SignatureAlgorithm,
            digest
          );

          // Local Cryptography Client part
          const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
          const verifyResult = await localCryptoClient.verifyData(
            localAlgorithmName as LocalSupportedAlgorithmName,
            digest,
            signature.result
          );
          assert.ok(verifyResult);

          await testClient.flushKey(keyName);
        });
      }
    });
  });
});
