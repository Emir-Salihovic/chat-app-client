import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/chat.png";
import useAuthStore, { AuthState } from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { AuthLoginData, login } from "../../services/authService";

const LoginForm: React.FC = () => {
  const setAuthenticated = useAuthStore(
    (state: AuthState) => state.setAuthenticated
  );

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: (data: AuthLoginData) => login(data),
    onError: (error) => {
      // An error happened!
      console.error("error", error);
    },
    onSuccess: (data) => {
      console.log("data from login", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });

    await loginMutation.mutateAsync({ username, password });

    setAuthenticated(true);
    navigate("/rooms", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2 text-center">
            <img src={Logo} alt="Logo" className="h-12 inline-block" />
          </div>
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-600">Please enter your details to sign in</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              className="mt-1 p-2 block w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 block w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4 text-center">
            <a
              href="/forgot-password"
              className="ml-auto w-full text-sm text-messageText"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-messageContainerSender text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-gray-400"
          >
            {loginMutation.isPending ? "Loading..." : "Sign in"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-messageText">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
