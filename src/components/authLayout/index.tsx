import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore, { AuthState } from "../../store/authStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { whoAmI } from "../../services/authService";

export default function AuthLayout() {
  const { data: logedInUserData, isLoading } = useQuery({
    queryKey: ["who-am-i"],
    queryFn: whoAmI,
  });

  const navigate = useNavigate();
  const authenticated = useAuthStore((state: AuthState) => state.authenticated);

  const setAuthenticated = useAuthStore(
    (state: AuthState) => state.setAuthenticated
  );

  const setLogedInUser = useAuthStore(
    (state: AuthState) => state.setLogedInUser
  );

  useEffect(() => {
    if (logedInUserData?.user) {
      setLogedInUser(logedInUserData.user);
      setAuthenticated(true);
    }
  }, [logedInUserData]);

  useEffect(() => {
    if (authenticated) {
      navigate("/rooms", { replace: true });
      return;
    }
  }, [navigate, authenticated]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="text-black">
      <Outlet context={{ authenticated }} />
    </div>
  );
}
