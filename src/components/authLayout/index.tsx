import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuthStore, { AuthState } from "../../store/authStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { whoAmI } from "../../services/authService";
import ActivityIndicator from "../activityIndicator";

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = useAuthStore((state: AuthState) => state.authenticated);

  const setAuthenticated = useAuthStore(
    (state: AuthState) => state.setAuthenticated
  );

  const setLogedInUser = useAuthStore(
    (state: AuthState) => state.setLogedInUser
  );

  const {
    data: logedInUserData,
    isLoading,
    isFetching,
    refetch: fetchLogedInUser,
  } = useQuery({
    queryKey: ["who-am-i"],
    queryFn: whoAmI,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    retryDelay: 1000,
    // enabled: false,
  });

  useEffect(() => {
    if (logedInUserData?.user) {
      setLogedInUser(logedInUserData.user);
      setAuthenticated(true);
    }
  }, [logedInUserData]);

  useEffect(() => {
    if (authenticated) {
      fetchLogedInUser();

      navigate(location.pathname, { replace: true });
      return;
    }
  }, [navigate, authenticated]);

  if (isLoading || isFetching) return <ActivityIndicator />;

  return (
    <div className="text-black">
      <Outlet />
    </div>
  );
}
