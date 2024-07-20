import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore, { AuthState } from "../../store/authStore";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authenticated = useAuthStore((state: AuthState) => state.authenticated);
  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated && !logedInUser?._id) {
      navigate("/login", { replace: true });
    }
  }, [navigate, authenticated, logedInUser]);

  return children;
}
