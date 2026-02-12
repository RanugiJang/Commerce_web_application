import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { role, email, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="flex items-center px-6 py-3 text-white
      bg-gradient-to-r from-emerald-700 to-emerald-500
      shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      
      {/* Brand */}
      <div className="font-extrabold text-xl tracking-wide">
        Commerce
      </div>

      {/* Links */}
      <div className="ml-8 flex items-center gap-6">
        {role === "USER" && (
          <Link
            to="/user"
            className="font-semibold text-white/90 hover:text-white transition"
          >
            User Panel
          </Link>
        )}

        {role === "ADMIN" && (
          <Link
            to="/admin"
            className="font-semibold text-white/90 hover:text-white transition"
          >
            Admin Panel
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-4">
        {email && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full
            bg-white/15 border border-white/20">
            {email}
          </span>
        )}

        <button
          onClick={() => {
            logout();
            nav("/login");
          }}
          className="rounded-lg bg-white px-4 py-1.5 font-bold text-emerald-700
            transition hover:bg-white/90 active:scale-[0.98]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
