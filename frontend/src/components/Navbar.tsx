import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { role, email, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div style={{ display: "flex", gap: 16, padding: 12, borderBottom: "1px solid #ddd" }}>
      <strong>Commerce</strong>

      {role === "USER" && <Link to="/user">User Panel</Link>}
      {role === "ADMIN" && <Link to="/admin">Admin Panel</Link>}

      <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
        {email && <span>{email}</span>}
        <button
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
