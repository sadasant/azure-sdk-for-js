let nock = require('nock');

module.exports.hash = "25abf57322f5779ee97693db4d852606";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/layout/analyzeResults/68d976fd-d961-4673-83b8-b88cdd93540d',
  'x-envoy-upstream-service-time',
  '406',
  'apim-request-id',
  '68d976fd-d961-4673-83b8-b88cdd93540d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:48:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/layout/analyzeResults/68d976fd-d961-4673-83b8-b88cdd93540d')
  .reply(200, {"status":"running","createdDateTime":"2020-11-19T15:48:23Z","lastUpdatedDateTime":"2020-11-19T15:48:23Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '18e985e1-0735-420c-b52e-58e3d7b58c81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:48:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/layout/analyzeResults/68d976fd-d961-4673-83b8-b88cdd93540d')
  .reply(200, {"status":"running","createdDateTime":"2020-11-19T15:48:23Z","lastUpdatedDateTime":"2020-11-19T15:48:23Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '5ceb0b45-9702-4335-a8cb-56d62d48b21c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:48:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/layout/analyzeResults/68d976fd-d961-4673-83b8-b88cdd93540d')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-19T15:48:23Z","lastUpdatedDateTime":"2020-11-19T15:48:27Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":0.3356,"width":1688,"height":3000,"unit":"pixel","lines":[{"boundingBox":[620,291,1048,288,1049,384,621,389],"text":"Contoso","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[620,292,1045,290,1046,379,623,389],"text":"Contoso","confidence":0.984}]},{"boundingBox":[326,589,499,601,496,651,323,640],"text":"Contoso","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[328,590,500,601,497,651,324,640],"text":"Contoso","confidence":0.94}]},{"boundingBox":[314,690,650,694,649,754,314,751],"text":"123 Main Street","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[318,690,383,693,379,752,314,748],"text":"123","confidence":0.987},{"boundingBox":[394,694,493,697,490,754,391,752],"text":"Main","confidence":0.986},{"boundingBox":[504,697,649,697,648,751,502,754],"text":"Street","confidence":0.985}]},{"boundingBox":[311,796,751,796,751,854,311,855],"text":"Redmond, WA 98052","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[313,796,517,799,517,856,311,851],"text":"Redmond,","confidence":0.897},{"boundingBox":[528,799,592,799,592,855,527,856],"text":"WA","confidence":0.988},{"boundingBox":[603,799,749,797,750,848,603,855],"text":"98052","confidence":0.984}]},{"boundingBox":[307,1004,619,1010,618,1068,306,1061],"text":"123-456-7890","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[308,1005,620,1012,616,1068,306,1063],"text":"123-456-7890","confidence":0.968}]},{"boundingBox":[301,1222,631,1224,630,1290,301,1287],"text":"6/10/2019 13:59","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[302,1223,496,1224,496,1290,301,1289],"text":"6/10/2019","confidence":0.903},{"boundingBox":[509,1224,630,1228,629,1290,509,1290],"text":"13:59","confidence":0.983}]},{"boundingBox":[301,1335,769,1338,768,1396,300,1393],"text":"Sales Associate: Paul","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[301,1336,409,1336,408,1393,301,1393],"text":"Sales","confidence":0.985},{"boundingBox":[420,1336,646,1337,645,1396,420,1393],"text":"Associate:","confidence":0.98},{"boundingBox":[658,1338,769,1338,768,1397,657,1396],"text":"Paul","confidence":0.987}]},{"boundingBox":[333,1560,674,1562,674,1620,332,1618],"text":"1 Surface Pro 6","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[334,1560,353,1561,352,1619,333,1619],"text":"1","confidence":0.986},{"boundingBox":[365,1561,539,1562,538,1620,364,1619],"text":"Surface","confidence":0.983},{"boundingBox":[550,1562,628,1563,626,1621,549,1620],"text":"Pro","confidence":0.953},{"boundingBox":[639,1563,674,1563,673,1621,638,1621],"text":"6","confidence":0.963}]},{"boundingBox":[369,1672,846,1674,846,1739,369,1736],"text":"256GB / Intel Core i5 /","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[370,1673,502,1673,501,1737,370,1734],"text":"256GB","confidence":0.984},{"boundingBox":[514,1673,526,1673,525,1737,513,1737],"text":"/","confidence":0.962},{"boundingBox":[537,1673,641,1673,640,1739,537,1738],"text":"Intel","confidence":0.926},{"boundingBox":[653,1673,753,1674,751,1739,652,1739],"text":"Core","confidence":0.986},{"boundingBox":[765,1674,805,1674,802,1739,763,1739],"text":"i5","confidence":0.973},{"boundingBox":[817,1674,845,1674,842,1739,814,1739],"text":"/","confidence":0.979}]},{"boundingBox":[368,1784,731,1784,730,1853,368,1849],"text":"8GB RAM (Black)","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[368,1785,446,1785,446,1849,369,1847],"text":"8GB","confidence":0.943},{"boundingBox":[458,1785,555,1785,556,1852,459,1849],"text":"RAM","confidence":0.985},{"boundingBox":[567,1785,730,1785,730,1854,568,1852],"text":"(Black)","confidence":0.981}]},{"boundingBox":[977,1796,1130,1800,1128,1854,977,1849],"text":"999.00","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[977,1796,1128,1800,1127,1854,977,1849],"text":"999.00","confidence":0.98}]},{"boundingBox":[317,2018,627,2013,628,2073,318,2080],"text":"1 SurfacePen","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[317,2021,341,2020,343,2080,320,2080],"text":"1","confidence":0.983},{"boundingBox":[353,2019,625,2014,626,2075,355,2080],"text":"SurfacePen","confidence":0.98}]},{"boundingBox":[1004,2031,1130,2031,1129,2090,1004,2089],"text":"99.99","appearance":{"style":{"name":"other","confidence":0.999}},"words":[{"boundingBox":[1004,2031,1130,2031,1130,2090,1004,2089],"text":"99.99","confidence":0.983}]},{"boundingBox":[278,2168,321,2168,322,2180,278,2181],"text":"--","appearance":{"style":{"name":"handwriting","confidence":0.93}},"words":[{"boundingBox":[288,2169,322,2168,322,2180,288,2181],"text":"--","confidence":0.559}]},{"boundingBox":[471,2243,698,2245,697,2307,471,2304],"text":"Sub-Total","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[471,2243,696,2245,694,2307,472,2305],"text":"Sub-Total","confidence":0.974}]},{"boundingBox":[926,2262,1135,2255,1137,2314,927,2318],"text":"$ 1098.99","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[926,2269,954,2266,956,2317,929,2316],"text":"$","confidence":0.805},{"boundingBox":[963,2265,1135,2256,1137,2315,965,2317],"text":"1098.99","confidence":0.983}]},{"boundingBox":[566,2354,657,2361,652,2414,562,2412],"text":"Tax","appearance":{"style":{"name":"other","confidence":0.983}},"words":[{"boundingBox":[564,2354,657,2358,654,2415,562,2411],"text":"Tax","confidence":0.987}]},{"boundingBox":[977,2374,1132,2370,1131,2428,979,2428],"text":"104.40","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[977,2372,1128,2370,1129,2427,977,2429],"text":"104.40","confidence":0.983}]},{"boundingBox":[546,2594,669,2589,670,2647,548,2652],"text":"Total","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[546,2594,665,2589,668,2647,548,2652],"text":"Total","confidence":0.907}]},{"boundingBox":[909,2593,1128,2611,1121,2673,907,2650],"text":"$ 1203.39","appearance":{"style":{"name":"other","confidence":1}},"words":[{"boundingBox":[909,2594,939,2596,936,2653,907,2650],"text":"$","confidence":0.985},{"boundingBox":[950,2596,1127,2613,1121,2674,947,2654],"text":"1203.39","confidence":0.983}]}]}],"pageResults":[{"page":1,"tables":[]}]}}, [
  'Content-Length',
  '6610',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'aec6fc6c-9561-4e90-99aa-eb896b59d589',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:48:27 GMT'
]);