import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/App.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to measure performance in your app, pass a function to log results
// or send to an analytics endpoint.
reportWebVitals();
