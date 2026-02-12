import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allow?: ("USER" | "ADMIN")[];
};

export default function ProtectedRoute({ children, allow }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") as "USER" | "ADMIN" | null;

  if (!token) return <Navigate to="/login" replace />;

  if (allow && role && !allow.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
