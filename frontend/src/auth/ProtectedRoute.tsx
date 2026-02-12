import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole, type Role } from "./index";

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: ("ADMIN" | "USER")[];
}) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    const role = getRole();
    if (!role || !roles.includes(role)) {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}
