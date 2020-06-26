// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  JsonWebKey,
  GetKeyOptions,
  CryptographyOptions,
  KeyVaultKey,
  EncryptionAlgorithm,
  CryptographyClientOptions,
  LATEST_API_VERSION
} from "./keysModels";
import {
  TokenCredential,
  isNode,
  createPipelineFromOptions,
  isTokenCredential,
  RequestOptionsBase,
  signingPolicy,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";

import { getTracer } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";
import { logger } from "./log";
import { parseKeyvaultIdentifier } from "./generated/utils";
import { SDK_VERSION } from "./generated/utils/constants";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import { createHash as cryptoCreateHash, createVerify, publicEncrypt } from "crypto";
import * as constants from "constants";

/**
 * A client used to perform cryptographic operations with Azure Key Vault keys.
 */
export class CryptographyClient {
  /**
   * @internal
   * @ignore
   * Retrieves the {@link JsonWebKey} from the Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.getKey();
   * ```
   * @param {GetKeyOptions} [options] Options for retrieving key.
   */
  private async getKey(options: GetKeyOptions = {}): Promise<JsonWebKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getKey", requestOptions);

    if (typeof this.key === "string") {
      if (!this.name || this.name === "") {
        throw new Error("getKey requires a key with a name");
      }
      const key = await this.client.getKey(
        this.vaultUrl,
        this.name,
        options && options.version ? options.version : this.version ? this.version : "",
        this.setParentSpan(span, requestOptions)
      );
      return key.key! as JsonWebKey;
    } else {
      return this.key;
    }
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param {EncryptionAlgorithm} algorithm The algorithm to use.
   * @param {Uint8Array} plaintext The text to encrypt.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async encrypt(
    algorithm: EncryptionAlgorithm,
    plaintext: Uint8Array,
    options: EncryptOptions = {}
  ): Promise<EncryptResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("encrypt", requestOptions);

    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RSA1_5": {
            if (this.key.kty !== "RSA") {
              span.end();
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
              span.end();
              throw new Error("Key does not support the encrypt operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
            const encrypted = publicEncrypt(padded, Buffer.from(plaintext));
            return { result: encrypted, algorithm, keyID: this.key.kid };
          }
          case "RSA-OAEP": {
            if (this.key.kty !== "RSA") {
              span.end();
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
              span.end();
              throw new Error("Key does not support the encrypt operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const encrypted = publicEncrypt(keyPEM, Buffer.from(plaintext));
            return { result: encrypted, algorithm, keyID: this.key.kid };
          }
        }
      }
    }

    // Default to the service
    let result;
    try {
      result = await this.client.encrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        plaintext,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Decrypts the given ciphertext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.decrypt("RSA1_5", encryptedBuffer);
   * ```
   * @param {EncryptionAlgorithm} algorithm The algorithm to use.
   * @param {Uint8Array} ciphertext The text to decrypt.
   * @param {EncryptOptions} [options] Additional options.
   */

  public async decrypt(
    algorithm: EncryptionAlgorithm,
    ciphertext: Uint8Array,
    options: DecryptOptions = {}
  ): Promise<DecryptResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("decrypt", requestOptions);

    let result;
    try {
      result = await this.client.decrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        ciphertext,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, keyID: this.getKeyID(), algorithm };
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param {KeyWrapAlgorithm} algorithm The encryption algorithm to use to wrap the given key.
   * @param {Uint8Array} key The key to wrap.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions = {}
  ): Promise<WrapResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("wrapKey", requestOptions);

    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RSA1_5": {
            if (this.key.kty !== "RSA") {
              span.end();
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("wrapKey")) {
              span.end();
              throw new Error("Key does not support the wrapKey operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
            const encrypted = publicEncrypt(padded, Buffer.from(key));
            return { result: encrypted, algorithm, keyID: this.getKeyID() };
          }
          case "RSA-OAEP": {
            if (this.key.kty !== "RSA") {
              span.end();
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("wrapKey")) {
              span.end();
              throw new Error("Key does not support the wrapKey operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const encrypted = publicEncrypt(keyPEM, Buffer.from(key));
            return { result: encrypted, algorithm, keyID: this.getKeyID() };
          }
        }
      }
    }

    // Default to the service
    let result;
    try {
      result = await this.client.wrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        key,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.unwrapKey("RSA1_5", keyToUnwrap);
   * ```
   * @param {KeyWrapAlgorithm} algorithm The decryption algorithm to use to unwrap the key.
   * @param {Uint8Array} encryptedKey The encrypted key to unwrap.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {}
  ): Promise<UnwrapResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("unwrapKey", requestOptions);

    let result;
    try {
      result = await this.client.unwrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        encryptedKey,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, keyID: this.getKeyID() };
  }

  /**
   * Cryptographically sign the digest of a message
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.sign("RS256", digest);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The signing algorithm to use.
   * @param {Uint8Array} digest The digest of the data to sign.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("sign", requestOptions);

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Verify the signed message digest
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.verify("RS256", signedDigest, signature);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The signing algorithm to use to verify with.
   * @param {Uint8Array} digest The digest to verify.
   * @param {Uint8Array} signature The signature to verify the digest against.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("verify", requestOptions);

    let response;
    try {
      response = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: response.value ? response.value : false, keyID: this.getKeyID() };
  }

  /**
   * Cryptographically sign a block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.signData("RS256", message);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The signing algorithm to use.
   * @param {Uint8Array} data The data to sign.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async signData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("signData", requestOptions);

    let digest;
    switch (algorithm) {
      case "ES256":
      case "ES256K":
      case "PS256":
      case "RS256":
        {
          digest = await createHash("sha256", data);
        }
        break;
      case "ES384":
      case "PS384":
      case "RS384":
        {
          digest = await createHash("sha384", data);
        }
        break;
      case "ES512":
      case "PS512":
      case "RS512":
        {
          digest = await createHash("sha512", data);
        }
        break;
      default: {
        throw new Error("Unsupported signature algorithm");
      }
    }

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.verifyData("RS256", signedMessage, signature);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The algorithm to use to verify with.
   * @param {Uint8Array} data The signed block of data to verify.
   * @param {Uint8Array} signature The signature to verify the block against.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async verifyData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("verifyData", requestOptions);

    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RS256": {
            if (this.key.kty !== "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const verifier = createVerify("SHA256");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {
              result: verifier.verify(keyPEM, Buffer.from(signature)),
              keyID: this.getKeyID()
            };
          }
          case "RS384": {
            if (this.key.kty !== "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const verifier = createVerify("SHA384");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {
              result: verifier.verify(keyPEM, Buffer.from(signature)),
              keyID: this.getKeyID()
            };
          }
          case "RS512": {
            if (this.key.kty !== "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            const keyPEM = convertJWKtoPEM(this.key);

            const verifier = createVerify("SHA512");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {
              result: verifier.verify(keyPEM, Buffer.from(signature)),
              keyID: this.getKeyID()
            };
          }
        }
      }
    }

    let digest: Buffer;
    switch (algorithm) {
      case "ES256":
      case "ES256K":
      case "PS256":
      case "RS256":
        {
          digest = await createHash("sha256", data);
        }
        break;
      case "ES384":
      case "PS384":
      case "RS384":
        {
          digest = await createHash("sha384", data);
        }
        break;
      case "ES512":
      case "PS512":
      case "RS512":
        {
          digest = await createHash("sha512", data);
        }
        break;
      default: {
        throw new Error("Unsupported signature algorithm");
      }
    }

    let result;
    try {
      result = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.value!, keyID: this.getKeyID() };
  }

  /**
   * @internal
   * @ignore
   * Attempts to fetch the key from the service.
   */
  private async fetchFullKeyIfPossible(): Promise<void> {
    if (!this.hasTriedToGetKey) {
      try {
        this.key = await this.getKey();
      } catch {
        // Nothing to do here.
      }
      this.hasTriedToGetKey = true;
    }
  }

  /**
   * @internal
   * @ignore
   * Attempts to retrieve the ID of the key.
   */
  private getKeyID(): string | undefined {
    let kid;
    if (typeof this.key !== "string") {
      kid = this.key.kid;
    } else {
      kid = this.key;
    }

    return kid;
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * A reference to the key used for the cryptographic operations.
   * Based on what was provided to the CryptographyClient constructor, it can be either a string with the URL of a KeyVault Key, or an already parsed {@link JsonWebKey}.
   */
  private key: string | JsonWebKey;

  /**
   * Name of the key the client represents
   */
  private name: string;

  /**
   * Version of the key the client represents
   */
  private version: string;

  /**
   * Has the client tried to fetch the full key yet
   */
  private hasTriedToGetKey: boolean;

  /**
   * Constructs a new instance of the Cryptography client for the given key
   *
   * Example usage:
   * ```ts
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let keyClient = new KeyClient(vaultUrl, credentials);
   * let keyVaultKey = await keyClient.getKey("MyKey");
   *
   * let client = new CryptographyClient(keyVaultKey.id, credentials);
   * // or
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * ```
   * @param key The key to use during cryptography tasks.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions={}] Optional. Pipeline options used to configure Key Vault API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof CryptographyClient
   */
  constructor(
    key: string | KeyVaultKey, // keyUrl or KeyVaultKey
    credential: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {}
  ) {
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          logPolicyOptions: {
            allowedHeaderNames: [
              "x-ms-keyvault-region",
              "x-ms-keyvault-network-info",
              "x-ms-keyvault-service-version"
            ]
          }
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new KeyVaultClient(
      pipelineOptions.apiVersion || LATEST_API_VERSION,
      pipeline
    );

    let parsed;
    if (typeof key === "string") {
      this.key = key;
      parsed = parseKeyvaultIdentifier("keys", this.key);
      this.hasTriedToGetKey = false;
    } else if (key.key) {
      this.key = key.key;
      parsed = parseKeyvaultIdentifier("keys", this.key.kid!);
      this.hasTriedToGetKey = true;
    } else {
      throw new Error(
        "The provided key is malformed as it does not have a value for the `key` property."
      );
    }

    if (parsed.name === "") {
      throw new Error("Could not find 'name' of key in key URL");
    }

    if (!parsed.version || parsed.version === "") {
      throw new Error("Could not find 'version' of key in key URL");
    }

    if (!parsed.vaultUrl || parsed.vaultUrl === "") {
      throw new Error("Could not find 'vaultUrl' of key in key URL");
    }

    this.vaultUrl = parsed.vaultUrl;
    this.name = parsed.name;
    this.version = parsed.version;
  }

  /**
   * @internal
   * @ignore
   * Creates a span using the tracer that was set by the user.
   * @param {string} methodName The name of the method creating the span.
   * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
   */
  private createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
    const tracer = getTracer();
    const span = tracer.startSpan(
      `CryptographyClient ${methodName}`,
      requestOptions && requestOptions.spanOptions
    );
    span.setAttribute("az.namespace", "Microsoft.KeyVault");
    return span;
  }

  /**
   * @internal
   * @ignore
   * Returns updated HTTP options with the given span as the parent of future spans,
   * if applicable.
   * @param {Span} span The span for the current operation.
   * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
   */
  private setParentSpan(span: Span, options: RequestOptionsBase = {}): RequestOptionsBase {
    if (span.isRecording()) {
      const spanOptions = options.spanOptions || {};
      return {
        ...options,
        spanOptions: {
          ...spanOptions,
          parent: span.context(),
          attributes: {
            ...spanOptions.attributes,
            "az.namespace": "Microsoft.KeyVault"
          }
        }
      };
    } else {
      return options;
    }
  }
}

/**
 * @internal
 * @ignore
 * Encodes a length of a packet in DER format
 */
function encodeLength(length: number): Uint8Array {
  if (length <= 127) {
    return Uint8Array.of(length);
  } else if (length < 256) {
    return Uint8Array.of(0x81, length);
  } else if (length < 65536) {
    return Uint8Array.of(0x82, length >> 8, length & 0xff);
  } else {
    throw new Error("Unsupported length to encode");
  }
}

/**
 * @internal
 * @ignore
 * Encodes a buffer for DER, as sets the id to the given id
 */
function encodeBuffer(buffer: Uint8Array, bufferId: number): Uint8Array {
  if (buffer.length === 0) {
    return buffer;
  }

  let result = new Uint8Array(buffer);

  // If the high bit is set, prepend a 0
  if ((result[0] & 0x80) === 0x80) {
    const array = new Uint8Array(result.length + 1);
    array[0] = 0;
    array.set(result, 1);
    result = array;
  }

  // Prepend the DER header for this buffer
  const encodedLength = encodeLength(result.length);

  const totalLength = 1 + encodedLength.length + result.length;

  const outputBuffer = new Uint8Array(totalLength);
  outputBuffer[0] = bufferId;
  outputBuffer.set(encodedLength, 1);
  outputBuffer.set(result, 1 + encodedLength.length);

  return outputBuffer;
}

/**
 * @internal
 * @ignore
 * Encode a JWK to PEM format. To do so, it internally repackages the JWK as a DER
 * that is then encoded as a PEM.
 */
export function convertJWKtoPEM(key: JsonWebKey): string {
  if (!key.n || !key.e) {
    throw new Error("Unsupported key format for local operations");
  }
  const encoded_n = encodeBuffer(key.n, 0x2); // INTEGER
  const encoded_e = encodeBuffer(key.e, 0x2); // INTEGER

  const encoded_ne = new Uint8Array(encoded_n.length + encoded_e.length);
  encoded_ne.set(encoded_n, 0);
  encoded_ne.set(encoded_e, encoded_n.length);

  const full_encoded = encodeBuffer(encoded_ne, 0x30); // SEQUENCE

  const buffer = Buffer.from(full_encoded).toString("base64");

  const beginBanner = "-----BEGIN RSA PUBLIC KEY-----\n";
  const endBanner = "-----END RSA PUBLIC KEY-----";

  /*
   Fill in the PEM with 64 character lines as per RFC:

   "To represent the encapsulated text of a PEM message, the encoding
   function's output is delimited into text lines (using local
   conventions), with each line except the last containing exactly 64
   printable characters and the final line containing 64 or fewer
   printable characters."
  */
  let outputString = beginBanner;
  const lines = buffer.match(/.{1,64}/g);

  if (lines) {
    for (const line of lines) {
      outputString += line;
      outputString += "\n";
    }
  } else {
    throw new Error("Could not create correct PEM");
  }
  outputString += endBanner;

  return outputString;
}

/**
 * @internal
 * @ignore
 * Use the platform-local hashing functionality
 */
async function createHash(algorithm: string, data: Uint8Array): Promise<Buffer> {
  if (isNode) {
    const hash = cryptoCreateHash(algorithm);
    hash.update(Buffer.from(data));
    const digest = hash.digest();
    return digest;
  } else {
    if (window && window.crypto && window.crypto.subtle) {
      return Buffer.from(await window.crypto.subtle.digest(algorithm, Buffer.from(data)));
    } else {
      throw new Error("Browser does not support cryptography functions");
    }
  }
}

/**
 * Supported algorithms for key wrapping/unwrapping
 */
export type KeyWrapAlgorithm = "RSA-OAEP" | "RSA-OAEP-256" | "RSA1_5";

/**
 * Defines values for SignatureAlgorithm.
 * Possible values include: 'PS256', 'PS384', 'PS512', 'RS256', 'RS384', 'RS512',
 * 'ES256', 'ES384', 'ES512', 'ES256K'
 * @readonly
 * @enum {string}
 */
export type SignatureAlgorithm =
  | "PS256"
  | "PS384"
  | "PS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512"
  | "ES256K";

/**
 * Options for {@link encrypt}.
 */
export interface EncryptOptions extends CryptographyOptions {}

/**
 * Options for {@link decrypt}.
 */
export interface DecryptOptions extends CryptographyOptions {}

/**
 * Options for {@link sign}.
 */
export interface SignOptions extends CryptographyOptions {}

/**
 * Options for {@link verify}.
 */
export interface VerifyOptions extends CryptographyOptions {}

/**
 * Options for {@link wrapKey}.
 */
export interface WrapKeyOptions extends CryptographyOptions {}

/**
 * Options for {@link unwrapKey}.
 */
export interface UnwrapKeyOptions extends CryptographyOptions {}

/**
 * Result of the {@link decrypt} operation.
 */
export interface DecryptResult {
  /**
   * Result of the {@link decrypt} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the KeyVault Key used to decrypt the encrypted data.
   */
  keyID?: string;
  /**
   * The {@link EncryptionAlgorithm} used to decrypt the encrypted data.
   */
  algorithm: EncryptionAlgorithm;
}

/**
 * Result of the {@link encrypt} operation.
 */
export interface EncryptResult {
  /**
   * Result of the {@link encrypt} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The {@link EncryptionAlgorithm} used to encrypt the data.
   */
  algorithm: EncryptionAlgorithm;
  /**
   * The ID of the KeyVault Key used to encrypt the data.
   */
  keyID?: string;
}

/**
 * Result of the {@link sign} operation.
 */
export interface SignResult {
  /**
   * Result of the {@link sign} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the KeyVault Key used to sign the data.
   */
  keyID?: string;
  /**
   * The {@link EncryptionAlgorithm} used to sign the data.
   */
  algorithm: SignatureAlgorithm;
}

/**
 * Result of the {@link verify} operation.
 */
export interface VerifyResult {
  /**
   * Result of the {@link verify} operation in bytes.
   */
  result: boolean;
  /**
   * The ID of the KeyVault Key used to verify the data.
   */
  keyID?: string;
}

/**
 * Result of the {@link wrap} operation.
 */
export interface WrapResult {
  /**
   * Result of the {@link wrap} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the KeyVault Key used to wrap the data.
   */
  keyID?: string;
  /**
   * The {@link EncryptionAlgorithm} used to wrap the data.
   */
  algorithm: KeyWrapAlgorithm;
}

/**
 * Result of the {@link unwrap} operation.
 */
export interface UnwrapResult {
  /**
   * Result of the {@link unwrap} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the KeyVault Key used to unwrap the data.
   */
  keyID?: string;
}
