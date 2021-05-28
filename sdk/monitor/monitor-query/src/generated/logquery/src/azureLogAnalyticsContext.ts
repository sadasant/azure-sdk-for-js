/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { AzureLogAnalyticsOptionalParams } from "./models";

const packageName = "monitor-log-query";
const packageVersion = "1.0.0";

/** @hidden */
export class AzureLogAnalyticsContext extends coreHttp.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the AzureLogAnalyticsContext class.
   * @param options The parameter options
   */
  constructor(options?: AzureLogAnalyticsOptionalParams) {
    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "https://api.loganalytics.io/v1";

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://api.loganalytics.io/v1";
  }
}
