import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./i18n";
import App from "./App";
import "./index.css";

// Suspense holds the first paint until the visitor's language has loaded,
// so no text ever flashes in the wrong language or direction.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>
);
