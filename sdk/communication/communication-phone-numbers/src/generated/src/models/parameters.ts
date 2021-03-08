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
  PhoneNumberSearchRequest as PhoneNumberSearchRequestMapper,
  PhoneNumberPurchaseRequest as PhoneNumberPurchaseRequestMapper,
  PhoneNumberCapabilitiesRequest as PhoneNumberCapabilitiesRequestMapper
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

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const phoneNumberType: OperationParameter = {
  parameterPath: "phoneNumberType",
  mapper: PhoneNumberSearchRequestMapper
};

export const assignmentType: OperationParameter = {
  parameterPath: "assignmentType",
  mapper: PhoneNumberSearchRequestMapper
};

export const capabilities: OperationParameter = {
  parameterPath: "capabilities",
  mapper: PhoneNumberSearchRequestMapper
};

export const areaCode: OperationParameter = {
  parameterPath: ["options", "areaCode"],
  mapper: PhoneNumberSearchRequestMapper
};

export const quantity: OperationParameter = {
  parameterPath: ["options", "quantity"],
  mapper: PhoneNumberSearchRequestMapper
};

export const endpoint: OperationURLParameter = {
  parameterPath: "endpoint",
  mapper: {
    serializedName: "endpoint",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const countryCode: OperationURLParameter = {
  parameterPath: "countryCode",
  mapper: {
    serializedName: "countryCode",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2021-03-07",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const searchId: OperationURLParameter = {
  parameterPath: "searchId",
  mapper: {
    serializedName: "searchId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const searchId1: OperationParameter = {
  parameterPath: ["options", "searchId"],
  mapper: PhoneNumberPurchaseRequestMapper
};

export const operationId: OperationURLParameter = {
  parameterPath: "operationId",
  mapper: {
    serializedName: "operationId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const phoneNumber: OperationURLParameter = {
  parameterPath: "phoneNumber",
  mapper: {
    serializedName: "phoneNumber",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const skip: OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    serializedName: "skip",
    type: {
      name: "Number"
    }
  }
};

export const top: OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    defaultValue: 100,
    serializedName: "top",
    type: {
      name: "Number"
    }
  }
};

export const contentType1: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/merge-patch+json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const calling: OperationParameter = {
  parameterPath: ["options", "calling"],
  mapper: PhoneNumberCapabilitiesRequestMapper
};

export const sms: OperationParameter = {
  parameterPath: ["options", "sms"],
  mapper: PhoneNumberCapabilitiesRequestMapper
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