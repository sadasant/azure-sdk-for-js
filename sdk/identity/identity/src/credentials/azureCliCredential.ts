// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { createSpan } from "../util/tracing";
import { CredentialUnavailable } from "../client/errors";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import * as child_process from "child_process";
import { ensureValidScope, getScopeResource } from "../util/scopeUtils";

function getSafeWorkingDir(): string {
  if (process.platform === "win32") {
    if (!process.env.SystemRoot) {
      throw new Error("Azure CLI credential expects a 'SystemRoot' environment variable");
    }
    return process.env.SystemRoot;
  } else {
    return "/bin";
  }
}

const logger = credentialLogger("AzureCliCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 * To be able to use this credential, ensure that you have already logged
 * in via the 'az' tool using the command "az login" from the commandline.
 */
export class AzureCliCredential implements TokenCredential {
  /**
   * Gets the access token from Azure CLI
   * @param resource - The resource to use when getting the token
   */
  protected async getAzureCliAccessToken(
    resource: string
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    return new Promise((resolve, reject) => {
      try {
        child_process.execFile(
          "az",
          ["account", "get-access-token", "--output", "json", "--resource", resource],
          { cwd: getSafeWorkingDir() },
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr, error });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return new Promise((resolve, reject) => {
      const scope = typeof scopes === "string" ? scopes : scopes[0];
      logger.getToken.info(`Using the scope ${scope}`);

      ensureValidScope(scope, logger);
      const resource = getScopeResource(scope);

      let responseData = "";

      const { span } = createSpan("AzureCliCredential-getToken", options);
      this.getAzureCliAccessToken(resource)
        .then((obj: any) => {
          if (obj.stderr) {
            const isLoginError = obj.stderr.match("(.*)az login(.*)");
            const isNotInstallError =
              obj.stderr.match("az:(.*)not found") ||
              obj.stderr.startsWith("'az' is not recognized");
            if (isNotInstallError) {
              const error = new CredentialUnavailable(
                "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
              );
              logger.getToken.info(formatError(scopes, error));
              throw error;
            } else if (isLoginError) {
              const error = new CredentialUnavailable(
                "Please run 'az login' from a command prompt to authenticate before using this credential."
              );
              logger.getToken.info(formatError(scopes, error));
              throw error;
            }
            const error = new CredentialUnavailable(obj.stderr);
            logger.getToken.info(formatError(scopes, error));
            throw error;
          } else {
            responseData = obj.stdout;
            const response: { accessToken: string; expiresOn: string } = JSON.parse(responseData);
            logger.getToken.info(formatSuccess(scopes));
            const returnValue = {
              token: response.accessToken,
              expiresOnTimestamp: new Date(response.expiresOn).getTime()
            };
            resolve(returnValue);
            return returnValue;
          }
        })
        .catch((err) => {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err.message
          });
          logger.getToken.info(formatError(scopes, err));
          reject(err);
        });
    });
  }
}
