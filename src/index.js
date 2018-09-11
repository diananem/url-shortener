import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./AppRouter";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink } from "apollo-link";

//Set up subscription
const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjky7pfnm593o0196yq9mgr3v`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjky7pfnm593o0196yq9mgr3v"
});
const apolloLinkWithToken = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("SHORTLY_TOKEN");
  const authHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authHeader
    }
  });
  return forward(operation);
});

const httpLinkWithToken = apolloLinkWithToken.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithToken
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
);
ReactDOM.render(
  withApolloProvider(<AppRouter />),
  document.getElementById("root")
);
registerServiceWorker();
