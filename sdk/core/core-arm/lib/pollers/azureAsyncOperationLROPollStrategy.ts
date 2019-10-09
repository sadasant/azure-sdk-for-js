import { delay, HttpMethods, HttpOperationResponse, RequestOptionsBase, RestError, stripRequest, WebResource, OperationSpec, OperationArguments } from "@azure/core-http";
import { AzureServiceClient } from "../azureServiceClient";
import { getStateFromResponse, getOperationResponse, getAzureAsyncOperationHeaderValue, getResponseBody, azureServiceClientRequest } from "./utils.ts";
import { Poller, PollOperationState } from "@azure/core-lro";
import { AzureOperation, AzureOperationProperties } from "./azurePollOperation";

class AzureAsyncOperationLROPollStrategy extends Poller<AzureOperationProperties, HttpOperationResponse> {
  constructor(
    client: ServiceClient,
    requestOptions?: RequestOptionsBase,
    initialArguments?: OperationArguments,
    baseOperation?: AzureOperation,
    onProgress?: (properties: AzureOperationProperties) => void
  ) {
    let state: PollOperationState<string> = {};
    let properties: AzureOperationProperties | undefined = undefined;

    if (baseOperation) {
      state = baseOperation.state;
      properties = baseOperation.properties;
    }

    const operation = makeOperation(state, {
      ...properties,
      client,
      requestOptions,
      initialArguments,
    });

    super(operation, manual);

    if (onProgress) {
      this.onProgress(onProgress);
    }
  }

  async delay(): Promise<void> {
    const { client, previousResponse } = this.properties;
    let delayInSeconds = 30;

    if (client.longRunningOperationRetryTimeout != undefined) {
      delayInSeconds = client.longRunningOperationRetryTimeout;
    } else {
      const retryAfterHeaderValue: string | undefined = previousResponse.headers.get("retry-after");
      if (retryAfterHeaderValue) {
        const retryAfterDelayInSeconds: number = parseInt(retryAfterHeaderValue);
        if (!Number.isNaN(retryAfterDelayInSeconds)) {
          delayInSeconds = retryAfterDelayInSeconds;
        }
      }
    }

    return delay(delayInSeconds * 1000);
  }
}
