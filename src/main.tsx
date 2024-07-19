import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_IO_SERVER);

socket.on("connect", () => {
  console.log("Connected to server");
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
