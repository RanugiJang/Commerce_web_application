import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const data = await login({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") nav("/admin/items");
      else nav("/items");
    } catch (error: any) {
      setErr(error?.response?.data ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-1">Login</h1>
        <p className="text-sm text-slate-600 mb-6">Use your USER or ADMIN account.</p>

        {err && <div className="mb-4 rounded bg-red-50 text-red-700 p-3 text-sm">{String(err)}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@test.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white py-2 font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-xs text-slate-500">
            Tip: login with <b>admin@test.com</b> for admin actions (if you created it).
          </div>
        </form>
      </div>
    </div>
  );
}
