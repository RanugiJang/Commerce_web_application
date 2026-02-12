import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    nav("/login");
  };

  return (
    <div className="w-full bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Commerce Web App</Link>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <span className="text-sm text-slate-300">{role}</span>
              {role === "ADMIN" && (
                <Link className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600" to="/admin/items">
                  Admin
                </Link>
              )}
              <Link className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600" to="/items">
                Items
              </Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
