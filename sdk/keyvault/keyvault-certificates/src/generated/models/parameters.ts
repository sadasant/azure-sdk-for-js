/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationURLParameter,
  OperationQueryParameter,
  OperationParameter
} from "@azure/core-http";
import {
  Contacts as ContactsMapper,
  CertificateIssuerSetParameters as CertificateIssuerSetParametersMapper,
  CertificateIssuerUpdateParameters as CertificateIssuerUpdateParametersMapper,
  CertificateCreateParameters as CertificateCreateParametersMapper,
  CertificateImportParameters as CertificateImportParametersMapper,
  CertificatePolicy as CertificatePolicyMapper,
  CertificateUpdateParameters as CertificateUpdateParametersMapper,
  CertificateOperationUpdateParameter as CertificateOperationUpdateParameterMapper,
  CertificateMergeParameters as CertificateMergeParametersMapper,
  CertificateRestoreParameters as CertificateRestoreParametersMapper
} from "../models/mappers";

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

export const includePending: OperationQueryParameter = {
  parameterPath: ["options", "includePending"],
  mapper: {
    serializedName: "includePending",
    type: {
      name: "Boolean"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "7.2-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const certificateName: OperationURLParameter = {
  parameterPath: "certificateName",
  mapper: {
    serializedName: "certificate-name",
    required: true,
    type: {
      name: "String"
    }
  }
};

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

export const contacts: OperationParameter = {
  parameterPath: "contacts",
  mapper: ContactsMapper
};

export const parameter: OperationParameter = {
  parameterPath: "parameter",
  mapper: CertificateIssuerSetParametersMapper
};

export const issuerName: OperationURLParameter = {
  parameterPath: "issuerName",
  mapper: {
    serializedName: "issuer-name",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameter1: OperationParameter = {
  parameterPath: "parameter",
  mapper: CertificateIssuerUpdateParametersMapper
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: CertificateCreateParametersMapper
};

export const certificateName1: OperationURLParameter = {
  parameterPath: "certificateName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[0-9a-zA-Z-]+$")
    },
    serializedName: "certificate-name",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: CertificateImportParametersMapper
};

export const certificatePolicy: OperationParameter = {
  parameterPath: "certificatePolicy",
  mapper: CertificatePolicyMapper
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: CertificateUpdateParametersMapper
};

export const certificateVersion: OperationURLParameter = {
  parameterPath: "certificateVersion",
  mapper: {
    serializedName: "certificate-version",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const certificateOperation: OperationParameter = {
  parameterPath: "certificateOperation",
  mapper: CertificateOperationUpdateParameterMapper
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: CertificateMergeParametersMapper
};

export const parameters4: OperationParameter = {
  parameterPath: "parameters",
  mapper: CertificateRestoreParametersMapper
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
