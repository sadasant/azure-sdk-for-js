/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { ApiVersion10, AppConfigurationOptionalParams } from "./models";

const packageName = "app-configuration";
const packageVersion = "1.2.1";

/** @internal */
export class AppConfigurationContext extends coreHttp.ServiceClient {
  endpoint: string;
  syncToken?: string;
  apiVersion: ApiVersion10;

  /**
   * Initializes a new instance of the AppConfigurationContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The endpoint of the App Configuration instance to send requests to.
   * @param apiVersion Api Version
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    apiVersion: ApiVersion10,
    options?: AppConfigurationOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }
    if (apiVersion === undefined) {
      throw new Error("'apiVersion' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{endpoint}";

    // Parameter assignments
    this.endpoint = endpoint;
    this.apiVersion = apiVersion;
  }
}
