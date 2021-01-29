// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import * as ReactDOM from "react-dom";

import { InteractiveBrowserCredential, BrowserLoginStyle, InteractiveBrowserAuthenticationFlow } from "@azure/identity";
import { ServiceBusClient } from "@azure/service-bus"

interface ClientDetails {
  tenantId: string,
  clientId: string,
  queueName: string,
  loginStyle: BrowserLoginStyle,
  flow: InteractiveBrowserAuthenticationFlow,
  numberOfExecutions: number,
  cacheCredential: boolean,
  parallel: boolean,
  preAuthenticate: boolean,
  serviceBusEndpoint: string,
  output: string,
}

const logCopy = window.console.log.bind(window.console);
window.console.log = (...params: any[]) => {
  const logs = window.localStorage.getItem("logs");
  window.localStorage.setItem("logs", `${logs}Log:\n${params.map(x => typeof x === "object" ? JSON.stringify(x) : x).join("\n")}\n\n`);
  logCopy(...params)
}
const infoCopy = window.console.info.bind(window.console);
window.console.info = (...params: any[]) => {
  const logs = window.localStorage.getItem("logs");
  window.localStorage.setItem("logs", `${logs}Info:\n${params.map(x => typeof x === "object" ? JSON.stringify(x) : x).join("\n")}\n\n`);
  infoCopy(...params)
}
const warningCopy = window.console.warn.bind(window.console);
window.console.warn = (...params: any[]) => {
  const logs = window.localStorage.getItem("logs");
  window.localStorage.setItem("logs", `${logs}Warning:\n${params.map(x => typeof x === "object" ? JSON.stringify(x) : x).join("\n")}\n\n`);
  warningCopy(...params)
}
const errorCopy = window.console.error.bind(window.console);
window.console.error = (...params: any[]) => {
  const logs = window.localStorage.getItem("logs");
  window.localStorage.setItem("logs", `${logs}Error:\n${params.map(x => typeof x === "object" ? JSON.stringify(x) : x).join("\n")}\n\n`);
  errorCopy(...params)
}
window.onerror = function (...params) {
  console.log("window.onerror", params);
}
interface ClientDetailsEditorProps {
  clientDetails: ClientDetails,
  onSetClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>
}

function storeClientDetails(clientDetails: ClientDetails) {
  localStorage.setItem('clientDetails', JSON.stringify(clientDetails));
}

function readClientDetails(): ClientDetails {
  const detailsJson = localStorage.getItem('clientDetails')
  if (detailsJson) {
    const details = JSON.parse(detailsJson)
    details.credential = undefined;
    return details;
  }

  return undefined;
}

function Radio(options: { values: string[], checkedValue: string, onChange: (value: string) => void }) {
  const { values, checkedValue, onChange } = options;
  return (
    <React.Fragment>
      {values.map(value => (
        <div>
          <label>
            <input
              type="radio"
              value={value}
              checked={checkedValue === value}
              onChange={({ target }) => onChange(target.value)} />
            {value}
          </label>
        </div>))}
    </React.Fragment>
  );
}

let lastLoginStyle: BrowserLoginStyle | undefined;
let cachedCredential: InteractiveBrowserCredential | undefined;
function getCredential(clientDetails: ClientDetails, cacheCredential: boolean): InteractiveBrowserCredential | undefined {
  if (!cacheCredential) {
    cachedCredential = undefined;
    lastLoginStyle = undefined;
  }
  if (cachedCredential && clientDetails.loginStyle === lastLoginStyle) return cachedCredential;

  const { tenantId, clientId, loginStyle, flow } = clientDetails;

  if (tenantId && clientId && loginStyle && flow) {
    cachedCredential = new InteractiveBrowserCredential({
      tenantId,
      clientId,
      loginStyle,
      flow
    });
    lastLoginStyle = clientDetails.loginStyle;
    return cachedCredential;
  }
}

function ClientDetailsEditor({ clientDetails, onSetClientDetails }: ClientDetailsEditorProps) {
  const handleDetailsChange = (newDetails: ClientDetails) => {
    storeClientDetails(newDetails)
    onSetClientDetails(newDetails)
  };

  const setDetail = (name: keyof ClientDetails, changeValue?: (v: string) => any) => (value: string) =>
    handleDetailsChange({
      ...clientDetails,
      [name]: changeValue ? changeValue(value) : value
    });

  return (
    <div>
      <h3>Enter the details of your Azure AD App Registration:</h3>
      <form>
        <label>
          Tenant Id:
          <input type="text" value={clientDetails.tenantId} onChange={({ target }) => handleDetailsChange({ ...clientDetails, tenantId: target.value })} />
        </label>
        <br />
        <label>
          Client Id:
          <input type="text" value={clientDetails.clientId} onChange={({ target }) => handleDetailsChange({ ...clientDetails, clientId: target.value })} />
        </label>
        <br />
        <label>
          Queue Name:
          <input type="text" value={clientDetails.queueName} onChange={({ target }) => handleDetailsChange({ ...clientDetails, queueName: target.value })} />
        </label>
        <br />
        <h4>Login Style</h4>
        <Radio values={["popup", "redirect"]} checkedValue={clientDetails.loginStyle} onChange={setDetail("loginStyle")} />
        <br />
        <h4>Authentication flow</h4>
        <Radio values={["implicit-grant", "auth-code"]} checkedValue={clientDetails.flow} onChange={setDetail("flow")} />
        <br />
        <h4>Number of executions</h4>
        <Radio values={["1", "2", "3"]} checkedValue={clientDetails.numberOfExecutions.toString()} onChange={setDetail("numberOfExecutions", x => Number(x))} />
        <br />
        <h4>Re-use Credential?</h4>
        <Radio values={["yes", "no"]} checkedValue={clientDetails.cacheCredential ? "yes" : "no"} onChange={setDetail("cacheCredential", x => x === "yes")} />
        <br />
        {clientDetails.numberOfExecutions > 1 ? (
          <React.Fragment>
            <h4>Run in parallel?</h4>
            <Radio values={["yes", "no"]} checkedValue={clientDetails.parallel ? "yes" : "no"} onChange={setDetail("parallel", x => x === "yes")} />
            <small>
              Running in parallel the first time the authentication happens will cause errors.
              We're allowing this behavior in the app for testing purposes.
            </small>
            <br />
          </React.Fragment>
        ) : null}
        <h4>Authenticate before calling to any method?</h4>
        <Radio values={["yes", "no"]} checkedValue={clientDetails.preAuthenticate ? "yes" : "no"} onChange={setDetail("preAuthenticate", x => x === "yes")} />
      </form>
    </div >
  );
}

async function sendMessage(serviceBusEndpoint: string, clientDetails: ClientDetails, onSetClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>): Promise<string | undefined> {
  const credential = getCredential(clientDetails, clientDetails.cacheCredential);
  const queueName = clientDetails.queueName;

  if (credential === undefined) {
    throw new Error("You must enter client details.");
  }

  if (clientDetails.preAuthenticate) {
    const record = await credential.authenticate({
      scopes: `https://servicebus.azure.net/.default`
    });
    console.log({ record });
  }

  console.log("Working with", serviceBusEndpoint, clientDetails);

  const client = new ServiceBusClient(serviceBusEndpoint, credential);

  try {
    const sender = client.createSender(queueName);
    const cleanDetails = {
      ...clientDetails
    };
    delete cleanDetails.output;
    const body = [
      "--- Message ---",
      `Sent at: ${new Date()}`,
      "Body:",
      JSON.stringify(cleanDetails),
      "--- Message End ---"
    ].join("\n");
    await sender.sendMessages({ body });
    await sender.close();
    const receiver = client.createReceiver(queueName);
    const messages = await receiver.receiveMessages(10);
    for (let message of messages) {
      await receiver.completeMessage(message);
    }
    await receiver.close();
    const output = `Received messages:\n${messages.map(m => m.body.toString()).join("\n")}`;
    console.log(output);
    clientDetails.output = output;

    // Scrolling to the bottom of the page.
    window.scrollTo(0, document.body.scrollHeight);
    return output;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.close();
  }
}

function useServiceBus(serviceBusEndpoint: string, clientDetails: ClientDetails, onSetClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>) {
  const [running, setRunning] = React.useState(false)
  const [error, setErrorInner] = React.useState(undefined);
  const [output, setOutput] = React.useState<string>(undefined);

  const setError = (err: string) => {
    setRunning(false)
    setErrorInner(err)
  }

  React.useEffect(() => {
    if (serviceBusEndpoint.trim().length === 0) {
      setError("You must enter a service bus endpoint to send a message.");
    } else if (running) {
      (async () => {
        for (let i = 0; i < clientDetails.numberOfExecutions; i++) {
          const promise = sendMessage(serviceBusEndpoint, clientDetails, onSetClientDetails);
          if (clientDetails.parallel) {
            promise.then(setOutput);
          } else {
            setOutput(await promise);
          }
        }
        setRunning(false)
      })().catch(err => setError(err.toString()));
    } else {
      setError("")
    }
  }, [serviceBusEndpoint, clientDetails, running])

  // Triggering a first send if the redirection hash is present.
  if (window.location.hash) {
    setTimeout(() => setRunning(true), 1000);
  }

  return { output, sendMessage: () => setRunning(true), error }
}

interface ServiceBusTestProps {
  storedServiceBusEndpoint?: string,
  clientDetails: ClientDetails,
  onSetClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>
}

const ServiceBusTest = ({ storedServiceBusEndpoint, clientDetails, onSetClientDetails }: ServiceBusTestProps) => {
  const [serviceBusEndpoint, setServiceBusEndpoint] = React.useState(storedServiceBusEndpoint || "");
  const { sendMessage, output, error } = useServiceBus(serviceBusEndpoint, clientDetails, onSetClientDetails);

  const handleServiceBusEndpointChange = (newServiceBusEndpoint) => {
    localStorage.setItem('serviceBusEndpoint', newServiceBusEndpoint);
    setServiceBusEndpoint(newServiceBusEndpoint);
  };

  return (
    <div>
      <h3>Send Service Bus Endpoint</h3>
      <form onSubmit={e => { sendMessage(); e.preventDefault(); }}>
        <label>
          Service Bus Endpoint:
          <input type="text" value={serviceBusEndpoint} onChange={({ target }) => handleServiceBusEndpointChange(target.value)} />
        </label>
        <br />
        <br />
        <input type="submit" value="Send Message" />
      </form>
      {!error ? null : <h3 style={{ color: "red" }}>{error}</h3>}
      <br />
      <h3>Messages sent<br />(each one with the serialized "clientDetails"):</h3>
      <pre><code>{output || clientDetails.output}</code></pre>
    </div>
  );
}

function TestPage() {
  const storedServiceBusEndpoint = localStorage.getItem('serviceBusEndpoint');
  const [clientDetails, setClientDetails] = React.useState<ClientDetails>(
    readClientDetails() ||
    {
      tenantId: "",
      clientId: "",
      queueName: "partitioned-queue",
      loginStyle: "popup",
      flow: "auth-code",
      numberOfExecutions: 1,
      cacheCredential: true,
      parallel: false,
      preAuthenticate: true,
      serviceBusEndpoint: "",
      output: ""
    });

  return (
    <div>
      <h1>Azure SDK Browser Manual Tests</h1>
      <hr />
      <ClientDetailsEditor clientDetails={clientDetails} onSetClientDetails={setClientDetails} />
      <ServiceBusTest storedServiceBusEndpoint={storedServiceBusEndpoint} clientDetails={clientDetails} onSetClientDetails={setClientDetails} />
    </div>
  );
}

ReactDOM.render(
  <TestPage />,
  document.getElementById("app")
);
