// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { createHash } from "crypto";
import { CryptographyClient, KeyClient, KeyVaultKey } from "../../src";
import * as dotenv from "dotenv";
import { ClientSecretCredential, TokenCredential } from "@azure/identity";
import { delay } from "@azure/core-http";

dotenv.config();

// npm run perfstress-test:node -- SignTest --warmup 30 --duration 20 --iterations 120 --milliseconds-to-log 10000
// npm run perfstress-test:node -- SignTest --warmup 0 --duration 2400 --parallel 5 > output 2>&1

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
  public total = 0;
  public cryptoClient: CryptographyClient | undefined;

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
  }

  public async globalCleanup() {
  }

  public async setup() {
    console.log(process.memoryUsage().heapUsed);
    try {
      this.keyVaultKey = await this.keyClient.getKey(this.keyName);
      console.log("Got key vault key", !!this.keyVaultKey);
      this.cryptoClient = new CryptographyClient(this.keyVaultKey!.id!, this.credential!);
      return;
    } catch (e) {
    }
    console.log("No key vault key, getting deleted");
    try {
      const deletedKey = await this.keyClient.getDeletedKey(this.keyName);
      await this.keyClient.purgeDeletedKey(deletedKey.name);
    } catch (e) {
    }
    console.log("No deleted key vault key, making new");
    this.keyVaultKey = await this.keyClient.createKey(this.keyName, "RSA");
    this.cryptoClient = new CryptographyClient(this.keyVaultKey!.id!, this.credential!);
  }

  public async cleanup() {
    console.log(process.memoryUsage().heapUsed);
    const deletePoller = await this.keyClient.beginDeleteKey(this.keyName);
    await deletePoller.pollUntilDone();
    await this.keyClient.purgeDeletedKey(this.keyName);
  }

  async runAsync(): Promise<void> {
    const hash = createHash("sha256");
    hash.update(this.value!);
    const digest = hash.digest();
    await this.cryptoClient!.sign("RS256", digest);
    if (this.total % 100 === 0) {
      console.log(process.memoryUsage().heapUsed);
    }
    this.total++;
    await delay(200);
  }
}
