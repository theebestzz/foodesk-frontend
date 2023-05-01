import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeContext from "./context/ThemeContext";
import DataProvider from "./redux/store";
import Layout from "./components/Layout/Layout";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <Router basename="/">
      <ThemeContext>
        <Layout>
          <App />
        </Layout>
      </ThemeContext>
    </Router>
    <ToastContainer />
  </DataProvider>
);
