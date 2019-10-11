import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import {
  DeleteSecretPollOperation,
  DeleteSecretPollOperationProperties,
  makeDeleteSecretPollOperation
} from "./operation";
import {
  Secret,
  SecretsClientInterface,
} from "../../certificatesModels";

export interface DeleteSecretPollerOptions {
  client: SecretsClientInterface;
  name: string;
  requestOptions?: RequestOptionsBase;
  manual?: boolean;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export class DeleteSecretPoller extends Poller<
  DeleteSecretPollOperationProperties,
  Secret
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteSecretPoller
   */
  public intervalInMs: number;

  constructor(options: DeleteSecretPollerOptions) {
    const {
      client,
      name,
      requestOptions = {},
      manual = false,
      intervalInMs = 1000,
      resumeFrom
    } = options;

    let state: PollOperationState<Secret> = {};
    let properties: DeleteSecretPollOperationProperties | undefined = undefined;

    if (resumeFrom) {
      const baseOperation: {
        state: PollOperationState<Secret>;
        properties: DeleteSecretPollOperationProperties;
      } = JSON.parse(resumeFrom);
      state = baseOperation.state;
      properties = baseOperation.properties;
    }

    const operation: DeleteSecretPollOperation = makeDeleteSecretPollOperation(state, {
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
   * @memberof DeleteSecretPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
