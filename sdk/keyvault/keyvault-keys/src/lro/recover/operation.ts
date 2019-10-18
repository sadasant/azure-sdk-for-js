// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultKey, KeyClientInterface } from "../../keysModels";

/**
 * @interface
 * An interface representing the state of a delete key's poll operation
 */
export interface RecoverDeletedKeyPollOperationState extends PollOperationState<KeyVaultKey> {
  name: string;
  requestOptions?: RequestOptionsBase;
  client: KeyClientInterface;
}

/**
 * @interface
 * An interface representing a delete key's poll operation
 */
export interface RecoverDeletedKeyPollOperation
  extends PollOperation<RecoverDeletedKeyPollOperationState, KeyVaultKey> {}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RecoverDeletedKeyPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RecoverDeletedKeyPollOperationState) => void;
  } = {}
): Promise<RecoverDeletedKeyPollOperation> {
  const state = this.state;
  const { name, client } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.started) {
    try {
      state.result = await client.getKey(name, { requestOptions });
      state.completed = true;
    } catch (_) {}
    if (!state.completed) {
      state.result = await client.recoverDeletedKey(name, { requestOptions });
      state.started = true;
    }
  }

  if (!state.completed) {
    try {
      state.result = await client.getKey(name, { requestOptions });
      state.completed = true;
    } catch (error) {
      if (error.statusCode === 403) {
        // At this point, the resource exists but the user doesn't have access to it.
        state.completed = true;
      } else if (error.statusCode !== 404) {
        state.error = error;
        state.completed = true;
      }
    }
  }

  return makeRecoverDeletedKeyPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: RecoverDeletedKeyPollOperation,
  _: { abortSignal?: AbortSignal } = {}
): Promise<RecoverDeletedKeyPollOperation> {
  throw new Error("Canceling the deletion of a key is not supported.");
}

/**
 * @summary Serializes the create key's poll operation
 */
function toString(this: RecoverDeletedKeyPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create key's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRecoverDeletedKeyPollOperation(
  state: RecoverDeletedKeyPollOperationState
): RecoverDeletedKeyPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
