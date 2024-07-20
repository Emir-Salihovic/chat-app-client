import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/chat.png";
import { useMutation } from "@tanstack/react-query";
import { AuthCredentials, signup } from "../../services/authService";
import useAuthStore, { AuthState } from "../../store/authStore";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setAuthenticated = useAuthStore(
    (state: AuthState) => state.setAuthenticated
  );

  const signupMutation = useMutation({
    mutationFn: (data: AuthCredentials) => signup(data),
    onError: (error) => {
      // An error happened!
      console.error("error", error);
    },
    onSuccess: (data) => {
      console.log("data from signup", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });

    await signupMutation.mutateAsync({ username, password });

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
          <p className="text-gray-600">Please enter your details to register</p>
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
          <button
            type="submit"
            className="w-full bg-messageContainerSender text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-messageText">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
