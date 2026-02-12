import { useState } from "react";
import { loginAdmin } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("admin@commerce.com");
  const [password, setPassword] = useState("Admin@123");

  const { setAuth } = useAuth();
  const nav = useNavigate();

  const submit = async () => {
    try {
      const data = await loginAdmin(email, password);
      setAuth(data.token, data.role, data.email);
      nav("/admin");
    } catch (e: any) {
      alert(e?.response?.data ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-emerald-100 via-green-100 to-teal-200">
      <div className="w-full max-w-md rounded-3xl px-10 py-12 text-center backdrop-blur-md bg-white/40 border border-white/50 shadow-2xl shadow-emerald-500/20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-3 py-1 text-xs font-extrabold text-emerald-900">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
          Admin Access
        </div>

        {/* Title */}
        <h2 className="mt-4 text-4xl font-extrabold text-emerald-900">
          Admin Login
        </h2>
        <p className="mt-2 text-sm text-emerald-900/60">
          Sign in to manage items (add, update, delete)
        </p>

        {/* Fields */}
        <div className="mt-8 text-left space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Admin Email
            </label>
            <input
              className="w-full h-11 rounded-xl border border-emerald-200 bg-white/70 px-4 text-sm outline-none
              focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Password
            </label>
            <input
              className="w-full h-11 rounded-xl border border-emerald-200 bg-white/70 px-4 text-sm outline-none
              focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={submit}
            className="h-11 w-[180px] rounded-xl text-white font-bold text-sm
            bg-gradient-to-r from-emerald-700 to-emerald-500
            shadow-lg shadow-emerald-500/40
            transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            Login
          </button>
        </div>

        

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-left">
          <span className="text-xs text-emerald-900/60">
            Tip: Keep this page only for admins.
          </span>

          <a
            className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition"
            href="/login/user"
          >
            Go to User Login →
          </a>
        </div>
      </div>
    </div>
  );
}
