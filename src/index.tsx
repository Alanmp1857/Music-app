import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Provider
        domain="braintumor-alzheimer-app.us.auth0.com"
        clientId="DcLEEM2FOA2ycqcegDUfumapcM6Mhkhe"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
        <App />
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
