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
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Admin Login</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button onClick={submit}>Login</button>
      </div>

      <p style={{ marginTop: 14, fontSize: 12 }}>
        Default admin: <b>admin@commerce.com</b> / <b>Admin@123</b>
      </p>
    </div>
  );
}
