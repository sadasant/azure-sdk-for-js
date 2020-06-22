let nock = require('nock');

module.exports.hash = "7bec77d9a59c8963760bf8c4309fdc45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RSA15-/create')
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
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '39caef4a-98ed-45b2-bf02-e60aadc6a15c',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.132.216;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 20 Jun 2020 19:57:38 GMT'
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
  '06e709c3-c148-4dd6-81f0-5be144e06c00',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgxTjXxjSl1EjXcXZ1Bn-v4_aSJHAQAAADFhgNYOAAAA; expires=Mon, 20-Jul-2020 19:57:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sat, 20 Jun 2020 19:57:38 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RSA15-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-/79c21ded6ca145ed9988b76142730d45","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xBr2g-ne53Ywslzhuu-fzcgfdxRC7ZcBkbl213ByOtcw66zB_sn0sMnemgRuiriQoFSi5ayQXJJNCTVE2MM8dHir9iDVBPMOe1htg05qKXlVs-Q0bS7QANfO0pHaYFT0jghfdWurjfI4-Sof_sX1k1SIzGsgUBCfJhEYyLp35xswdPgzBIQO5rIj_3HX6CcBpQqwWXO3Xc59UkX1Z0EJ0L8KjtmgNqzvfPoMCvSqwbKaYVetwD5AyWiTdF7EK2DgvZ_i3bOSxl8TbsU0JzQQ6TDbEgGPFR14xKpkkhkgBlCAb_gskCpjt_5dGMUeX0fh_-AA5VGAGw0brYlo-bgiCw","e":"AQAB"},"attributes":{"enabled":true,"created":1592683058,"updated":1592683058,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '344d214d-f13f-45e4-bd77-9deeb5925ced',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.132.216;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 20 Jun 2020 19:57:38 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-RSA15-/79c21ded6ca145ed9988b76142730d45')
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
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f06c0181-c98c-41fd-9c8e-45b2d87e030e',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.132.216;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 20 Jun 2020 19:57:38 GMT'
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
  'bbe06625-fbc6-4010-aa51-088f7e757100',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgxTjXxjSl1EjXcXZ1Bn-v4_aSJHAgAAADFhgNYOAAAA; expires=Mon, 20-Jul-2020 19:57:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sat, 20 Jun 2020 19:57:38 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-RSA15-/79c21ded6ca145ed9988b76142730d45')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-/79c21ded6ca145ed9988b76142730d45","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xBr2g-ne53Ywslzhuu-fzcgfdxRC7ZcBkbl213ByOtcw66zB_sn0sMnemgRuiriQoFSi5ayQXJJNCTVE2MM8dHir9iDVBPMOe1htg05qKXlVs-Q0bS7QANfO0pHaYFT0jghfdWurjfI4-Sof_sX1k1SIzGsgUBCfJhEYyLp35xswdPgzBIQO5rIj_3HX6CcBpQqwWXO3Xc59UkX1Z0EJ0L8KjtmgNqzvfPoMCvSqwbKaYVetwD5AyWiTdF7EK2DgvZ_i3bOSxl8TbsU0JzQQ6TDbEgGPFR14xKpkkhkgBlCAb_gskCpjt_5dGMUeX0fh_-AA5VGAGw0brYlo-bgiCw","e":"AQAB"},"attributes":{"enabled":true,"created":1592683058,"updated":1592683058,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '93b6ca08-ec91-4edd-8150-ddf600ff5d33',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.132.216;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 20 Jun 2020 19:57:38 GMT',
  'Content-Length',
  '715'
]);
