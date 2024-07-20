import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore, { AuthState } from "../../store/authStore";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authenticated = useAuthStore((state: AuthState) => state.authenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate, authenticated]);

  return children;
}
