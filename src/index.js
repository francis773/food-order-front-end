import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from "react-dom/client"
import App from "./App";
import "./styles.css"; // Ensure this file exists

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the App
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);