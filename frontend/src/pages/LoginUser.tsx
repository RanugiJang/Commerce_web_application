import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

export default function LoginUser() {
  const nav = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse?.credential;
      if (!idToken) {
        alert("Google token not received");
        return;
      }

      // backend should accept google idToken and return your JWT
      const res = await authApi.googleLogin(idToken);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("email", res.email);

      nav("/items");
    } catch (e: any) {
      console.log(e);
      alert(e?.response?.data || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold">User Login</h1>
        <p className="text-slate-600 mt-1">Sign in using Google</p>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Google login failed")}
          />
        </div>

        <div className="mt-6 text-sm text-slate-600 text-center">
          Admin?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => nav("/login-admin")}
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
