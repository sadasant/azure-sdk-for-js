// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateClient } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// This sample creates a self-signed certificate, then deletes it, then recovers it.
// Soft-delete is required for this sample to run: https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete

export async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential, {
    // The KEY_VAULT_API_VERSION environment variable is used by our CI pipelines to run the samples and check their validity automatically.
    // The serviceVersion is an optional parameter that allows users to specify a Key Vault service API version.
    serviceVersion: process.env.KEY_VAULT_API_VERSION
  });

  const uniqueString = new Date().getTime();
  const certificateName = `cert${uniqueString}`;

  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });

  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);

  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Deleted certificate: ", deletedCertificate);

  const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
  const certificateWithPolicy = await recoverPoller.pollUntilDone();
  console.log("Certificate with policy:", certificateWithPolicy);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
