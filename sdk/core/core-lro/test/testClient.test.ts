// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { delay, SimpleTokenCredential, WebResource, HttpHeaders } from "@azure/core-http";
import { TestClient } from "./utils/testClient";
import { PollerStoppedError, PollerCancelledError } from "../src";

const testHttpHeaders: HttpHeaders = new HttpHeaders();
const testHttpRequest: WebResource = new WebResource();
const basicResponseStructure = {
  headers: testHttpHeaders,
  parsedBody: {},
  request: testHttpRequest,
  status: 200
};
const initialResponse = {
  ...basicResponseStructure,
  parsedBody: {
    started: true
  }
};
const doFinalResponse = {
  ...basicResponseStructure,
  parsedBody: {
    doFinalResponse: true
  }
};
const finalResponse = {
  ...basicResponseStructure,
  parsedBody: {
    finished: true
  }
};

describe("Long Running Operations - custom client", function() {
  it("can automatically poll a long running operation with one promise", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO();

    // synchronously checking the operation state
    await poller.nextPoll();
    assert.ok(poller.getState().started);

    // Checking the serialized version of the operation
    let serializedOperation = JSON.parse(poller.toJSON());
    assert.ok(serializedOperation.state.started);

    // Waiting until the operation completes
    const result = await poller.done();
    const state = poller.getState();
    const properties = poller.getProperties();

    assert.ok(properties.initialResponse!.parsedBody.started);
    assert.ok(properties.previousResponse!.parsedBody.finished);
    assert.ok(state.completed);
    assert.equal(result, "Done");
  });

  it("can automatically poll a long running operation with more than one promise", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO();

    await poller.nextPoll();

    assert.ok(poller.getProperties().initialResponse!.parsedBody.started);
    assert.ok(poller.getProperties().previousResponse!.parsedBody.started);

    await poller.nextPoll();
    assert.ok(poller.getProperties().previousResponse!.parsedBody.doFinalResponse);

    let result = await poller.getState().result;
    assert.equal(result, undefined);

    await poller.done();
    assert.ok(poller.getProperties().previousResponse!.parsedBody.finished);
    assert.ok(poller.getState().completed);

    result = await poller.getState().result;
    assert.equal(result, "Done");

    poller.stop();
  });

  it("can manually poll a long running operation", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO({ manual: true });
    assert.ok(poller.isStopped());

    assert.ok(!poller.getState().started);

    await poller.poll();
    assert.ok(!poller.getState().started);
    assert.ok(poller.getProperties().initialResponse!.parsedBody.started);
    assert.ok(poller.getProperties().previousResponse!.parsedBody.started);

    await poller.poll();
    assert.ok(poller.getProperties().previousResponse!.parsedBody.doFinalResponse);

    let result = await poller.getState().result;
    assert.equal(result, undefined);

    await poller.poll();
    assert.ok(poller.getProperties().previousResponse!.parsedBody.finished);
    assert.ok(poller.getState().completed);

    result = await poller.getState().result;
    assert.equal(result, "Done");

    poller.stop();
  });

  it("can cancel the operation (when cancellation is supported)", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startLRO();
    poller.done().catch((e) => {
      assert.ok(e instanceof PollerCancelledError);
      assert.equal(e.name, "PollerCancelledError");
      assert.equal(e.message, "Poller cancelled");
    });

    await poller.nextPoll();
    assert.ok(poller.getState().started);
    assert.equal(client.totalSentRequests, 1);

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.nextPoll();
    }

    assert.equal(client.totalSentRequests, 11);

    await poller.cancelOperation();
    assert.ok(poller.getState().cancelled);
    assert.ok(poller.isStopped());
  });

  it("fails to cancel the operation (when cancellation is not supported)", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startNonCancellableLRO();
    poller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    assert.equal(client.totalSentRequests, 1);

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.nextPoll();
    }

    assert.equal(client.totalSentRequests, 10);

    let error: any;
    try {
      await poller.cancelOperation();
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, "Cancellation not supported");
    poller.stop();
  });

  it("can stop polling the operation", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startLRO();
    poller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.nextPoll();
    assert.ok(poller.getState().started);
    assert.equal(client.totalSentRequests, 1);

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.nextPoll();
    }

    assert.equal(client.totalSentRequests, 11);

    poller.stop();

    await delay(100);

    assert.equal(client.totalSentRequests, 11);
  });

  it("can document progress", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(10).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    let totalOperationUpdates = 0;
    const poller = await client.startLRO({
      onProgress: (_) => {
        totalOperationUpdates++;
      }
    });

    const result = await poller.done();
    assert.equal(result, "Done");
    assert.equal(poller.getState().result, "Done");

    // Progress only after the poller has started and before the poller is done
    assert.equal(totalOperationUpdates, 11);
  });

  it("can reuse one poller state to instantiate another poller", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));

    // A total of 13 expected responses.
    const responses = [
      initialResponse,
      ...Array(10).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ];
    client.setResponses(responses);

    const poller = await client.startLRO();
    poller.done().catch((e) => {
      assert.equal(e.message, "This poller is already stopped");
    });

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.nextPoll();
    }

    assert.equal(client.totalSentRequests, 10);

    poller.stop();

    await delay(100);

    assert.equal(client.totalSentRequests, 10);

    // Let's try to resume this with a new poller.
    const serialized = poller.toJSON();
    const client2 = new TestClient(new SimpleTokenCredential("my-test-token"));
    client2.setResponses(responses);
    const poller2 = await client2.startLRO({
      operation: JSON.parse(serialized)
    });

    assert.equal(client2.totalSentRequests, 1);

    const result = await poller2.done();
    assert.equal(result, "Done");

    // The second client doesn't do the first request and goes all the way to the end.
    assert.equal(client2.totalSentRequests, 12);
  });
});
