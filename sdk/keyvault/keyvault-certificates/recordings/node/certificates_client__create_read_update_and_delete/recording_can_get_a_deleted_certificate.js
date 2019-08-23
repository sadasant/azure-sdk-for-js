let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-cangetadeletedcertificate-/create')
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
  '16ce2165-0992-4e7a-a8ec-2527579a414a',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:32:47 GMT',
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
  '9d236ff6-f13f-4202-821e-a4fff43c0800',
  'x-ms-ests-server',
  '2.1.9288.13 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgCtjdEEuF5PvcUOPrbIlL0_aSJHAQAAAF9V8dQOAAAA; expires=Sun, 22-Sep-2019 03:32:48 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 23 Aug 2019 03:32:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-cangetadeletedcertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8QfugO7wwRU/po22MNl0iszrfAZfPSNw9XQVDUelaDMPRFX+b4BCWyFDZe6NTWGcrwPXkWYuXqnIX/jUySkbFk2elQ67FLHcqdD2dau+h2u8QLra1QpF5IflP17AmbqgDS3hFW+O1y+KYvOJDcZiwMIyc/PnnOFSGFKuRZRCUUYHWnJlkAWXRM46DpD5ujqgoVl6iKxjCz+DEEc0NmUzR/jwRNimz3dpLew+/LDRn8QqbTQRSS5Y4Td2s6zySjRgdtsNMGKz9CTval5CbnIlRIBrDLF7VfZ70Se0V1gNa654epW1ZnCkJmX781cbS+xoCueCmHYRVu6mh/SLZIRIvQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGqN1MTwLa4lGyhDamx+XskZd9/QhwFJVzO/M69tE1zOOsCwUqShWnmJ/J73Bjh3MVH+0pilYFXnvbT7JFWC8BkZ/FLvoDlSGzBLlPr7TTHUe0gbmvLXkSKGChOabXZI5Cv5hAgQVzyjN39LWtH8+bnuyo+kpB13/c6spaRWv0kqBEt71LoYLpV7/7OfQxUYp1oFyIYCDlawTLI+pFVZfmcE3NW83psPv+/dNJUugU6BLhmxus5hcu7deJURVvmlh7XTWNoyjc5hQ119cefkmhhLtkiT4GoZcTaivmELt4P5Ly0OAw3160R0yE24aU8aCkgFaVwzwGzrQV60OeQ33SM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"64a08601753a4d8894ae352b77997b75"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/pending?api-version=7.0&request_id=64a08601753a4d8894ae352b77997b75',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'babb1e0b-41bf-4d03-a633-f47f588f849d',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:32:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1334' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-cangetadeletedcertificate-')
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
  'c827615a-8778-425b-97b9-dd474d081cd2',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:32:49 GMT',
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
  'f986c26f-7e24-4e8c-b86d-424e80763300',
  'x-ms-ests-server',
  '2.1.9288.13 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgCtjdEEuF5PvcUOPrbIlL0_aSJHAgAAAF9V8dQOAAAA; expires=Sun, 22-Sep-2019 03:32:50 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 23 Aug 2019 03:32:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-cangetadeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-","deletedDate":1566531171,"scheduledPurgeDate":1574307171,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/6a28db625ff540768a31616178206f5b","attributes":{"enabled":false,"nbf":1566530569,"exp":1598153569,"created":1566531169,"updated":1566531169,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1566531169,"updated":1566531169}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/pending"}}, [ 'Cache-Control',
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
  'd52f3fa4-435a-4b68-9d18-96c38b0764d2',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:32:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1296' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-')
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
  'ca1843bb-7668-4025-b4c2-df63b4260fbc',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:32:50 GMT',
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
  'd4f9c2a9-0c74-43b5-9c4d-601305c90700',
  'x-ms-ests-server',
  '2.1.9288.13 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgCtjdEEuF5PvcUOPrbIlL0_aSJHAwAAAF9V8dQOAAAA; expires=Sun, 22-Sep-2019 03:32:51 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 23 Aug 2019 03:32:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-cangetadeletedcertificate-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fc08f300-3297-442d-abb1-578de64467db',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:32:51 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-')
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
  '0bc07abe-6fc6-40dd-8cea-c642c65ac279',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:33:01 GMT',
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
  'd3ef2b60-4898-417b-ba23-86bded663200',
  'x-ms-ests-server',
  '2.1.9288.13 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgCtjdEEuF5PvcUOPrbIlL0_aSJHBAAAAF9V8dQOAAAA; expires=Sun, 22-Sep-2019 03:33:02 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 23 Aug 2019 03:33:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-","deletedDate":1566531171,"scheduledPurgeDate":1574307171,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/6a28db625ff540768a31616178206f5b","attributes":{"enabled":false,"nbf":1566530569,"exp":1598153569,"created":1566531169,"updated":1566531169,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1566531169,"updated":1566531169}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetadeletedcertificate-/pending"}}, [ 'Cache-Control',
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
  '8682606b-b7fa-4cb0-aea6-1de1d623ff69',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:33:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1296' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-')
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
  '3a560ac5-a60b-4218-afe1-7c05ad1d4d71',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:33:03 GMT',
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
  'd95ff6b9-2fe1-4525-80b1-abfb97655700',
  'x-ms-ests-server',
  '2.1.9288.13 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgCtjdEEuF5PvcUOPrbIlL0_aSJHBQAAAF9V8dQOAAAA; expires=Sun, 22-Sep-2019 03:33:03 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 23 Aug 2019 03:33:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-cangetadeletedcertificate-')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
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
  'f43a1669-130a-49a5-86f3-69cba4b5eed3',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=52.170.28.56;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 23 Aug 2019 03:33:03 GMT',
  'Connection',
  'close' ]);

