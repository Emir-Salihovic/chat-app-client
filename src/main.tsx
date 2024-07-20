import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { io } from "socket.io-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./components/authLayout/index.tsx";
import LoginForm from "./components/loginForm/index.tsx";
import SignupForm from "./components/signupForm/index.tsx";
import ProtectedRoute from "./components/protectedRoute/index.ts";

export const socket = io(import.meta.env.VITE_SOCKET_IO_SERVER);

socket.on("connect", () => {
  console.log("Connected to server");
});

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        element: <Navigate to="/login" replace />,
        index: true,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/rooms",
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
