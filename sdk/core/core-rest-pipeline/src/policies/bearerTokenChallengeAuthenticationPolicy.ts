// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { createTokenCycler } from "../util/tokenCycler";

/**
 * The programmatic identifier of the bearerTokenChallengeAuthenticationPolicy.
 */
export const bearerTokenChallengeAuthenticationPolicyName =
  "bearerTokenChallengeAuthenticationPolicy";

/**
 * Options sent to the challenge callbacks
 */
export interface ChallengeCallbackOptions {
  /**
   * The scopes for which the bearer token applies.
   */
  scopes: string[];
  /**
   * Additional claims to be included in the token.
   * For more information on format and content: [the claims parameter specification](href="https://openid.net/specs/openid-connect-core-1_0-final.html#ClaimsParameter).
   */
  claims?: string;
  /**
   * Function that retrieves either a cached token or a new token.
   */
  getToken: (scopes: string | string[], options: GetTokenOptions) => Promise<AccessToken | null>;
  /**
   * Request that the policy is trying to fulfill.
   */
  request: PipelineRequest;
  /**
   * Response containing the challenge.
   */
  response?: PipelineResponse;
}

/**
 * Options to override the processing of [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) challenges.
 */
export interface ChallengeCallbacks {
  /**
   * Allows for the authentication of the main request of this policy before it's sent.
   * The `setAuthorizationHeader` parameter received through the `ChallengeCallbackOptions`
   * allows developers to easily assign a token to the ongoing request.
   */
  authorizeRequest?(options: ChallengeCallbackOptions): Promise<void>;
  /**
   * Allows to handle authentication challenges and to re-authorize the request.
   * The response containing the challenge is `options.response`.
   * The `setAuthorizationHeader` parameter received through the `ChallengeCallbackOptions`
   * allows developers to easily assign a token to the ongoing request.
   * If this method returns true, the underlying request will be sent once again.
   */
  authorizeRequestOnChallenge(options: ChallengeCallbackOptions): Promise<boolean>;
}

/**
 * Options to configure the bearerTokenChallengeAuthenticationPolicy
 */
export interface BearerTokenChallengeAuthenticationPolicyOptions {
  /**
   * The TokenCredential implementation that can supply the bearer token.
   */
  credential: TokenCredential;
  /**
   * The scopes for which the bearer token applies.
   */
  scopes: string[];
  /**
   * Allows for the processing of [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) challenges.
   * If provided, it must contain at least the `authorizeRequestOnChallenge` method.
   * If provided, after a request is sent, if it has a challenge, it can be processed to re-send the original request with the relevant challenge information.
   */
  challengeCallbacks?: ChallengeCallbacks;
}

/**
 * Retrieves a token from a token cache or a credential.
 */
export async function retrieveToken(
  options: ChallengeCallbackOptions
): Promise<AccessToken | undefined> {
  const { scopes, claims, getToken, request } = options;

  const getTokenOptions: GetTokenOptions = {
    claims,
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions
  };

  return (await getToken(scopes, getTokenOptions)) || undefined;
}

/**
 * Default authorize request
 */
async function defaultAuthorizeRequest(options: ChallengeCallbackOptions): Promise<void> {
  const accessToken = await retrieveToken(options);
  if (!accessToken) {
    return;
  }

  options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
}

/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function getChallenge(response: PipelineResponse): string | undefined {
  const challenge = response.headers.get("WWW-Authenticate");
  if (response.status === 401 && challenge) {
    return challenge;
  }
  return;
}

/**
 * Default authorize request on challenge
 */
async function defaultAuthorizeRequestOnChallenge(
  _options: ChallengeCallbackOptions & { response: PipelineResponse }
): Promise<boolean> {
  return false;
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenChallengeAuthenticationPolicy(
  options: BearerTokenChallengeAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes, challengeCallbacks } = options;
  const callbacks = {
    authorizeRequest: challengeCallbacks?.authorizeRequest ?? defaultAuthorizeRequest,
    authorizeRequestOnChallenge:
      challengeCallbacks?.authorizeRequestOnChallenge ?? defaultAuthorizeRequestOnChallenge,
    // keep all other properties
    ...challengeCallbacks
  };

  // This function encapsulates the entire process of reliably retrieving the token
  // The options are left out of the public API until there's demand to configure this.
  // Remember to extend `BearerTokenChallengeAuthenticationPolicyOptions` with `TokenCyclerOptions`
  // in order to pass through the `options` object.
  const cycler = createTokenCycler(credential /* , options */);

  return {
    name: bearerTokenChallengeAuthenticationPolicyName,
    /**
     * If there's no challenge parameter:
     * - It will try to retrieve the token using the cache, or the credential's getToken.
     * - Then it will try the next policy with or without the retrieved token.
     *
     * It uses the challenge parameters to:
     * - Skip a first attempt to get the token from the credential if there's no cached token,
     *   since it expects the token to be retrievable only after the challenge.
     * - Prepare the outgoing request if the `prepareRequest` method has been provided.
     * - Send an initial request to receive the challenge if it fails.
     * - Process a challenge if the response contains it.
     * - Retrieve a token with the challenge information, then re-send the request.
     */
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      await callbacks.authorizeRequest({
        scopes,
        request,
        getToken: cycler.getToken
      });

      let response: PipelineResponse;
      let error: Error | undefined;
      try {
        response = await next(request);
      } catch (err) {
        error = err;
        response = err.response;
      }

      if (response?.status === 401 && getChallenge(response)) {
        // processes challenge
        const shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
          scopes,
          request,
          response,
          getToken: cycler.getToken
        });

        if (shouldSendRequest) {
          return next(request);
        }
      }

      if (error) {
        throw error;
      } else {
        return response;
      }
    }
  };
}
