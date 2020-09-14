/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import {
  KeyCreateParameters as KeyCreateParametersMapper,
  KeyImportParameters as KeyImportParametersMapper,
  KeyUpdateParameters as KeyUpdateParametersMapper,
  KeyRestoreParameters as KeyRestoreParametersMapper,
  KeyOperationsParameters as KeyOperationsParametersMapper,
  KeySignParameters as KeySignParametersMapper,
  KeyVerifyParameters as KeyVerifyParametersMapper
} from "../models/mappers";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyCreateParametersMapper
};

export const vaultBaseUrl: OperationURLParameter = {
  parameterPath: "vaultBaseUrl",
  mapper: {
    serializedName: "vaultBaseUrl",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const keyName: OperationURLParameter = {
  parameterPath: "keyName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[0-9a-zA-Z-]+$")
    },
    serializedName: "key-name",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "7.1",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyImportParametersMapper
};

export const keyName1: OperationURLParameter = {
  parameterPath: "keyName",
  mapper: {
    serializedName: "key-name",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyUpdateParametersMapper
};

export const keyVersion: OperationURLParameter = {
  parameterPath: "keyVersion",
  mapper: {
    serializedName: "key-version",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const maxresults: OperationQueryParameter = {
  parameterPath: ["options", "maxresults"],
  mapper: {
    constraints: {
      InclusiveMaximum: 25,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyRestoreParametersMapper
};

export const parameters4: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyOperationsParametersMapper
};

export const parameters5: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeySignParametersMapper
};

export const parameters6: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyVerifyParametersMapper
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
