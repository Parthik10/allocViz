// main.jsx: React app entry point, sets up provider and renders App or TestRunner.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { MemoryProvider } from "./context/MemoryContext.jsx";

// Uncomment the next line to run the test instead of the main app
// import TestRunner from "./TestRunner.jsx";

// Set to true to run the test, false to run the main app
const RUN_TEST = false;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryProvider>
      {RUN_TEST ? (
        // This would run the test if RUN_TEST is true
        // <TestRunner />
        <div className="container mt-5">
          <div className="alert alert-warning">
            To run the test, set RUN_TEST to true in main.jsx and uncomment the TestRunner import.
          </div>
          <App />
        </div>
      ) : (
        <App />
      )}
    </MemoryProvider>
  </StrictMode>
);
