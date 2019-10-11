import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import {
  DeleteKeyPollOperation,
  DeleteKeyPollOperationProperties,
  makeDeleteKeyPollOperation
} from "./operation";
import {
  Key,
  KeysClientInterface,
} from "../../certificatesModels";

export interface DeleteKeyPollerOptions {
  client: KeysClientInterface;
  name: string;
  requestOptions?: RequestOptionsBase;
  manual?: boolean;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export class DeleteKeyPoller extends Poller<
  DeleteKeyPollOperationProperties,
  Key
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteKeyPoller
   */
  public intervalInMs: number;

  constructor(options: DeleteKeyPollerOptions) {
    const {
      client,
      name,
      requestOptions = {},
      manual = false,
      intervalInMs = 1000,
      resumeFrom
    } = options;

    let state: PollOperationState<Key> = {};
    let properties: DeleteKeyPollOperationProperties | undefined = undefined;

    if (resumeFrom) {
      const baseOperation: {
        state: PollOperationState<Key>;
        properties: DeleteKeyPollOperationProperties;
      } = JSON.parse(resumeFrom);
      state = baseOperation.state;
      properties = baseOperation.properties;
    }

    const operation: DeleteKeyPollOperation = makeDeleteKeyPollOperation(state, {
      ...properties,
      name,
      requestOptions,
      client
    });

    super(operation, manual);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof DeleteKeyPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
