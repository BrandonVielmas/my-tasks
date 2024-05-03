import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.body.innerHTML = "<div id='root'></div>";
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);