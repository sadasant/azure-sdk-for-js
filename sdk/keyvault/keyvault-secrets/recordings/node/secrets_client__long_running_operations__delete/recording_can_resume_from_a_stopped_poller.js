let nock = require('nock');

module.exports.hash = "e5f09a952769e66b6568cc4020cc9782";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '30600f66-948e-4fc3-b1a6-212caa0da31b',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:01 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  'bdab5f05-cd83-4feb-9578-ad1ba3877000',
  'x-ms-ests-server',
  '2.1.10433.14 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvfrZvrxxg5LqyM7u8OND68_aSJHAQAAACKjOdYOAAAA; expires=Thu, 28-May-2020 04:08:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/recoverSecretName-canresumefromastoppedpoller-', {"value":"value","attributes":{}})
  .query(true)
  .reply(200, {"value":"value","id":"https://keyvault_name.vault.azure.net/secrets/recoverSecretName-canresumefromastoppedpoller-/979c40cc11e1487c9c67885c7a0550b5","attributes":{"enabled":true,"created":1588046882,"updated":1588046882,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '377f893c-630a-4f90-ac9a-ce18a71ba48c',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT',
  'Content-Length',
  '304'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-","deletedDate":1588046882,"scheduledPurgeDate":1595822882,"id":"https://keyvault_name.vault.azure.net/secrets/recoverSecretName-canresumefromastoppedpoller-/979c40cc11e1487c9c67885c7a0550b5","attributes":{"enabled":true,"created":1588046882,"updated":1588046882,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c0b20af2-2d6f-47a1-9a56-233dfb5168f0',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT',
  'Content-Length',
  '481'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e4ec3945-48cf-49df-80fc-e8ecb2a3d739',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1fd98e0a-e5bf-462b-a762-e40d5e36a45e',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '837c0188-f0d0-4fd6-8916-7e1e2f99f239',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '585853fb-a58b-441d-bf3e-6889aae063b9',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5be93060-6bf4-4c48-bd18-21b3ee1c027f',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9e2557e5-8c1a-424b-a730-97e870f66019',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '214727c2-9822-475e-a435-247421fcbbb2',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e4bb12da-ba7c-4a6d-8695-2af2fb05f274',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '92f4fdfa-edcd-44eb-97a9-a1c6a6a8c0c5',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0dd363ce-0cbb-4712-a049-1165950adc74',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f69743f1-e0a3-445d-b170-f628c890f712',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3ae04c6b-79d4-4f3c-a57a-3ec176377349',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '510535c7-0c02-40c1-8c16-0fa6315b8d78',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '89c47d00-583c-446d-a49b-52a31a61fb37',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7f92d171-9013-489c-b554-a4e193434e60',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ef9a0121-fc95-4e95-80db-e4445283197a',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bf6cdf81-bdbe-4e1c-8015-16731267d72c',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6fb21641-7aa3-405e-988c-9c403244f16c',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '79f36edf-d23d-41db-89b3-e76cddf6455b',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '90e24b8d-d1f6-44b3-a2ec-94cc7bd1a86b',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '163b552c-33e1-4c45-86b5-5490f91867b5',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '47635c2d-4b1e-454f-b321-fc39eeec32a1',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ecf237a5-8372-4f94-b1cb-291a6de3c304',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4b9001c3-04bd-4086-b046-65e8a0000244',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '73ff86d0-ee6f-4017-a248-e0f55ba78a1a',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c0f6c794-1af0-4d5f-9199-e8778e580699',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1a303a06-0ea8-4362-a26b-4fddfce39194',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6f911c48-f052-4bfe-814b-0e3fbd361a95',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '97397fbd-d5d1-49c4-87a5-e388cf32324c',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5657a980-a6ca-4840-8bfd-9cf02f06e7de',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b7c743b9-1497-43a9-82ab-05d7a00600bf',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:08:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4e17a82f-e27d-482a-83b9-ed783aeb9208',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:09:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '269d9784-18e6-47d9-b8a4-e26a596f34f1',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:09:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: recoverSecretName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '948838bc-3ec3-4c9b-bed0-47686e1fe2ac',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:09:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-","deletedDate":1588046882,"scheduledPurgeDate":1595822882,"id":"https://keyvault_name.vault.azure.net/secrets/recoverSecretName-canresumefromastoppedpoller-/979c40cc11e1487c9c67885c7a0550b5","attributes":{"enabled":true,"created":1588046882,"updated":1588046882,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '845c1bdd-5201-4dfb-87be-6dd852125ecb',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:09:06 GMT',
  'Content-Length',
  '481'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/recoverSecretName-canresumefromastoppedpoller-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '464ce015-d2f8-4b2c-bd3e-bcac3fb30482',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 04:09:06 GMT'
]);
