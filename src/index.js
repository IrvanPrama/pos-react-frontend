import React from "react";
<<<<<<< HEAD
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
=======
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8
import ReactDOM from "react-dom/client";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
<<<<<<< HEAD
import axios from "axios";

axios.defaults.withCredentials = true;
=======
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Provider store={store}>
      <App />
    </Provider>
=======
    <App />
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8
  </React.StrictMode>,
  document.getElementById("root")
);
