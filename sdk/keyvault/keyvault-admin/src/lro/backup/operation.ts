// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import {
  OperationOptions,
  operationOptionsToRequestOptionsBase,
  RequestOptionsBase
} from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientFullBackupOptionalParams,
  KeyVaultClientFullBackupResponse,
  KeyVaultClientFullBackupStatusResponse
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../tracing";

/**
 * An interface representing the publicly available properties of the state of a backup Key Vault's poll operation.
 */
export interface BackupOperationState extends PollOperationState<string> {
  /**
   * The base URL to the vault
   */
  vaultUrl: string;
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
  /**
   * The SAS token.
   */
  sasToken: string;
  /**
   * Identifier for the full backup operation.
   */
  jobId?: string;
  /**
   * Status of the backup operation.
   */
  status?: string;
  /**
   * The status details of backup operation.
   */
  statusDetails?: string;
  /**
   * The start time of the backup operation in UTC
   */
  startTime?: Date;
  /**
   * The end time of the backup operation in UTC
   */
  endTime?: Date;
}

/**
 * An internal interface representing the state of a backup Key Vault's poll operation.
 * @internal
 */
export interface BackupPollOperationState extends PollOperationState<string> {
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing the internal KeyVaultClient.
   */
  client?: KeyVaultClient;
  /**
   * The base URL to the vault
   */
  vaultUrl: string;
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
  /**
   * The SAS token.
   */
  sasToken: string;
  /**
   * The id returned as part of the backup request
   */
  jobId?: string;
  /**
   * Status of the backup operation.
   */
  status?: string;
  /**
   * The status details of backup operation.
   */
  statusDetails?: string;
  /**
   * The start time of the backup operation in UTC
   */
  startTime?: Date;
  /**
   * The end time of the backup operation in UTC
   */
  endTime?: Date;
}

/**
 * An interface representing a backup Key Vault's poll operation.
 */
export interface BackupPollOperation extends PollOperation<BackupPollOperationState, string> {}

/**
 * Tracing the fullBackup operation
 */
async function fullBackup(
  client: KeyVaultClient,
  vaultUrl: string,
  options: KeyVaultClientFullBackupOptionalParams
): Promise<KeyVaultClientFullBackupResponse> {
  const requestOptions = operationOptionsToRequestOptionsBase(options);
  const span = createSpan("generatedClient.fullBackup", requestOptions);

  let response: KeyVaultClientFullBackupResponse;
  try {
    response = await client.fullBackup(vaultUrl, setParentSpan(span, requestOptions));
  } finally {
    span.end();
  }

  return response;
}

/**
 * Tracing the fullBackupStatus operation
 */
async function fullBackupStatus(
  client: KeyVaultClient,
  vaultUrl: string,
  jobId: string,
  options: OperationOptions
): Promise<KeyVaultClientFullBackupStatusResponse> {
  const requestOptions = operationOptionsToRequestOptionsBase(options);
  const span = createSpan("generatedClient.fullBackupStatus", requestOptions);

  let response: KeyVaultClientFullBackupStatusResponse;
  try {
    response = await client.fullBackupStatus(vaultUrl, jobId, setParentSpan(span, requestOptions));
  } finally {
    span.end();
  }

  return response;
}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: BackupPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: BackupPollOperationState) => void;
  } = {}
): Promise<BackupPollOperation> {
  const state = this.state;
  const { vaultUrl, blobStorageUri, sasToken } = state;

  // Internal properties,
  // the reference is only potentially undefined in the public representation of the poller.
  const client = state.client!;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    const fullBackupOperation = await fullBackup(client, vaultUrl, {
      ...requestOptions,
      azureStorageBlobContainerUri: {
        storageResourceUri: blobStorageUri,
        token: sasToken
      }
    });

    const { startTime, jobId, azureStorageBlobContainerUri, endTime, error } = fullBackupOperation;

    if (!startTime) {
      state.error = new Error(`Missing "startTime" from the full backup operation.`);
      state.isCompleted = true;
      return makeBackupPollOperation(state);
    }

    state.isStarted = true;
    state.jobId = jobId;
    state.endTime = endTime;
    state.startTime = startTime;
    state.status = fullBackupOperation.status;
    state.statusDetails = fullBackupOperation.statusDetails;
    state.result = azureStorageBlobContainerUri;

    if (endTime) {
      state.isCompleted = true;
    }
    if (error) {
      state.isCompleted = true;
      state.error = new Error(error.message);
    }
  }

  if (!state.jobId) {
    state.error = new Error(`Missing "jobId" from the full backup operation.`);
    state.isCompleted = true;
    return makeBackupPollOperation(state);
  }

  if (!state.isCompleted) {
    const fullBackupOperation = await fullBackupStatus(client, vaultUrl, state.jobId, {
      requestOptions
    });
    const { azureStorageBlobContainerUri, endTime, error } = fullBackupOperation;
    state.result = azureStorageBlobContainerUri;
    if (endTime) {
      state.isCompleted = true;
    }
    if (error) {
      state.isCompleted = true;
      state.error = new Error(error.message);
    }
  }

  return makeBackupPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: BackupPollOperation): Promise<BackupPollOperation> {
  throw new Error("Canceling the deletion of a key is not supported.");
}

/**
 * @summary Serializes the create key's poll operation
 */
function toString(this: BackupPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create key's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeBackupPollOperation(state: BackupPollOperationState): BackupPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
