// main.tsx
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";

import App from "./App.tsx";

import AuthLayout from "./components/authLayout/index.tsx";
import LoginForm from "./components/loginForm/index.tsx";
import SignupForm from "./components/signupForm/index.tsx";
import ProtectedRoute from "./components/protectedRoute/index.ts";
import ActiveConversation from "./components/activeConversation/index.tsx";

import SocketService from "./services/socketService.ts";

// Create a client
const queryClient = new QueryClient();

export const socketService = SocketService.socket; // Initialize the SocketService

// Handle socket events
socketService.on("roomAdded", () => {
  queryClient.invalidateQueries({
    queryKey: ["rooms"],
  });
});

socketService.on("roomDeleted", () => {
  queryClient.invalidateQueries({
    queryKey: ["rooms"],
  });
});

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
        children: [
          {
            path: ":roomId",
            element: <ActiveConversation />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    <ToastContainer />
  </QueryClientProvider>
);
