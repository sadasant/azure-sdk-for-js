let nock = require('nock');

module.exports.hash = "b0c787f772c6960ff7b44ea99cb57f0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '1bae591e-46dd-4fb6-a3fe-230a93612f00',
  'x-ms-ests-server',
  '2.1.11251.20 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj-urfbPpVBOtnpqa1s9qQ_GLH8mAQAAACk4StcOAAAA; expires=Sun, 20-Dec-2020 22:20:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:20:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/71c4472d-c10a-4c5d-a0dd-468537d38617',
  'x-envoy-upstream-service-time',
  '597',
  'apim-request-id',
  '71c4472d-c10a-4c5d-a0dd-468537d38617',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:20:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/71c4472d-c10a-4c5d-a0dd-468537d38617')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T22:20:28Z","lastUpdatedDateTime":"2020-11-20T22:20:28Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '1c69827f-e085-4260-b808-3b1dd16d61b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:20:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/71c4472d-c10a-4c5d-a0dd-468537d38617')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T22:20:28Z","lastUpdatedDateTime":"2020-11-20T22:20:28Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '682ba760-8017-4ef2-b0d5-d5a092f3c5c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:20:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyzeResults/71c4472d-c10a-4c5d-a0dd-468537d38617')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T22:20:28Z","lastUpdatedDateTime":"2020-11-20T22:20:31Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-0.0752,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.99},"MerchantName":{"type":"string","valueString":"Contoso Contoso","text":"Contoso Contoso","boundingBox":[342.9,238.1,1061,278.6,1038.1,685.5,320,645],"page":1,"confidence":0.693},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[308.4,688,751.3,689,750.8,859.6,308,858.5],"page":1,"confidence":0.989},"MerchantPhoneNumber":{"type":"phoneNumber","text":"123-456-7890","boundingBox":[303,1003,623,1009,621,1071,303,1064],"page":1,"confidence":0.99},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[299,1221,494,1222,492,1292,299,1292],"page":1,"confidence":0.991},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[508,1223,628,1224,625,1292,506,1292],"page":1,"confidence":0.99},"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[327,1558,353,1559,352,1623,327,1623],"page":1,"confidence":0.745}}},{"type":"object","valueObject":{"Name":{"type":"string","valueString":"8GB RAM (Black)","text":"8GB RAM (Black)","boundingBox":[358,1779,738,1779,738,1860,358,1860],"page":1,"confidence":0.968},"TotalPrice":{"type":"number","valueNumber":999,"text":"999.00","boundingBox":[967,1792,1135,1796,1133,1859,967,1855],"page":1,"confidence":0.97}}},{"type":"object","valueObject":{"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[315,2018,337,2017,338,2084,316,2085],"page":1,"confidence":0.91},"Name":{"type":"string","valueString":"SurfacePen","text":"SurfacePen","boundingBox":[350,2017,624,2013,624,2079,351,2084],"page":1,"confidence":0.959},"TotalPrice":{"type":"number","valueNumber":99.99,"text":"$99.99","boundingBox":[963,2025,1128,2025,1128,2092,963,2092],"page":1,"confidence":0.775}}}]},"Subtotal":{"type":"number","valueNumber":1098.99,"text":"1098.99","boundingBox":[954,2255,1137,2251,1138,2325,956,2329],"page":1,"confidence":0.986},"Total":{"type":"number","valueNumber":104.4,"text":"104.40","boundingBox":[976,2370,1130,2368,1131,2434,977,2438],"page":1,"confidence":0.668}}}]}}, [
  'Content-Length',
  '2548',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '6811b3eb-a993-4d03-9f97-acdc24c18dd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:20:33 GMT'
]);