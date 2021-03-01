/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/connectedClusterOperationsMappers";
import * as Parameters from "../models/parameters";
import { ConnectedKubernetesClientContext } from "../connectedKubernetesClientContext";

/** Class representing a ConnectedClusterOperations. */
export class ConnectedClusterOperations {
  private readonly client: ConnectedKubernetesClientContext;

  /**
   * Create a ConnectedClusterOperations.
   * @param {ConnectedKubernetesClientContext} client Reference to the service client.
   */
  constructor(client: ConnectedKubernetesClientContext) {
    this.client = client;
  }

  /**
   * API to register a new Kubernetes cluster and create a tracked resource in Azure Resource Manager
   * (ARM).
   * @summary Register a new Kubernetes cluster with Azure Resource Manager.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param connectedCluster Parameters supplied to Create a Connected Cluster.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterCreateResponse>
   */
  create(resourceGroupName: string, clusterName: string, connectedCluster: Models.ConnectedCluster, options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterCreateResponse> {
    return this.beginCreate(resourceGroupName,clusterName,connectedCluster,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.ConnectedClusterCreateResponse>;
  }

  /**
   * API to update certain properties of the connected cluster resource
   * @summary Updates a connected cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param connectedClusterPatch Parameters supplied to update Connected Cluster.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterUpdateResponse>
   */
  update(resourceGroupName: string, clusterName: string, connectedClusterPatch: Models.ConnectedClusterPatch, options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param connectedClusterPatch Parameters supplied to update Connected Cluster.
   * @param callback The callback
   */
  update(resourceGroupName: string, clusterName: string, connectedClusterPatch: Models.ConnectedClusterPatch, callback: msRest.ServiceCallback<Models.ConnectedCluster>): void;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param connectedClusterPatch Parameters supplied to update Connected Cluster.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(resourceGroupName: string, clusterName: string, connectedClusterPatch: Models.ConnectedClusterPatch, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConnectedCluster>): void;
  update(resourceGroupName: string, clusterName: string, connectedClusterPatch: Models.ConnectedClusterPatch, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConnectedCluster>, callback?: msRest.ServiceCallback<Models.ConnectedCluster>): Promise<Models.ConnectedClusterUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        clusterName,
        connectedClusterPatch,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.ConnectedClusterUpdateResponse>;
  }

  /**
   * Returns the properties of the specified connected cluster, including name, identity, properties,
   * and additional cluster details.
   * @summary Get the properties of the specified connected cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterGetResponse>
   */
  get(resourceGroupName: string, clusterName: string, options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param callback The callback
   */
  get(resourceGroupName: string, clusterName: string, callback: msRest.ServiceCallback<Models.ConnectedCluster>): void;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, clusterName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConnectedCluster>): void;
  get(resourceGroupName: string, clusterName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConnectedCluster>, callback?: msRest.ServiceCallback<Models.ConnectedCluster>): Promise<Models.ConnectedClusterGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        clusterName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.ConnectedClusterGetResponse>;
  }

  /**
   * Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM).
   * @summary Delete a connected cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, clusterName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginDeleteMethod(resourceGroupName,clusterName,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * API to enumerate registered connected K8s clusters under a Resource Group
   * @summary Lists all connected clusters
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterListByResourceGroupResponse>
   */
  listByResourceGroup(resourceGroupName: string, options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterListByResourceGroupResponse>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  listByResourceGroup(resourceGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConnectedClusterList>, callback?: msRest.ServiceCallback<Models.ConnectedClusterList>): Promise<Models.ConnectedClusterListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      listByResourceGroupOperationSpec,
      callback) as Promise<Models.ConnectedClusterListByResourceGroupResponse>;
  }

  /**
   * API to enumerate registered connected K8s clusters under a Subscription
   * @summary Lists all connected clusters
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterListBySubscriptionResponse>
   */
  listBySubscription(options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterListBySubscriptionResponse>;
  /**
   * @param callback The callback
   */
  listBySubscription(callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listBySubscription(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  listBySubscription(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConnectedClusterList>, callback?: msRest.ServiceCallback<Models.ConnectedClusterList>): Promise<Models.ConnectedClusterListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listBySubscriptionOperationSpec,
      callback) as Promise<Models.ConnectedClusterListBySubscriptionResponse>;
  }

  /**
   * API to register a new Kubernetes cluster and create a tracked resource in Azure Resource Manager
   * (ARM).
   * @summary Register a new Kubernetes cluster with Azure Resource Manager.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param connectedCluster Parameters supplied to Create a Connected Cluster.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginCreate(resourceGroupName: string, clusterName: string, connectedCluster: Models.ConnectedCluster, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        clusterName,
        connectedCluster,
        options
      },
      beginCreateOperationSpec,
      options);
  }

  /**
   * Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM).
   * @summary Delete a connected cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kubernetes cluster on which get is called.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginDeleteMethod(resourceGroupName: string, clusterName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        clusterName,
        options
      },
      beginDeleteMethodOperationSpec,
      options);
  }

  /**
   * API to enumerate registered connected K8s clusters under a Resource Group
   * @summary Lists all connected clusters
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterListByResourceGroupNextResponse>
   */
  listByResourceGroupNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterListByResourceGroupNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  listByResourceGroupNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConnectedClusterList>, callback?: msRest.ServiceCallback<Models.ConnectedClusterList>): Promise<Models.ConnectedClusterListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByResourceGroupNextOperationSpec,
      callback) as Promise<Models.ConnectedClusterListByResourceGroupNextResponse>;
  }

  /**
   * API to enumerate registered connected K8s clusters under a Subscription
   * @summary Lists all connected clusters
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConnectedClusterListBySubscriptionNextResponse>
   */
  listBySubscriptionNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ConnectedClusterListBySubscriptionNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listBySubscriptionNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listBySubscriptionNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConnectedClusterList>): void;
  listBySubscriptionNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConnectedClusterList>, callback?: msRest.ServiceCallback<Models.ConnectedClusterList>): Promise<Models.ConnectedClusterListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listBySubscriptionNextOperationSpec,
      callback) as Promise<Models.ConnectedClusterListBySubscriptionNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const updateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "connectedClusterPatch",
    mapper: {
      ...Mappers.ConnectedClusterPatch,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedCluster
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedCluster
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByResourceGroupOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedClusterList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listBySubscriptionOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Kubernetes/connectedClusters",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedClusterList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const beginCreateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "connectedCluster",
    mapper: {
      ...Mappers.ConnectedCluster,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedCluster
    },
    201: {
      bodyMapper: Mappers.ConnectedCluster
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const beginDeleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByResourceGroupNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedClusterList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listBySubscriptionNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConnectedClusterList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
