import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginGoogle, loginUser } from "../api/authApi";

export default function LoginUser() {
  const { setAuth } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async () => {
    try {
      const data = await loginUser(email, password);

      if (data.role !== "USER") {
        alert("This account is not a USER account.");
        return;
      }

      setAuth(data.token, data.role, data.email);
      nav("/user");
    } catch (e: any) {
      alert(e?.response?.data ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6
      bg-gradient-to-br from-emerald-100 via-green-100 to-teal-200">

      <div
        className="w-full max-w-md rounded-3xl
        px-10 py-12 text-center
        backdrop-blur-md
        bg-white/40
        border border-white/50
        shadow-2xl shadow-emerald-500/20"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-emerald-900">
          User Login
        </h2>

        <p className="mt-2 text-sm text-emerald-800/70">
          Login using Google or Email & Password
        </p>

        {/* Email Login */}
        <div className="flex flex-col gap-4 mt-8">
          <input
            className="w-full rounded-xl border border-emerald-200
              bg-white/70 px-4 py-3 text-sm
              outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-emerald-200
              bg-white/70 px-4 py-3 text-sm
              outline-none focus:ring-2 focus:ring-emerald-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={loginWithEmail}
            className="w-full h-12 rounded-xl
              text-white font-semibold text-sm
              bg-gradient-to-r from-emerald-700 to-emerald-500
              shadow-lg shadow-emerald-500/40
              transition-all duration-200
              hover:scale-[1.03]
              active:scale-[0.97]"
          >
            Login with Email
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-emerald-300/40" />
          <span className="text-xs font-semibold text-emerald-700/60">
            OR
          </span>
          <div className="h-px flex-1 bg-emerald-300/40" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (res) => {
  try {
    if (!res.credential) return alert("No Google credential");

    const data = await loginGoogle(res.credential);
    setAuth(data.token, data.role, data.email);
    nav("/user");
  } catch (e: any) {
    console.error(e);
    alert(e?.response?.data ?? "Google login failed");
  }
}}
          
          />
        </div>
      </div>
    </div>
  );
}
