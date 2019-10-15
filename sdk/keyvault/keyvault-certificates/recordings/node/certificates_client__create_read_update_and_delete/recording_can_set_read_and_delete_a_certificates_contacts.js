let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/contacts')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
  'b2b1fa7e-2129-4021-974c-4118838f48eb',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:17 GMT',
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  'a742f8bb-ef6c-4754-bf1f-a81992209700',
  'x-ms-ests-server',
  '2.1.9524.8 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArSc6GHKP6JOjZvmMydy4T8_aSJHAQAAAEklN9UOAAAA; expires=Thu, 14-Nov-2019 02:26:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Tue, 15 Oct 2019 02:26:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/contacts', {"contacts":[{"email":"a@a.com","name":"a","phone":"111111111111"},{"email":"b@b.com","name":"b","phone":"222222222222"}]})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/contacts","contacts":[{"email":"a@a.com","name":"a","phone":"111111111111"},{"email":"b@b.com","name":"b","phone":"222222222222"}]}, [ 'Cache-Control',
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
  '5c7b4928-3229-43d3-96e5-38b068068a20',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '187' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/contacts')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
  '8567ad53-2d9b-4360-89e0-001d407adcd0',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:17 GMT',
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  '873a6f20-2b2f-4e30-866c-edc9ae1c8b00',
  'x-ms-ests-server',
  '2.1.9524.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArSc6GHKP6JOjZvmMydy4T8_aSJHAgAAAEklN9UOAAAA; expires=Thu, 14-Nov-2019 02:26:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Tue, 15 Oct 2019 02:26:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/contacts')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/contacts","contacts":[{"email":"a@a.com","name":"a","phone":"111111111111"},{"email":"b@b.com","name":"b","phone":"222222222222"}]}, [ 'Cache-Control',
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
  '85830859-39f6-4088-ae20-d3da0aac5c0f',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '187' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/contacts')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
  'c12a64f9-4aa6-4ff6-ab1d-18be395fd20e',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:18 GMT',
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
  'afa1127b-df03-4988-b9eb-9b6b792e8b00',
  'x-ms-ests-server',
  '2.1.9524.8 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArSc6GHKP6JOjZvmMydy4T8_aSJHAwAAAEklN9UOAAAA; expires=Thu, 14-Nov-2019 02:26:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Tue, 15 Oct 2019 02:26:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/contacts')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/contacts","contacts":[{"email":"a@a.com","name":"a","phone":"111111111111"},{"email":"b@b.com","name":"b","phone":"222222222222"}]}, [ 'Cache-Control',
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
  '71c3cdc4-d0fc-483c-8a97-c18bb574d0c8',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '187' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/contacts')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
  '83a8906c-b2f6-4073-ad87-7e9a5de8aab1',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:19 GMT',
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
  '50909f13-f5d4-4be7-bbcd-9d98d6a69600',
  'x-ms-ests-server',
  '2.1.9524.8 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArSc6GHKP6JOjZvmMydy4T8_aSJHBAAAAEklN9UOAAAA; expires=Thu, 14-Nov-2019 02:26:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Tue, 15 Oct 2019 02:26:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/contacts')
  .query(true)
  .reply(404, {"error":{"code":"ContactsNotFound","message":"Contacts not found"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '68',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6305cc12-68f5-4241-ae68-b3e0d8465d25',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=40.76.47.131;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Oct 2019 02:26:20 GMT',
  'Connection',
  'close' ]);

