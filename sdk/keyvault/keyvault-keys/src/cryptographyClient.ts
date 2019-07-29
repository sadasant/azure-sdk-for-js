import { GetKeyOptions, RequestOptions } from "./keysModels";
import { JsonWebKey, JsonWebKeyEncryptionAlgorithm, JsonWebKeySignatureAlgorithm } from "./core/models";
import {
  ServiceClientCredentials,
  TokenCredential,
  isNode,
  RequestPolicyFactory,
  isTokenCredential,
  deserializationPolicy,
  signingPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  userAgentPolicy,
  getDefaultUserAgentValue,
} from "@azure/core-http";
import { parseKeyvaultIdentifier } from "./core/utils";
import { TelemetryOptions } from "./core";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import {
  NewPipelineOptions,
  isNewPipelineOptions,
  Pipeline,
} from "./core/keyVaultBase";
import { KeyVaultClient } from "./core/keyVaultClient";
import { challengeBasedAuthenticationPolicy } from "./core/challengeBasedAuthenticationPolicy";
import * as constants from "constants";
import * as crypto from "crypto";

let keyto: any
if (isNode) {
  keyto = require("@trust/keyto");
}

export class CryptographyClient {
  private async fetchFullKeyIfPossible(): Promise<void> {
    if (!this.hasTriedToGetKey) {
      try {
        this.key = await this.getKey();
      } catch {
        console.error("Failed to get the full key");
      }
      this.hasTriedToGetKey = true;
    }
  }
 
  private static getUserAgentString(telemetry?: TelemetryOptions): string {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;
    if (userAgentInfo.indexOf(libInfo) === -1) {
      userAgentInfo.push(libInfo);
    }
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }
    return userAgentInfo.join(" ");
  }

  public async getKey(options?: GetKeyOptions): Promise<JsonWebKey> {
    if (typeof this.key === "string") {
      if (!this.name || this.name === "") {
        throw new Error("getKey requires a key with a name");
      }
      const key = await this.client.getKey(
        this.vaultBaseUrl,
        this.name,
        options && options.version ? options.version : (this.version ? this.version : ""),
        options
      );
      return key.key!;
    } else {
      return this.key;
    }
  }

  public async encrypt(
    plaintext: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    _iv?: Uint8Array,
    _authenticationData?: Uint8Array,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    await this.fetchFullKeyIfPossible();

    let keyPEM: string;
    let padded: any;

    if (typeof this.key !== "string") {
      if (isNode) {
        switch (algorithm) {
          case "RSA1_5": {
            keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');
            padded = { key: keyPEM, type: "public", padding: constants.RSA_PKCS1_PADDING };
            const encrypted = crypto.publicEncrypt(padded, Buffer.from(plaintext));
            return encrypted;
          };
          case "RSA-OAEP": {
            keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');
            padded = { key: keyPEM, type: "private", padding: constants.RSA_PKCS1_OAEP_PADDING };
            const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(plaintext));
            return encrypted;
          };
        }
      } else {
        console.warn("Local encryption in the browser is not available. Using the remote service.");
      }
    }

    // Default to the service
    const result = await this.client.encrypt(this.vaultBaseUrl, this.name, this.version, algorithm, plaintext, options);
    return result.result!;
  }

  public async decrypt(
    ciphertext: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    _iv?: Uint8Array,
    _authenticationData?: Uint8Array,
    _authenticationTag?: Uint8Array,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    await this.fetchFullKeyIfPossible();
    // Default to the service
    const result = await this.client.decrypt(this.vaultBaseUrl, this.name, this.version, algorithm, ciphertext, options);
    return result.result!;
  }

  public async wrapKey(
    key: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    await this.fetchFullKeyIfPossible();

    // Default to the service
    const result = await this.client.wrapKey(this.vaultBaseUrl, this.name, this.version, algorithm, key, options);
    return result.result!;
  }

  public async unwrapKey(
    encryptedKey: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    await this.fetchFullKeyIfPossible();

    // Default to the service
    const result = await this.client.unwrapKey(this.vaultBaseUrl, this.name, this.version, algorithm, encryptedKey, options);
    return result.result!;
  }

  public async sign(
    digest: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    await this.fetchFullKeyIfPossible();

    // Default to the service
    const result = await this.client.sign(this.vaultBaseUrl, this.name, this.version, algorithm, digest, options);
    return result.result!;
  }

  public async verify(
    digest: Uint8Array,
    signature: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<boolean> {
    await this.fetchFullKeyIfPossible();

    // Default to the service
    const response = await this.client.verify(this.vaultBaseUrl, this.name, this.version, algorithm, digest, signature, options);
    return response.value ? response.value : false;
  }

  public async signData(
    data: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    await this.fetchFullKeyIfPossible();

    // Default to the service
    const hash = crypto.createHash("sha256");

    hash.update(Buffer.from(data));
    const digest = hash.digest();
    const result = await this.client.sign(this.vaultBaseUrl, this.name, this.version, algorithm, digest, options);
    return result.result!;
  }

  public async verifyData(
    data: Uint8Array,
    signature: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<boolean> {
    await this.fetchFullKeyIfPossible();

    if (this.key !== "string") {
      switch (algorithm) {
        case ("RS256"): {
          const keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

          console.log("<<Locally verified>>");
          const verifier = crypto.createVerify("SHA256");
          verifier.update(Buffer.from(data));
          verifier.end();

          return verifier.verify(keyPEM, Buffer.from(signature));
        };
      }
    }

    // Default to the service
    const hash = crypto.createHash("sha256");

    hash.update(Buffer.from(data));
    const digest = hash.digest();
    const result = await this.client.verify(this.vaultBaseUrl, this.name, this.version, algorithm, digest, signature, options);
    return result.value!;
  }

  public static getDefaultPipeline(
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = CryptographyClient.getUserAgentString(pipelineOptions.telemetry);

    let requestPolicyFactories: RequestPolicyFactory[] = [];
    if (isNode) {
      requestPolicyFactories.push(
        proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings))
      );
    }
    requestPolicyFactories = requestPolicyFactories.concat([
      userAgentPolicy({ value: userAgentString }),
      generateClientRequestIdPolicy(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      throttlingRetryPolicy(),
      systemErrorRetryPolicy(),
      exponentialRetryPolicy(
        retryOptions.retryCount,
        retryOptions.retryIntervalInMS,
        RetryConstants.MIN_RETRY_INTERVAL_MS, // Minimum retry interval to prevent frequent retries
        retryOptions.maxRetryDelayInMs
      ),
      redirectPolicy(),
      isTokenCredential(credential)
        ? challengeBasedAuthenticationPolicy(credential)
        : signingPolicy(credential)
    ]);

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultBaseUrl: string;

  /**
   * The options to create the connection to the service
   */
  public readonly pipeline: Pipeline;

  /**
   * The authentication credentials
   */
  protected readonly credential: ServiceClientCredentials | TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * If the key is a string, it's a URL, and we'll pass it to the service API directly.
   */
  public key: string | JsonWebKey;

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

  constructor(
    url: string,
    key: string | JsonWebKey, // keyUrl or JsonWebKey
    credential: TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CryptographyClient.getDefaultPipeline(credential, pipelineOrOptions);
    } else {
      this.pipeline = pipelineOrOptions;
    }
    this.client = new KeyVaultClient(credential, this.pipeline);
    this.key = key;

    let parsed;
    if (typeof this.key === "string") {
      parsed = parseKeyvaultIdentifier("keys", this.key);
      this.hasTriedToGetKey = false;
    } else {
      parsed = parseKeyvaultIdentifier("keys", this.key.kid!);
      this.hasTriedToGetKey = true;
    }

    if (parsed.name === "") {
      throw new Error("Could not find 'name' of key in key URL");
    }

    if (!parsed.version || parsed.version === "") {
      throw new Error("Could not find 'version' of key in key URL");
    }

    this.name = parsed.name;
    this.version = parsed.version;
  }
}
