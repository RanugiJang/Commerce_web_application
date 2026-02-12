import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Login</h2>
      <p>Select how you want to login:</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        <Link to="/login/user"><button style={{ width: "100%" }}>Login as User (Google)</button></Link>
        <Link to="/login/admin"><button style={{ width: "100%" }}>Login as Admin (Email/Password)</button></Link>
      </div>
    </div>
  );
}
