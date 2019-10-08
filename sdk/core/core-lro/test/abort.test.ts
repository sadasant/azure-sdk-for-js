import assert from "assert";
import { delay, SimpleTokenCredential, WebResource, HttpHeaders } from "@azure/core-http";
import { TestClient } from "./utils/testClient";
import { AbortController } from "@azure/abort-controller";
import { PollerStoppedError } from "../src";

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
  it("should support an abort signal sent through the constructor", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO({
      requestOptions: {
        abortSignal: abortController.signal
      }
    });

    // Testing subscriptions to the poll errors
    let pollError: Error | undefined;
    poller.done().catch((e) => {
      pollError = e;
    });

    await delay(10);
    assert.ok(poller.getState().started);
    await delay(100);
    assert.equal(client.totalSentRequests, 11);
    abortController.abort();
    await delay(50);

    assert.equal(pollError!.message, "The request was aborted");
    assert.equal(client.totalSentRequests, 11);
    poller.stop();
  });

  it("should support an abort signal sent through the constructor (manual poller)", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO({
      manual: true,
      requestOptions: {
        abortSignal: abortController.signal
      }
    });

    // Testing subscriptions to the poll errors
    let pollError: Error | undefined;
    poller.done().catch((e) => {
      pollError = e;
    });

    await poller.poll(); // Manual polling
    assert.equal(client.totalSentRequests, 1);

    abortController.abort();
    await poller.poll(); // Manual polling
    assert.equal(client.totalSentRequests, 1);
    assert.ok(poller.isDone());
    assert.equal(pollError!.message, "The request was aborted");
  });

  it("should support an abort signal sent through the parameters of poll() on a manual poller", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO({
      manual: true
    });

    // Testing subscriptions to the poll errors
    let pollError: Error | undefined;
    poller.done().catch((e) => {
      pollError = e;
    });

    await poller.poll(); // Manual polling
    assert.equal(client.totalSentRequests, 1);

    abortController.abort();
    await poller.poll({
      abortSignal: abortController.signal
    }); // Manual polling
    assert.equal(client.totalSentRequests, 1);
    assert.ok(poller.isDone());
    assert.equal(pollError!.message, "The request was aborted");
  });

  it("can abort the cancel method (when cancellation is supported) by with an abortSignal sent from the constructor", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO({
      requestOptions: {
        abortSignal: abortController.signal
      }
    });

    poller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "Poller stopped");
    });

    await delay(10);
    assert.ok(poller.getState().started);
    assert.equal(client.totalSentRequests, 1);
    await delay(100);
    assert.equal(client.totalSentRequests, 11);

    abortController.abort();
    let cancelError: Error | undefined;
    try {
      await poller.cancelOperation();
    } catch (e) {
      cancelError = e;
    }

    assert.ok(poller.isStopped());
    assert.equal(cancelError!.message, "The request was aborted");
    poller.stop();
  });

  it("can abort the cancel method (when cancellation is supported) by with an abortSignal updated on the operation", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const poller = await client.startLRO();

    // Testing subscriptions to the poll errors
    poller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "Poller stopped");
    });

    assert.equal(client.totalSentRequests, 1);
    await delay(100);
    assert.equal(client.totalSentRequests, 10);

    const abortController = new AbortController();
    abortController.abort();

    // This also can be done at any point to abort any poll() request.
    poller.getProperties().requestOptions = {
      abortSignal: abortController.signal
    };

    let cancelError: Error | undefined;
    try {
      await poller.cancelOperation();
    } catch (e) {
      cancelError = e;
    }

    assert.ok(poller.isStopped());
    assert.equal(cancelError!.message, "The request was aborted");
    poller.stop();
  });

  it("can abort the cancel method (when cancellation is supported) by with an abortSignal sent as a parameter to cancelOperation()", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const poller = await client.startLRO();

    // Testing subscriptions to the poll errors
    poller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "Poller stopped");
    });

    assert.equal(client.totalSentRequests, 1);
    await delay(100);
    assert.equal(client.totalSentRequests, 10);

    const abortController = new AbortController();
    abortController.abort();

    let cancelError: Error | undefined;
    try {
      await poller.cancelOperation({
        abortSignal: abortController.signal
      });
    } catch (e) {
      cancelError = e;
    }

    assert.equal(cancelError!.message, "The request was aborted");
    poller.stop();
  });
});
