// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollerLike } from "../core-lro-update";
import {
  CertificateOperationPollOperationPublicState,
  CertificateOperationPollOperationPrivateState,
  makeCertificateOperationPollOperation
} from "./operation";
import { CertificateClientInterface, KeyVaultCertificateWithPolicy } from "../../certificatesModels";
import { CertificateOperation } from "../../core/models";

export interface CertificateOperationPollerOptions {
  client: CertificateClientInterface;
  certificateName: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Interface that represents a basic Poller with the specifications defined by CertificateOperationPoller.
 */
export type CertificateOperationPollerLike = PollerLike<CertificateOperationPollOperationPublicState, KeyVaultCertificateWithPolicy>;

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export class CertificateOperationPoller extends Poller<
  CertificateOperationPollOperationPrivateState,
  KeyVaultCertificateWithPolicy
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof CertificateOperationPoller
   */
  public intervalInMs: number;

  constructor(options: CertificateOperationPollerOptions) {
    const { client, certificateName, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: CertificateOperationPollOperationPrivateState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeCertificateOperationPollOperation({
      ...state,
      certificateName,
      requestOptions,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof CertificateOperationPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Method to get the certificate operation
   */
  public getCertificateOperation(): CertificateOperation {
    return this.operation.state.certificateOperation!;
  }
}