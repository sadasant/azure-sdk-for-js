// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { createHash } from "crypto";
import { CryptographyClient, KeyClient, KeyVaultKey } from "../../src";
import * as dotenv from "dotenv";
import { ClientSecretCredential, TokenCredential } from "@azure/identity";

dotenv.config();

interface SignTestOptions {
  valueSize: number;
  keyName: string;
}

export class SignTest extends PerfStressTest {
  public options: PerfStressOptionDictionary<SignTestOptions> = {
    valueSize: {
      description: "URL that will replace any request's original targeted URL",
      defaultValue: 100,
      shortName: "vs"
    },
    keyName: {
      description: "Name of the key",
      defaultValue: "PerfStress",
      shortName: "kn"
    }
  };

  public credential: TokenCredential;
  public keyClient: KeyClient;
  public value: string;
  public keyName: string;
  public keyVaultKey: KeyVaultKey | undefined;

  constructor() {
    super();
    const keyVaultName = process.env.KEYVAULT_NAME;
    const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    this.credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID!,
      process.env.AZURE_CLIENT_ID!,
      process.env.AZURE_CLIENT_SECRET!
    );
    this.keyClient = new KeyClient(keyVaultUrl, this.credential);
    const valueSize = this.options.valueSize.value;
    const valueSizeArray = new Array(valueSize);
    this.value = valueSizeArray.join("x");
    this.keyName = this.options.keyName.value || this.options.keyName.defaultValue!;
  }


  public async globalSetup(): Promise<void> {
    this.keyVaultKey = await this.keyClient.createKey(this.keyName, "RSA");
  }

  public async globalCleanup() {
    const deletePoller = await this.keyClient.beginDeleteKey(this.keyName);
    await deletePoller.pollUntilDone();
    await this.keyClient.purgeDeletedKey(this.keyName);
  }

  async runAsync(): Promise<void> {
    const hash = createHash("sha256");
    hash.update(this.value!);
    const digest = hash.digest();
    const cryptoClient = new CryptographyClient(this.keyVaultKey!.id!, this.credential!);
    await cryptoClient.sign("RS256", digest);
  }
}
