import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { saveAuth } from "../auth";


export default function LoginPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  // ✅ Admin Local Login
  const loginAdmin = async () => {
    setError("");

    try {
      const res = await api.post("/api/Auth/login", {
        email,
        password,
      });

      saveAuth(res.data);

      if (res.data.role === "ADMIN") {
        nav("/admin/items");
      } else {
        nav("/items");
      }
    } catch (err: any) {
      setError(err.response?.data ?? "Login failed");
    }
  };

  // ✅ Google User Login
  const handleGoogleLogin = async (credential: string) => {
    setError("");

    try {
      const res = await api.post("/api/Auth/google", {
        credential,
      });

      saveAuth(res.data);
      nav("/items");
    } catch (err: any) {
      setError(err.response?.data ?? "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Commerce Login
        </h2>

        {/* ADMIN LOGIN */}
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={loginAdmin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login as Admin
          </button>
        </div>

        <div className="text-center text-gray-500 mb-4">
          OR
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin(credentialResponse.credential);
              }
            }}
            onError={() => setError("Google Login Failed")}
          />
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
