import { GoogleLogin } from "@react-oauth/google";
import { loginGoogle } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginUser() {
  const { setAuth } = useAuth();
  const nav = useNavigate();

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      background:
        "radial-gradient(900px 400px at 20% 10%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(900px 400px at 80% 20%, rgba(16,185,129,0.14), transparent 55%), #f7faf9",
    },
    card: {
      width: "100%",
      maxWidth: 520,
      background: "#fff",
      borderRadius: 18,
      padding: "40px 35px",
      boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
      border: "1px solid rgba(0,0,0,0.05)",
      textAlign: "center",
    },
    title: {
      margin: 0,
      fontSize: 28,
      fontWeight: 900,
      color: "#0f172a",
    },
    subtitle: {
      marginTop: 10,
      fontSize: 14,
      color: "#64748b",
      lineHeight: 1.5,
    },
    hintBox: {
      marginTop: 18,
      padding: 12,
      borderRadius: 12,
      background: "rgba(34,197,94,0.08)",
      border: "1px solid rgba(34,197,94,0.18)",
      color: "#166534",
      fontSize: 13,
      fontWeight: 700,
    },
    googleWrap: {
      marginTop: 28,
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <>
      

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>User Login</h2>
          <p style={styles.subtitle}>
            Sign in using your Google account to view items and access the user panel.
          </p>

          <div style={styles.hintBox}>Google Authentication Enabled ✅</div>

          <div style={styles.googleWrap}>
            <GoogleLogin
              onSuccess={async (res) => {
                try {
                  const credential = res.credential;
                  if (!credential) return alert("No Google credential received");

                  const data = await loginGoogle(credential);
                  setAuth(data.token, data.role, data.email);
                  nav("/user");
                } catch (e: any) {
                  alert(e?.response?.data ?? "Google login failed");
                }
              }}
              onError={() => alert("Google login failed")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
