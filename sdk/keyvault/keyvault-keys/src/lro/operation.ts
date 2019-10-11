import { RequestOptionsBase } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import {
  Key,
  KeysClientInterface,
  DeletedKey,
} from "../../keysModels";

/**
 * @interface
 * An interface representing the properties of a delete key's poll operation
 */
export interface DeleteKeyPollOperationProperties {
  /**
   * @member {DeleteKeyPollOperationProperties} [name] The name of the key that will be deleted
   */
  name: string;
  /**
   * @member {DeleteKeyPollOperationProperties} [requestOptions] The optional parameters sent to the HTTP request
   */
  requestOptions: RequestOptionsBase;
  /**
   * @member {DeleteKeyPollOperationProperties} [client] An instance of the KeysClient class
   */
  client: KeysClientInterface;
  /**
   * @member {DeleteKeyPollOperationProperties} [initialResponse] The initial response received the first time the service was reached by the operation's update function
   */
  initialResponse?: DeletedKey;
  /**
   * @member {DeleteKeyPollOperationProperties} [previousResponse] The previous response received the last time the service was reached by the operation's update function
   */
  previousResponse?: DeletedKey;
}

/**
 * @interface
 * An interface representing a delete key's poll operation
 */
export interface DeleteKeyPollOperation
  extends PollOperation<DeleteKeyPollOperationProperties, Key> {}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: DeleteKeyPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: DeleteKeyPollOperationProperties) => void;
  } = {}
): Promise<DeleteKeyPollOperation> {
  const {
    name,
    requestOptions,
    client,
    initialResponse,
    previousResponse
  } = this.properties;
  const requestOptions = this.properties.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  let response: DeletedKey;
  const doFinalResponse = false; // TODO

  if (!initialResponse) {
    await client.deleteKey(name, requestOptions);
    response = await client.getDeletedKey(name, requestOptions);
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.getDeletedKey(name, requestOptions);
    const finalKey = await client.getKeyWithPolicy(name, requestOptions);
    this.state.completed = true;
    this.state.result = finalKey;
  } else {
    response = await client.getDeletedKey(name, requestOptions);
  }

  const properties: DeleteKeyPollOperationProperties = {
    ...this.properties,
    previousResponse: response,
  };

  // Progress only after the poller has started and before the poller is done
  if (initialResponse && !doFinalResponse && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makeDeleteKeyPollOperation(this.state, properties);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: DeleteKeyPollOperation,
  _: { abortSignal?: AbortSignal } = {}
): Promise<DeleteKeyPollOperation> {
  throw new Error(`The key ${this.properties.name} is being deleted. Cancelation is not supported.`);
}

/**
 * @summary Serializes the delete key's poll operation
 */
function toString(this: DeleteKeyPollOperation): string {
  return JSON.stringify({
    state: this.state,
    properties: this.properties
  });
}

/**
 * @summary Builds a delete key's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @param [properties] The properties of a previous delete key's poll operation, in case the new one is intended to follow up where the previous one was left.
 */
export function makeDeleteKeyPollOperation(
  state: PollOperationState<Key>,
  properties: DeleteKeyPollOperationProperties
): DeleteKeyPollOperation {
  return {
    state: {
      ...state
    },
    properties: {
      ...properties
    },
    update,
    cancel,
    toString
  };
}
