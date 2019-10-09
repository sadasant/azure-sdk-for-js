import { HttpOperationResponse, RequestOptionsBase, ServiceClient, OperationArguments, OperationSpec } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";

export interface AzureOperationProperties {
  client: ServiceClient;
  requestOptions?: RequestOptionsBase;
  initialArguments?: OperationArguments;
  initialOperationSpec?: OperationSpec;
  initialResponse?: HttpOperationResponse;
  previousResponse?: HttpOperationResponse;
  resultValue?: string;
  unsupportedCancel?: boolean;
}

export interface AzureOperation extends PollOperation<AzureOperationProperties, string> {}

function getUrl(initialResponse: HttpOperationResponse, previousResponse: HttpOperationResponse) {
  const status: number = initialResponse.status;
  const initialRequest: WebResource = initialResponse.request;

  if (initialRequest.method === "POST" &&
    (status === 200 ||
      status === 201 ||
      status === 202)) {
    return previousResponse.headers.get("location");
  } else {
    return initialRequest.url;
  }
}

async function initialRequest(client: ServiceCleint, initialArguments: OperationArguments, initialOperationSpec: OperationSpec) {
  const response = await client.sendOperationRequest(initialArguments, initialOperationSpec);
  if (!response.headers.get("azure-asyncoperation")) {
    throw new Error("Can't determine long running operation polling strategy.");
  }
  return response;
}

async function doFinalRequest(initialResponse: HttpOperationResponse, previousResponse: HttpOperationResponse): boolean {
  const method: HttpMethods = initialResponse.request.method;

  let result = false;

  if (method === "PUT" || method === "PATCH") {
    result = true;
  } else {
    if (response.headers.get("location")) {
      const status: number = initialResponse.status;
      if (method === "POST") {
        result = status === 200 || status === 201;
      } else if (method === "DELETE") {
        result = status === 200 || status === 202;
      }
    }
  }

  return result;
}

function getOperationResponse(operationSpec: OperationSpec, response: HttpOperationResponse): OperationResponse | undefined {
  const statusCode: number = response.status;
  const operationResponses: { [statusCode: string]: OperationResponse } = operationSpec.responses;
  let result: OperationResponse | undefined = operationResponses[statusCode];
  if (!result) {
    if (statusCode === 200) {
      result = operationResponses[201] || operationResponses[202];
    } else if (201 <= statusCode && statusCode <= 299) {
      result = {};
    }
  }
  return result;
}

async function sendRequest(initialResponse: HttpOperationResponse, previousResponse: HttpOperationResponse = initialResponse, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
  const url = getUrl(initialResponse, previousResponse);

  const requestUrl: string = url.replace(" ", "%20");
  const httpRequest = new WebResource(requestUrl, "GET");

  httpRequest.operationSpec = previousResponse.request.operationSpec;
  httpRequest.operationResponseGetter = getOperationResponse;

  if (options && options.customHeaders) {
    const customHeaders = options.customHeaders;
    for (const headerName of Object.keys(customHeaders)) {
      httpRequest.headers.set(headerName, customHeaders[headerName]);
    }
  }

  return this.client.sendRequest(httpRequest);
}

async function update(
  this: AzureOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: AzureOperationProperties) => void;
  } = {}
): Promise<AzureOperation> {
  const { client, requestOptions, initialResponse, previousResponse, initialArguments, initialOperationSpec } = this.properties;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  let response: HttpOperationResponse;

  if (!initialResponse) {
    this.properties.initialResponse = await initialRequest(client, initialArguments, initialOperationSpec);
  } else if (doFinalRequest(initialResponse, previousResponse)) {
    response = await sendRequest(initialResponse, previousResponse, requestOptions);
    this.state.completed = true;
    this.state.result = "Done";
  } else {
    response = await sendRequest(initialResponse, previousResponse, requestOptions);
  }

  const properties: AzureOperationProperties = {
    ...this.properties,
    previousResponse: response
  };

  // Progress only after the poller has started and before the poller is done
  if (!(!initialResponse || doFinalResponse) && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makeOperation({ ...this.state }, properties);
}

async function cancel(
  this: AzureOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<AzureOperation> {
  const requestOptions = this.properties.requestOptions;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  if (abortSignal && abortSignal.aborted) {
    // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
    return await this.update({
      abortSignal
    }); // This will throw
  }

  if (this.properties.unsupportedCancel) {
    throw new Error("Cancellation not supported");
  }

  // Simulating the response of an HTTP Request
  const response = {
    status: 205
  } as HttpOperationResponse;

  return makeOperation(
    {
      ...this.state,
      cancelled: true
    },
    {
      ...this.properties,
      previousResponse: response
    }
  );
}

function toString(this: AzureOperation): string {
  return JSON.stringify({
    state: {
      ...this.state
    },
    properties: this.properties
  });
}

export function makeOperation(
  state: PollOperationState<string>,
  properties: AzureOperationProperties
): AzureOperation {
  return {
    state,
    properties,
    update,
    cancel,
    toString
  };
}
