/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/networkStatusMappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClientContext } from "../apiManagementClientContext";

/** Class representing a NetworkStatus. */
export class NetworkStatus {
  private readonly client: ApiManagementClientContext;

  /**
   * Create a NetworkStatus.
   * @param {ApiManagementClientContext} client Reference to the service client.
   */
  constructor(client: ApiManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets the Connectivity Status to the external resources on which the Api Management service
   * depends from inside the Cloud Service. This also returns the DNS Servers as visible to the
   * CloudService.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param [options] The optional parameters
   * @returns Promise<Models.NetworkStatusListByServiceResponse>
   */
  listByService(resourceGroupName: string, serviceName: string, options?: msRest.RequestOptionsBase): Promise<Models.NetworkStatusListByServiceResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param callback The callback
   */
  listByService(resourceGroupName: string, serviceName: string, callback: msRest.ServiceCallback<Models.NetworkStatusContractByLocation[]>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByService(resourceGroupName: string, serviceName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.NetworkStatusContractByLocation[]>): void;
  listByService(resourceGroupName: string, serviceName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.NetworkStatusContractByLocation[]>, callback?: msRest.ServiceCallback<Models.NetworkStatusContractByLocation[]>): Promise<Models.NetworkStatusListByServiceResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        options
      },
      listByServiceOperationSpec,
      callback) as Promise<Models.NetworkStatusListByServiceResponse>;
  }

  /**
   * Gets the Connectivity Status to the external resources on which the Api Management service
   * depends from inside the Cloud Service. This also returns the DNS Servers as visible to the
   * CloudService.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param locationName Location in which the API Management service is deployed. This is one of the
   * Azure Regions like West US, East US, South Central US.
   * @param [options] The optional parameters
   * @returns Promise<Models.NetworkStatusListByLocationResponse>
   */
  listByLocation(resourceGroupName: string, serviceName: string, locationName: string, options?: msRest.RequestOptionsBase): Promise<Models.NetworkStatusListByLocationResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param locationName Location in which the API Management service is deployed. This is one of the
   * Azure Regions like West US, East US, South Central US.
   * @param callback The callback
   */
  listByLocation(resourceGroupName: string, serviceName: string, locationName: string, callback: msRest.ServiceCallback<Models.NetworkStatusContract>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param locationName Location in which the API Management service is deployed. This is one of the
   * Azure Regions like West US, East US, South Central US.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByLocation(resourceGroupName: string, serviceName: string, locationName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.NetworkStatusContract>): void;
  listByLocation(resourceGroupName: string, serviceName: string, locationName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.NetworkStatusContract>, callback?: msRest.ServiceCallback<Models.NetworkStatusContract>): Promise<Models.NetworkStatusListByLocationResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        locationName,
        options
      },
      listByLocationOperationSpec,
      callback) as Promise<Models.NetworkStatusListByLocationResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listByServiceOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/networkstatus",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serviceName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NetworkStatusContractByLocation"
            }
          }
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByLocationOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/locations/{locationName}/networkstatus",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.locationName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.NetworkStatusContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
