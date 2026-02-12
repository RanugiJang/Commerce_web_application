import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { role, email, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        background: "linear-gradient(90deg, #16a34a, #22c55e)",
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          fontWeight: 900,
          fontSize: 20,
          letterSpacing: 0.5
        }}
      >
        Commerce
      </div>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginLeft: 30
        }}
      >
        {role === "USER" && (
          <Link
            to="/user"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            User Panel
          </Link>
        )}

        {role === "ADMIN" && (
          <Link
            to="/admin"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            Admin Panel
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 16
        }}
      >
        {email && (
          <span
            style={{
              fontSize: 13,
              background: "rgba(255,255,255,0.15)",
              padding: "6px 10px",
              borderRadius: 20
            }}
          >
            {email}
          </span>
        )}

        <button
          onClick={() => {
            logout();
            nav("/login");
          }}
          style={{
            background: "white",
            color: "#16a34a",
            border: "none",
            padding: "6px 14px",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            transition: "0.2s"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
