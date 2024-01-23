import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="braintumor-alzheimer-app.us.auth0.com"
      clientId="DcLEEM2FOA2ycqcegDUfumapcM6Mhkhe"
      authorizationParams={{
        redirect_uri: window.location.origin,
        // scope: "openid profile email",
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
