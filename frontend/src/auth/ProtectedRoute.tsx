import { Navigate, Outlet } from "react-router-dom"; 
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ allow }: { allow: "ADMIN" | "USER" }) { //ProtectedRoute component that checks if the user is authenticated and has the required role before allowing access to the route. It uses the useAuth hook to get the authentication state and checks if the token exists and if the user's role matches the allowed role for the route. If not authenticated or if the role does not match, it redirects to the login page.
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (role !== allow) return <Navigate to="/login" replace />;

  return <Outlet />;
}
