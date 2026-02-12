import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ allow }: { allow: "ADMIN" | "USER" }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (role !== allow) return <Navigate to="/login" replace />;

  return <Outlet />;
}
