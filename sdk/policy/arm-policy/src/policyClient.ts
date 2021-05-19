/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { PolicyClientContext } from "./policyClientContext";

class PolicyClient extends PolicyClientContext {
  // Operation groups
  dataPolicyManifests: operations.DataPolicyManifests;
  policyAssignments: operations.PolicyAssignments;
  policyDefinitions: operations.PolicyDefinitions;
  policySetDefinitions: operations.PolicySetDefinitions;
  policyExemptions: operations.PolicyExemptions;

  /**
   * Initializes a new instance of the PolicyClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param subscriptionId The ID of the target subscription.
   * @param [options] The parameter options
   */
  constructor(
    credentials: msRest.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.PolicyClientOptions
  ) {
    super(credentials, subscriptionId, options);
    this.dataPolicyManifests = new operations.DataPolicyManifests(this);
    this.policyAssignments = new operations.PolicyAssignments(this);
    this.policyDefinitions = new operations.PolicyDefinitions(this);
    this.policySetDefinitions = new operations.PolicySetDefinitions(this);
    this.policyExemptions = new operations.PolicyExemptions(this);
  }
}

// Operation Specifications

export { PolicyClient, PolicyClientContext, Models as PolicyModels, Mappers as PolicyMappers };
export * from "./operations";
