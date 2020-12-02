let nock = require('nock');

module.exports.hash = "e7ba885af99b2b7d9798f6275a212283";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/303a0946-2047-4837-b84a-b237f936dbc6',
  'x-envoy-upstream-service-time',
  '527',
  'apim-request-id',
  '303a0946-2047-4837-b84a-b237f936dbc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/303a0946-2047-4837-b84a-b237f936dbc6')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-19T15:50:03Z","lastUpdatedDateTime":"2020-11-19T15:50:03Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '42b1a973-97cb-4f3b-a0e0-06776bc57980',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/303a0946-2047-4837-b84a-b237f936dbc6')
  .reply(200, {"status":"running","createdDateTime":"2020-11-19T15:50:03Z","lastUpdatedDateTime":"2020-11-19T15:50:03Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '05f6cec1-c4e7-41df-a4ca-e11ba89fa816',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/prebuilt/businessCard/analyzeResults/303a0946-2047-4837-b84a-b237f936dbc6')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-19T15:50:03Z","lastUpdatedDateTime":"2020-11-19T15:50:05Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.6836,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[683,1098,1158,984,1187,1103,712,1212],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1179,979,1610,871,1637,990,1209,1097],"page":1}},"text":"Dr. Avery Smith","boundingBox":[413.8,1151.8,1610,871,1639.5,996.8,443.4,1277.6],"page":1,"confidence":0.979}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[446.8,1312.2,1318,1103,1336.7,1180.9,465.5,1390.1],"page":1,"confidence":0.99}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[473.1,1407.2,1594,1132,1615.4,1219.3,494.5,1494.5],"page":1,"confidence":0.989}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2103,935,2926,701,2938,764,2119,994],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2116,1004,2981,757,3006,824,2136,1075],"page":1,"confidence":0.99}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2431.9,1037.2,3081.2,843.3,3102.7,915.2,2453.3,1109.1],"page":1,"confidence":0.99}]},"OtherPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2469.1,1118.1,3136.2,912.4,3158.8,985.8,2491.8,1191.5],"page":1,"confidence":0.99}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2521.3,1196.2,3198,979,3222.3,1054.7,2545.6,1271.9],"page":1,"confidence":0.99}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1157,1923,2299,1565,2361,1731,1213,2098],"page":1,"confidence":0.222}]},"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1224.6,2139.5,2536.4,1685.2,2613.1,1906.7,1301.3,2361],"page":1,"confidence":0.979}]}}}]}}, [
  'Content-Length',
  '2683',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '430eb2f4-0038-4f4d-a24d-5928c644d642',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:07 GMT'
]);