import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { FilterProvider } from "./context/FilterContext";
import { BrowserRouter as Router } from "react-router-dom";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-4w7ekngfefu0vgzd.us.auth0.com"
    clientId="0py4vTVaknecddH4V5VPXlIyHRl7lzdT"
    authorizationParams={{
      redirect_uri: "http://localhost:3000",
    }}
  >
    <Router>
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <App />
        </FilterProvider>
      </QueryClientProvider>
    </Router>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
