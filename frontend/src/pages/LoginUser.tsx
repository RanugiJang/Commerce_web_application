import { GoogleLogin } from "@react-oauth/google";
import { loginGoogle } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const { setAuth } = useAuth();
  const nav = useNavigate();

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>User Login (Google)</h2>

      <GoogleLogin
        
        onSuccess={(res) => {
         console.log("GOOGLE ID TOKEN:", res.credential);
}}

        onError={() => alert("Google login failed")}
      />
    </div>
  );
}
