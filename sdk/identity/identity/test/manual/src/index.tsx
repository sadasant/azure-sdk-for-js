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
  serviceBusEndpoint: string,
  messageText: string,
  output: string,
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
  cachedCredential = clientDetails.tenantId.length > 0 && clientDetails.clientId.length > 0 ? new InteractiveBrowserCredential(clientDetails) : undefined;
  lastLoginStyle = clientDetails.loginStyle;
  return cachedCredential;
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
        <h4>Run in parallel?</h4>
        <Radio values={["yes", "no"]} checkedValue={clientDetails.parallel ? "yes" : "no"} onChange={setDetail("parallel", x => x === "yes")} />
      </form>
    </div >
  );
}

async function sendMessage(serviceBusEndpoint: string, messageText: string, clientDetails: ClientDetails): Promise<void> {
  for (let i = 0; i < clientDetails.numberOfExecutions; i++) {
    const credential = getCredential(clientDetails, clientDetails.cacheCredential);
    const queueName = clientDetails.queueName;

    if (credential === undefined) {
      throw new Error("You must enter client details.");
    }

    if (!messageText) {
      throw new Error("No message text!");
    }

    console.log("Working with", {
      serviceBusEndpoint,
      ...clientDetails
    });

    const serviceBusClient = new ServiceBusClient(serviceBusEndpoint, credential);

    try {
      const sender = serviceBusClient.createSender(queueName);
      await sender.sendMessages({ body: messageText });
      await sender.close();
      const receiver = serviceBusClient.createReceiver(queueName);
      const messages = await receiver.receiveMessages(10);
      await receiver.close();
      clientDetails.output = "Received messages:\n", messages.map(m => m.body.toString()).join("\n");
    } catch (e) {
      throw e;
    } finally {
      await serviceBusClient.close();
    }
  }
}

function useServiceBus(serviceBusEndpoint: string, messageText: string, clientDetails: ClientDetails) {
  const [running, setRunning] = React.useState(false)
  const [error, setErrorInner] = React.useState(undefined);

  const setError = (err: Error) => {
    setRunning(false)
    setErrorInner(err)
  }

  React.useEffect(() => {
    if (serviceBusEndpoint.trim().length === 0) {
      setError("You must enter a service bus endpoint to send a message.");
    } else if (running) {
      (async () => {
        await sendMessage(serviceBusEndpoint, clientDetails.messageText || messageText, clientDetails);
        setRunning(false)
      })().catch(err => setError(err.toString()));
    } else {
      setError("")
    }
  }, [serviceBusEndpoint, messageText, clientDetails, running])

  return { sendMessage: () => setRunning(true), error }
}

interface ServiceBusTestProps {
  storedServiceBusEndpoint?: string,
  storedMessageText?: string,
  clientDetails: ClientDetails
}

const ServiceBusTest = ({ storedServiceBusEndpoint, storedMessageText, clientDetails }: ServiceBusTestProps) => {
  const [serviceBusEndpoint, setServiceBusEndpoint] = React.useState(storedServiceBusEndpoint || "");
  const [messageText, setMessageText] = React.useState(storedMessageText || "");
  const { sendMessage, error } = useServiceBus(serviceBusEndpoint, messageText, clientDetails);

  const handleServiceBusEndpointChange = (newServiceBusEndpoint) => {
    localStorage.setItem('serviceBusEndpoint', newServiceBusEndpoint);
    setServiceBusEndpoint(newServiceBusEndpoint);
  };

  const handleMessageText = (newMessageText) => {
    localStorage.setItem('messageText', newMessageText);
    setMessageText(newMessageText);
  };

  return (
    <div>
      <h3>Send Service Bus Endpoint</h3>
      <form onSubmit={e => { sendMessage(); e.preventDefault(); }}>
        <label>
          Service Bus Endpoint:
          <input type="text" value={serviceBusEndpoint} onChange={({ target }) => handleServiceBusEndpointChange(target.value)} />
        </label>
        <label>
          Message to send:
          <input type="text" value={messageText} onChange={({ target }) => handleMessageText(target.value)} />
        </label>
        <input type="submit" value="Send Message" />
      </form>
      {!error ? null : <h3 style={{ color: "red" }}>{error}</h3>}
    </div>
  );
}

function TestPage() {
  const storedServiceBusEndpoint = localStorage.getItem('serviceBusEndpoint');
  const storedMessageText = localStorage.getItem('messageText');
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
      serviceBusEndpoint: "",
      messageText: "",
      output: ""
    })
  return (
    <div>
      <h1>Azure SDK Browser Manual Tests</h1>
      <hr />
      <ClientDetailsEditor clientDetails={clientDetails} onSetClientDetails={setClientDetails} />
      <ServiceBusTest storedServiceBusEndpoint={storedServiceBusEndpoint} storedMessageText={storedMessageText} clientDetails={clientDetails} />
      <br />
      <textarea>{clientDetails.output}</textarea>
    </div>
  );
}

ReactDOM.render(
  <TestPage />,
  document.getElementById("app")
);
