// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint @typescript-eslint/member-ordering: 0 */

import {
  getDefaultUserAgentValue,
  TokenCredential,
  isTokenCredential,
  RequestPolicyFactory,
  deserializationPolicy,
  signingPolicy,
  RequestOptionsBase,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  isNode,
  userAgentPolicy,
  tracingPolicy
} from "@azure/core-http";

import { getTracer, Span } from "@azure/core-tracing";

import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SecretBundle,
  DeletedSecretBundle,
  DeletionRecoveryLevel,
  KeyVaultClientGetSecretsOptionalParams,
  SetSecretResponse,
  DeleteSecretResponse,
  UpdateSecretResponse,
  GetSecretResponse,
  GetDeletedSecretResponse,
  RecoverDeletedSecretResponse,
  BackupSecretResponse,
  RestoreSecretResponse
} from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import { challengeBasedAuthenticationPolicy } from "./core/challengeBasedAuthenticationPolicy";

import {
  Secret,
  DeletedSecret,
  SetSecretOptions,
  UpdateSecretOptions,
  GetSecretOptions,
  ListSecretsOptions,
  SecretProperties
} from "./secretsModels";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";
import { NewPipelineOptions, isNewPipelineOptions, Pipeline } from "./core/keyVaultBase";
import {
  ProxyOptions,
  RetryOptions,
  TelemetryOptions,
  ParsedKeyVaultEntityIdentifier
} from "./core";

export {
  DeletedSecret,
  DeletionRecoveryLevel,
  GetSecretOptions,
  ListSecretsOptions as GetSecretsOptions,
  NewPipelineOptions,
  PagedAsyncIterableIterator,
  PageSettings,
  ParsedKeyVaultEntityIdentifier,
  Secret,
  SecretProperties,
  SetSecretOptions,
  UpdateSecretOptions
};

export { ProxyOptions, RetryOptions, TelemetryOptions };

// This is part of constructing the autogenerated client. In the future, it should not
// be required. See also: https://github.com/Azure/azure-sdk-for-js/issues/5508
const SERVICE_API_VERSION = "7.0";

/**
 * The client to interact with the KeyVault secrets functionality
 */
export class SecretClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   * @static
   * @param {TokenCredential} The credential to use for API requests.
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @memberof SecretClient
   */
  public static getDefaultPipeline(
    credential: TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = SecretClient.getUserAgentString(pipelineOptions.telemetry);

    let requestPolicyFactories: RequestPolicyFactory[] = [];
    if (isNode) {
      requestPolicyFactories.push(
        proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings))
      );
    }
    requestPolicyFactories = requestPolicyFactories.concat([
      tracingPolicy(),
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
  public readonly vaultEndpoint: string;

  /**
   * The options to create the connection to the service
   */
  public readonly pipeline: Pipeline;

  /**
   * The authentication credentials
   */
  protected readonly credential: TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of SecretClient.
   *
   * Example usage:
   * ```ts
   * import { SecretClient } from "@azure/keyvault-secrets";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let url = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new SecretClient(url, credentials);
   * ```
   * @param {string} endPoint the base url to the key vault.
   * @param {TokenCredential} The credential to use for API requests.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof SecretClient
   */
  constructor(
    endPoint: string,
    credential: TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultEndpoint = endPoint;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = SecretClient.getDefaultPipeline(credential, pipelineOrOptions);
    } else {
      this.pipeline = pipelineOrOptions;
    }

    this.client = new KeyVaultClient(credential, SERVICE_API_VERSION, this.pipeline);
  }

  private static getUserAgentString(telemetry?: TelemetryOptions): string {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `azsdk-js-keyvault-secrets/${SDK_VERSION}`;
    if (userAgentInfo.indexOf(libInfo) === -1) {
      userAgentInfo.push(libInfo);
    }
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }
    return userAgentInfo.join(" ");
  }

  // TODO: do we want Aborter as well?

  /**
   * The setSecret method adds a secret or secret version to the Azure Key Vault. If the named secret
   * already exists, Azure Key Vault creates a new version of that secret.
   * This operation requires the secrets/set permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * await client.setSecret("MySecretName", "ABC123");
   * ```
   * @summary Adds a secret in a specified key vault.
   * @param secretName The name of the secret.
   * @param value The value of the secret.
   * @param [options] The optional parameters
   */
  public async setSecret(
    secretName: string,
    value: string,
    options?: SetSecretOptions
  ): Promise<Secret> {
    if (options) {
      const unflattenedProperties = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        secretAttributes: unflattenedProperties
      };
      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const span = this.createSpan("setSecret", unflattenedOptions);

      let response: SetSecretResponse;
      try {
        response = await this.client.setSecret(
          this.vaultEndpoint,
          secretName,
          value,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getSecretFromSecretBundle(response);
    } else {
      const response = await this.client.setSecret(this.vaultEndpoint, secretName, value, options);
      return this.getSecretFromSecretBundle(response);
    }
  }

  /**
   * The deleteSecret method applies to any secret stored in Azure Key Vault. Individual versions
   * of a secret cannot be deleted, only all versions of the given secret at once.
   * This operation requires the secrets/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new SecretClient(url, credentials);
   * const deletePoller = await client.beginDeleteSecret("MySecretName");
   * await deletePoller.pollUntilDone();
   * ```
   * @summary Deletes a secret from a specified key vault.
   * @param vaultEndpoint The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   */
  public async deleteSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedSecret> {
    const span = this.createSpan("deleteSecret", options);

    let response: DeleteSecretResponse;
    try {
      response = await this.client.deleteSecret(
        this.vaultEndpoint,
        secretName,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return this.getDeletedSecretFromDeletedSecretBundle(response);
  }

  /**
   * The updateSecret method changes specified attributes of an existing stored secret. Properties that
   * are not specified in the request are left unchanged. The value of a secret itself cannot be
   * changed. This operation requires the secrets/set permission.
   *
   * Example usage:
   * ```ts
   * let secretName = "MySecretName";
   * let client = new SecretClient(url, credentials);
   * let secret = await client.getSecret(secretName);
   * await client.updateSecret(secretName, secret.version, { enabled: false });
   * ```
   * @summary Updates the attributes associated with a specified secret in a given key vault.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   */
  public async updateSecretProperties(
    secretName: string,
    secretVersion: string,
    options?: UpdateSecretOptions
  ): Promise<Secret> {
    if (options) {
      const unflattenedProperties = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        secretAttributes: unflattenedProperties
      };
      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const span = this.createSpan("updateSecretProperties", unflattenedOptions);

      let response: UpdateSecretResponse;

      try {
        response = await this.client.updateSecret(
          this.vaultEndpoint,
          secretName,
          secretVersion,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getSecretFromSecretBundle(response);
    } else {
      const response = await this.client.updateSecret(
        this.vaultEndpoint,
        secretName,
        secretVersion,
        options
      );
      return this.getSecretFromSecretBundle(response);
    }
  }

  /**
   * The getSecret method is applicable to any secret stored in Azure Key Vault. This operation requires
   * the secrets/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * let secret = await client.getSecret("MySecretName");
   * ```
   * @summary Get a specified secret from a given key vault.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   */
  public async getSecret(secretName: string, options?: GetSecretOptions): Promise<Secret> {
    const span = this.createSpan("getSecret", options && options.requestOptions);
    const requestOptions = this.setParentSpan(span, options && options.requestOptions);

    let response: GetSecretResponse;
    try {
      response = await this.client.getSecret(
        this.vaultEndpoint,
        secretName,
        options && options.version ? options.version : "",
        requestOptions
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The getDeletedSecret method returns the specified deleted secret along with its attributes.
   * This operation requires the secrets/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * await client.getDeletedSecret("MyDeletedSecret");
   * ```
   * @summary Gets the specified deleted secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   */
  public async getDeletedSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedSecret> {
    const span = this.createSpan("getDeletedSecret", options);

    let response: GetDeletedSecretResponse;

    try {
      response = await this.client.getDeletedSecret(
        this.vaultEndpoint,
        secretName,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The purge deleted secret operation removes the secret permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the secrets/purge permission.
   *
   * Example usage:
   * ```ts
   * const client = new SecretClient(url, credentials);
   * const deletePoller = await client.beginDeleteSecret("MySecretName");
   * await deletePoller.pollUntilDone();
   * await client.purgeDeletedSecret("MySecretName");
   * ```
   * @summary Permanently deletes the specified secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   */
  public async purgeDeletedSecret(secretName: string, options?: RequestOptionsBase): Promise<void> {
    const span = this.createSpan("purgeDeletedSecret", options);

    try {
      await this.client.purgeDeletedSecret(
        this.vaultEndpoint,
        secretName,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }
  }

  /**
   * Recovers the deleted secret in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault. This operation requires the secrets/recover permission.
   *
   * Example usage:
   * ```ts
   * const client = new SecretClient(url, credentials);
   * const deletePoller = await client.beginDeleteSecret("MySecretName");
   * await deletePoller.pollUntilDone();
   * await client.recoverDeletedSecret("MySecretName");
   * ```
   * @summary Recovers the deleted secret to the latest version.
   * @param secretName The name of the deleted secret.
   * @param [options] The optional parameters
   */
  public async recoverDeletedSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<Secret> {
    const span = this.createSpan("recoverDeletedSecret", options);

    let response: RecoverDeletedSecretResponse;

    try {
      response = await this.client.recoverDeletedSecret(
        this.vaultEndpoint,
        secretName,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  /**
   * Requests that a backup of the specified secret be downloaded to the client. All versions of the
   * secret will be downloaded. This operation requires the secrets/backup permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * let backupResult = await client.backupSecret("MySecretName");
   * ```
   * @summary Backs up the specified secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   */
  public async backupSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<Uint8Array | undefined> {
    const span = this.createSpan("backupSecret", options);

    let response: BackupSecretResponse;

    try {
      response = await this.client.backupSecret(
        this.vaultEndpoint,
        secretName,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }
    return response.value;
  }

  /**
   * Restores a backed up secret, and all its versions, to a vault. This operation requires the
   * secrets/restore permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * let mySecretBundle = await client.backupSecret("MySecretName");
   * // ...
   * await client.restoreSecret(mySecretBundle);
   * ```
   * @summary Restores a backed up secret to a vault.
   * @param secretBundleBackup The backup blob associated with a secret bundle.
   * @param [options] The optional parameters
   */
  public async restoreSecret(
    secretBundleBackup: Uint8Array,
    options?: RequestOptionsBase
  ): Promise<Secret> {
    const span = this.createSpan("restoreSecret", options);

    let response: RestoreSecretResponse;

    try {
      response = await this.client.restoreSecret(
        this.vaultEndpoint,
        secretBundleBackup,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  private async *listSecretVersionsPage(
    secretName: string,
    continuationState: PageSettings,
    options?: ListSecretsOptions
  ): AsyncIterableIterator<SecretProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetSecretsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getSecretVersions(
        this.vaultEndpoint,
        secretName,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getSecretVersions(
        continuationState.continuationToken,
        secretName,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      } else {
        break;
      }
    }
  }

  private async *listSecretVersionsAll(
    secretName: string,
    options?: ListSecretsOptions
  ): AsyncIterableIterator<SecretProperties> {
    const f = {};

    for await (const page of this.listSecretVersionsPage(secretName, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates all versions of the given secret in the vault. The full secret identifier and attributes are provided
   * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * for await (const secretAttr of client.listSecretVersions("MySecretName")) {
   *   const secret = await client.getSecret(secretAttr.name);
   *   console.log("secret version: ", secret);
   * }
   * ```
   * @param secretName Name of the secret to fetch versions for
   * @param [options] The optional parameters
   */
  public listSecretVersions(
    secretName: string,
    options?: ListSecretsOptions
  ): PagedAsyncIterableIterator<SecretProperties, SecretProperties[]> {
    const span = this.createSpan("listSecretVersions", options && options.requestOptions);
    const updatedOptions: ListSecretsOptions = {
      ...options,
      requestOptions: this.setParentSpan(span, options && options.requestOptions)
    };

    const iter = this.listSecretVersionsAll(secretName, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listSecretVersionsPage(secretName, settings, updatedOptions)
    };
  }

  private async *listSecretsPage(
    continuationState: PageSettings,
    options?: ListSecretsOptions
  ): AsyncIterableIterator<SecretProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetSecretsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getSecrets(this.vaultEndpoint, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getSecrets(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      } else {
        break;
      }
    }
  }

  private async *listSecretsAll(
    options?: ListSecretsOptions
  ): AsyncIterableIterator<SecretProperties> {
    const f = {};

    for await (const page of this.listSecretsPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the latest version of all secrets in the vault.  The full secret identifier and attributes are provided
   * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * for await (const secretAttr of client.listSecrets()) {
   *   const secret = await client.getSecret(secretAttr.name);
   *   console.log("secret: ", secret);
   * }
   * ```
   * @summary List all secrets in the vault
   * @param [options] The optional parameters
   */
  public listSecrets(
    options?: ListSecretsOptions
  ): PagedAsyncIterableIterator<SecretProperties, SecretProperties[]> {
    const span = this.createSpan("listSecrets", options && options.requestOptions);
    const updatedOptions: ListSecretsOptions = {
      ...options,
      requestOptions: this.setParentSpan(span, options && options.requestOptions)
    };

    const iter = this.listSecretsAll(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listSecretsPage(settings, updatedOptions)
    };
  }

  private async *listDeletedSecretsPage(
    continuationState: PageSettings,
    options?: ListSecretsOptions
  ): AsyncIterableIterator<SecretProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetSecretsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getDeletedSecrets(
        this.vaultEndpoint,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedSecrets(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      } else {
        break;
      }
    }
  }

  private async *listDeletedSecretsAll(
    options?: ListSecretsOptions
  ): AsyncIterableIterator<SecretProperties> {
    const f = {};

    for await (const page of this.listDeletedSecretsPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the deleted secrets in the vault.  The full secret identifier and attributes are provided
   * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * for await (const secretAttr of client.listDeletedSecrets()) {
   *   const deletedSecret = await client.getSecret(secretAttr.name);
   *   console.log("deleted secret: ", deletedSecret);
   * }
   * ```
   * @summary List all secrets in the vault
   * @param [options] The optional parameters
   */
  public listDeletedSecrets(
    options?: ListSecretsOptions
  ): PagedAsyncIterableIterator<SecretProperties, SecretProperties[]> {
    const span = this.createSpan("listDeletedSecrets", options && options.requestOptions);
    const updatedOptions: ListSecretsOptions = {
      ...options,
      requestOptions: this.setParentSpan(span, options && options.requestOptions)
    };

    const iter = this.listDeletedSecretsAll(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedSecretsPage(settings, updatedOptions)
    };
  }

  private getSecretFromSecretBundle(secretBundle: SecretBundle): Secret {
    const parsedId = parseKeyvaultEntityIdentifier("secrets", secretBundle.id);

    let resultObject;
    if (secretBundle.attributes) {
      resultObject = {
        ...secretBundle,
        properties: {
          ...parsedId,
          ...secretBundle.attributes
        }
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        ...secretBundle,
        properties: {
          ...parsedId
        }
      };
    }

    return resultObject;
  }

  private getDeletedSecretFromDeletedSecretBundle(
    deletedSecretBundle: DeletedSecretBundle
  ): DeletedSecret {
    const parsedId = parseKeyvaultEntityIdentifier("secrets", deletedSecretBundle.id);

    let resultObject;
    if (deletedSecretBundle.attributes) {
      resultObject = {
        ...deletedSecretBundle,
        properties: {
          ...parsedId,
          ...deletedSecretBundle.attributes
        }
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        ...deletedSecretBundle,
        properties: {
          ...parsedId
        }
      };
    }

    return resultObject;
  }

  /**
   * Creates a span using the tracer that was set by the user
   * @param methodName The name of the method for which the span is being created.
   * @param requestOptions The options for the underlying http request.
   */
  private createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
    const tracer = getTracer();
    return tracer.startSpan(methodName, requestOptions && requestOptions.spanOptions);
  }

  /**
   * Returns updated HTTP options with the given span as the parent of future spans,
   * if applicable.
   * @param span The span for the current operation
   * @param options The options for the underlying http request
   */
  private setParentSpan(span: Span, options: RequestOptionsBase = {}): RequestOptionsBase {
    if (span.isRecordingEvents()) {
      return {
        ...options,
        spanOptions: {
          ...options.spanOptions,
          parent: span
        }
      };
    } else {
      return options;
    }
  }
}
