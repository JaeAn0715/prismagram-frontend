import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import Client from "./Apollo/Client";
import { ApolloProvider } from "react-apollo-hooks";

ReactDOM.render(
  <ApolloProvider client={Client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
