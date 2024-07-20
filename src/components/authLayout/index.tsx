import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore, { AuthState } from "../../store/authStore";
import { useEffect } from "react";

export default function AuthLayout() {
  const navigate = useNavigate();
  const authenticated = useAuthStore((state: AuthState) => state.authenticated);

  useEffect(() => {
    if (authenticated) {
      navigate("/rooms", { replace: true });
      return;
    }
  }, [navigate, authenticated]);

  return (
    <div className="text-black">
      <Outlet context={{ authenticated }} />
    </div>
  );
}
