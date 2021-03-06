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
  TrainRequest as TrainRequestMapper,
  SourcePath as SourcePathMapper,
  CopyRequest as CopyRequestMapper,
  ComposeRequest as ComposeRequestMapper
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

export const trainRequest: OperationParameter = {
  parameterPath: "trainRequest",
  mapper: TrainRequestMapper
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

export const modelId: OperationURLParameter = {
  parameterPath: "modelId",
  mapper: {
    serializedName: "modelId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const includeKeys: OperationQueryParameter = {
  parameterPath: ["options", "includeKeys"],
  mapper: {
    serializedName: "includeKeys",
    type: {
      name: "Boolean"
    }
  }
};

export const contentType1: OperationParameter = {
  parameterPath: "contentType",
  mapper: {
    serializedName: "Content-Type",
    required: true,
    type: {
      name: "Enum",
      allowedValues: [
        "application/pdf",
        "image/bmp",
        "image/jpeg",
        "image/png",
        "image/tiff"
      ]
    }
  }
};

export const fileStream: OperationParameter = {
  parameterPath: "fileStream",
  mapper: {
    serializedName: "fileStream",
    required: true,
    type: {
      name: "Stream"
    }
  }
};

export const accept1: OperationParameter = {
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

export const contentType2: OperationParameter = {
  parameterPath: "contentType",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const fileStream1: OperationParameter = {
  parameterPath: ["options", "fileStream"],
  mapper: SourcePathMapper
};

export const includeTextDetails: OperationQueryParameter = {
  parameterPath: ["options", "includeTextDetails"],
  mapper: {
    serializedName: "includeTextDetails",
    type: {
      name: "Boolean"
    }
  }
};

export const pages: OperationQueryParameter = {
  parameterPath: ["options", "pages"],
  mapper: {
    serializedName: "pages",
    type: {
      name: "Sequence",
      element: {
        constraints: {
          Pattern: new RegExp("(^[0-9]+-[0-9]+$)|(^[0-9]+$)")
        },
        type: {
          name: "String"
        }
      }
    }
  }
};

export const resultId: OperationURLParameter = {
  parameterPath: "resultId",
  mapper: {
    serializedName: "resultId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const copyRequest: OperationParameter = {
  parameterPath: "copyRequest",
  mapper: CopyRequestMapper
};

export const composeRequest: OperationParameter = {
  parameterPath: "composeRequest",
  mapper: ComposeRequestMapper
};

export const accept2: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json, text/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const locale: OperationQueryParameter = {
  parameterPath: ["options", "locale"],
  mapper: {
    serializedName: "locale",
    type: {
      name: "String"
    }
  }
};

export const language: OperationQueryParameter = {
  parameterPath: ["options", "language"],
  mapper: {
    serializedName: "language",
    type: {
      name: "String"
    }
  }
};

export const readingOrder: OperationQueryParameter = {
  parameterPath: ["options", "readingOrder"],
  mapper: {
    defaultValue: "basic",
    serializedName: "readingOrder",
    type: {
      name: "Enum",
      allowedValues: ["basic", "natural"]
    }
  }
};

export const op: OperationQueryParameter = {
  parameterPath: "op",
  mapper: {
    defaultValue: "full",
    isConstant: true,
    serializedName: "op",
    type: {
      name: "String"
    }
  }
};

export const op1: OperationQueryParameter = {
  parameterPath: "op",
  mapper: {
    defaultValue: "summary",
    isConstant: true,
    serializedName: "op",
    type: {
      name: "String"
    }
  }
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
