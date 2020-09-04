let nock = require('nock');

module.exports.hash = "73905be2f741a7b08470ea176cf08bde";

module.exports.testInfo = {"uniqueName":{"container":"container159842818929201225","blob":"blob159842818961108272"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818929201225')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:49 GMT',
  'ETag',
  '"0x8D849949BCC743C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc5153c-101e-000a-367d-7be917000000',
  'x-ms-client-request-id',
  '1ff80f73-13ce-4840-85f6-7cf140b38e8e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818929201225/blob159842818961108272', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:49 GMT',
  'ETag',
  '"0x8D849949BFFF577"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73d158-401e-005a-697d-7b2b47000000',
  'x-ms-client-request-id',
  'b8ff9b8a-75b8-4885-bf4b-00c93f1e797f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:49.4155639Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818929201225/blob159842818961108272', "100,hello,300,400\n150,250,350,450\n")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'WR7/v2xjCp0oS1hWhnABhA==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:49 GMT',
  'ETag',
  '"0x8D849949C2C8BD5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc51561-101e-000a-507d-7be917000000',
  'x-ms-client-request-id',
  'f10ad2e1-b4da-4133-9593-fc02f60cc586',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'N4gbprVPdmM=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:49.7087717Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/container159842818929201225/blob159842818961108272', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><QueryType>SQL</QueryType><Expression>select _2 from BlobStorage where _2 &gt; 100</Expression></QueryRequest>")
  .query(true)
  .reply(200, Buffer.from("4f626a0102166176726f2e736368656d61be1e5b0a20207b0a202020202274797065223a20227265636f7264222c0a20202020226e616d65223a2022636f6d2e6d6963726f736f66742e617a7572652e73746f726167652e7175657279426c6f62436f6e74656e74732e726573756c7444617461222c0a2020202022646f63223a2022486f6c647320726573756c74206461746120696e2074686520666f726d61742073706563696669656420666f72207468697320717565727920284353562c204a534f4e2c206574632e292e222c0a20202020226669656c6473223a205b0a2020202020207b0a2020202020202020226e616d65223a202264617461222c0a20202020202020202274797065223a20226279746573220a2020202020207d0a202020205d0a20207d2c0a20207b0a202020202274797065223a20227265636f7264222c0a20202020226e616d65223a2022636f6d2e6d6963726f736f66742e617a7572652e73746f726167652e7175657279426c6f62436f6e74656e74732e6572726f72222c0a2020202022646f63223a2022416e206572726f722074686174206f63637572726564207768696c652070726f63657373696e67207468652071756572792e222c0a20202020226669656c6473223a205b0a2020202020207b0a2020202020202020226e616d65223a2022666174616c222c0a20202020202020202274797065223a2022626f6f6c65616e222c0a202020202020202022646f63223a2022496620747275652c2074686973206572726f722070726576656e747320667572746865722071756572792070726f63657373696e672e20204d6f726520726573756c742064617461206d61792062652072657475726e65642c20627574207468657265206973206e6f2067756172616e746565207468617420616c6c206f6620746865206f726967696e616c20646174612077696c6c2062652070726f6365737365642e202049662066616c73652c2074686973206572726f7220646f6573206e6f742070726576656e7420667572746865722071756572792070726f63657373696e672e220a2020202020207d2c0a2020202020207b0a2020202020202020226e616d65223a20226e616d65222c0a20202020202020202274797065223a2022737472696e67222c0a202020202020202022646f63223a2022546865206e616d65206f6620746865206572726f72220a2020202020207d2c0a2020202020207b0a2020202020202020226e616d65223a20226465736372697074696f6e222c0a20202020202020202274797065223a2022737472696e67222c0a202020202020202022646f63223a202241206465736372697074696f6e206f6620746865206572726f72220a2020202020207d2c0a2020202020207b0a2020202020202020226e616d65223a2022706f736974696f6e222c0a20202020202020202274797065223a20226c6f6e67222c0a202020202020202022646f63223a202254686520626c6f62206f666673657420617420776869636820746865206572726f72206f63637572726564220a2020202020207d0a202020205d0a20207d2c0a20207b0a202020202274797065223a20227265636f7264222c0a20202020226e616d65223a2022636f6d2e6d6963726f736f66742e617a7572652e73746f726167652e7175657279426c6f62436f6e74656e74732e70726f6772657373222c0a2020202022646f63223a2022496e666f726d6174696f6e2061626f7574207468652070726f6772657373206f6620746865207175657279222c0a20202020226669656c6473223a205b0a2020202020207b0a2020202020202020226e616d65223a202262797465735363616e6e6564222c0a20202020202020202274797065223a20226c6f6e67222c0a202020202020202022646f63223a2022546865206e756d626572206f6620627974657320746861742068617665206265656e207363616e6e6564220a2020202020207d2c0a2020202020207b0a2020202020202020226e616d65223a2022746f74616c4279746573222c0a20202020202020202274797065223a20226c6f6e67222c0a202020202020202022646f63223a202254686520746f74616c206e756d626572206f6620627974657320746f206265207363616e6e656420696e2074686973207175657279220a2020202020207d0a202020205d0a20207d2c0a20207b0a202020202274797065223a20227265636f7264222c0a20202020226e616d65223a2022636f6d2e6d6963726f736f66742e617a7572652e73746f726167652e7175657279426c6f62436f6e74656e74732e656e64222c0a2020202022646f63223a202253656e74206173207468652066696e616c206d657373616765206f662074686520726573706f6e73652c20696e6469636174696e67207468617420616c6c20726573756c74732068617665206265656e2073656e742e222c0a20202020226669656c6473223a205b0a2020202020207b0a2020202020202020226e616d65223a2022746f74616c4279746573222c0a20202020202020202274797065223a20226c6f6e67222c0a202020202020202022646f63223a202254686520746f74616c206e756d626572206f6620627974657320746f206265207363616e6e656420696e2074686973207175657279220a2020202020207d0a202020205d0a20207d0a5d0a00e6702dcb7d82104296a4c62abec59f57020c00083235300ae6702dcb7d82104296a4c62abec59f57026402002a496e76616c696454797065436f6e76657273696f6e30496e76616c6964207479706520636f6e76657273696f6e2e00e6702dcb7d82104296a4c62abec59f570206044444e6702dcb7d82104296a4c62abec59f5702040644e6702dcb7d82104296a4c62abec59f57", "hex"), [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D849949C2C8BD5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-creation-time',
  'Wed, 26 Aug 2020 07:49:49 GMT',
  'x-ms-lease-state',
  'available',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-request-id',
  'eb73d178-401e-005a-027d-7b2b47000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b233cedb-6ebe-46d7-8af7-84819d1d5cf8',
  'Date',
  'Wed, 26 Aug 2020 07:49:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159842818929201225')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc51590-101e-000a-717d-7be917000000',
  'x-ms-client-request-id',
  'af4787c4-e325-4339-8dda-7e08a3a32a6d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:50 GMT'
]);
