// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from '../../generated/keyVaultClient';

/**
 * An interface representing the state of a backup Key Vault's poll operation.
 */
export interface BackupPollOperationState extends PollOperationState<string> {
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
  /**
   * The SAS token.
   */
  sasToken: string;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing the internal KeyVaultClient.
   */
  client: KeyVaultClient;
  /**
   * The base URL to the vault
   */
  vaultUrl: string;
  /**
   * The id returned as part of the backup request
   */
  jobId: string;
}

/**
 * An interface representing a backup Key Vault's poll operation.
 */
export interface BackupPollOperation
  extends PollOperation<BackupPollOperationState, string> {}

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
  const { vaultUrl, client, blobStorageUri, sasToken } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    const fullBackupOperation = await client.fullBackup(vaultUrl, {
      ...requestOptions,
      azureStorageBlobContainerUri: {
        storageResourceUri: blobStorageUri,
        token: sasToken
      }
    });

    const { startTime, jobId, azureStorageBlobContainerUri, endTime } = fullBackupOperation;

    if (!startTime || !jobId) {
      state.error = new Error(`Missing "startTime" from the full backup operation.`);
      state.isCompleted = true;
      return makeBackupPollOperation(state);
    }

    state.isStarted = true;
    state.jobId = jobId;
    state.result = azureStorageBlobContainerUri;

    if (endTime) {
      state.isCompleted = true;
    }
  }

  if (!state.isCompleted) {
    const fullBackupOperation = await client.fullBackupStatus(vaultUrl, state.jobId, { requestOptions });
    const { azureStorageBlobContainerUri, endTime } = fullBackupOperation;
    state.result = azureStorageBlobContainerUri;
    if (endTime) {
      state.isCompleted = true;
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
export function makeBackupPollOperation(
  state: BackupPollOperationState
): BackupPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
