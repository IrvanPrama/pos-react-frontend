import React from "react";
// 5 
import ReactDOM from "react-dom/client";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import axios from "axios";

axios.defaults.withCredentials = true;

// 5
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <App />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
