// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { OperationOptions } from "./modelsToBeSharedWithEventHubs";
import { SessionReceiverOptions } from "./session/messageSession";
import Long from "long";

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers<ReceivedMessageT> {
  /**
   * Handler that processes messages from service bus.
   *
   * @param message A message received from Service Bus.
   */
  processMessage(message: ReceivedMessageT): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   * @param err An error from Service Bus.
   */
  processError(err: Error): Promise<void>;
}

/**
 * Options related to wait times.
 */
export interface WaitTimeOptions {
  /**
   * The maximum amount of time to wait for messages to arrive.
   *  **Default**: `60000` milliseconds.
   */
  maxWaitTimeInMs: number;
}

/**
 * Options to configure the `createBatch` method on the `Sender`.
 * - `maxSizeInBytes`: The upper limit for the size of batch.
 *
 * Example usage:
 * ```js
 * {
 *     maxSizeInBytes: 1024 * 1024 // 1 MB
 * }
 * ```
 */
export interface CreateBatchOptions extends OperationOptions {
  /**
   * @property
   * The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   */
  maxSizeInBytes?: number;
}

/**
 * Options when receiving a batch of messages from Service Bus.
 */
export interface ReceiveBatchOptions extends OperationOptions, WaitTimeOptions {}

/**
 * Options when getting an iterable iterator from Service Bus.
 */
export interface GetMessageIteratorOptions extends OperationOptions, WaitTimeOptions {}

/**
 * Options used when subscribing to a Service Bus queue or subscription.
 */
export interface SubscribeOptions extends OperationOptions, MessageHandlerOptions {}

/**
 * Describes the options passed to `registerMessageHandler` method when receiving messages from a
 * Queue/Subscription which does not have sessions enabled.
 */
export interface MessageHandlerOptions {
  /**
   * @property Indicates whether the `complete()` method on the message should automatically be
   * called by the sdk after the user provided onMessage handler has been executed.
   * Calling `complete()` on a message removes it from the Queue/Subscription.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property The maximum duration in milliseconds until which the lock on the message will be renewed
   * by the sdk automatically. This auto renewal stops once the message is settled or once the user
   * provided onMessage handler completes ite execution.
   *
   * - **Default**: `300 * 1000` milliseconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxMessageAutoRenewLockDurationInMs?: number;
  /**
   * @property The maximum number of concurrent calls that the sdk can make to the user's message
   * handler. Once this limit has been reached, further messages will not be received until at least
   * one of the calls to the user's message handler has completed.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
}

/**
 * Describes the options passed to the `createSessionReceiver` method when using a Queue/Subscription that
 * has sessions enabled.
 */
export interface CreateSessionReceiverOptions extends SessionReceiverOptions, OperationOptions {}

/**
 * Describes the options passed to the `browseMessages` method on a receiver.
 */
export interface BrowseMessagesOptions extends OperationOptions {
  /**
   * @property The maximum number of messages to browse.
   * Default value is 1
   */
  maxMessageCount?: number;
  /**
   * @property The sequence number to start browsing messages from (inclusive).
   */
  fromSequenceNumber?: Long;
}
