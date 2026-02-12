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
      maxWidth: 420,
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
      border: "1px solid rgba(0,0,0,0.06)",
    },
    header: {
      textAlign: "center",
      marginBottom: 18,
    },
    title: {
      margin: 0,
      fontSize: 26,
      fontWeight: 800,
      color: "#0f172a",
      letterSpacing: 0.2,
    },
    subtitle: {
      margin: "6px 0 0",
      fontSize: 13,
      color: "#64748b",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px",
      borderRadius: 999,
      background: "rgba(34,197,94,0.12)",
      color: "#166534",
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 12,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#22c55e",
      boxShadow: "0 0 0 4px rgba(34,197,94,0.18)",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 12,
    },
    label: {
      fontSize: 13,
      fontWeight: 700,
      color: "#334155",
    },
    input: {
      height: 44,
      padding: "0 12px",
      borderRadius: 10,
      border: "1px solid #e2e8f0",
      outline: "none",
      fontSize: 14,
      color: "#0f172a",
      background: "#fff",
      transition: "border-color 160ms, box-shadow 160ms",
    },
    hint: {
      fontSize: 12,
      color: "#64748b",
      marginTop: 14,
      lineHeight: 1.4,
    },
    button: {
      height: 44,
      marginTop: 14,
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 14,
      color: "white",
      background: "linear-gradient(90deg, #16a34a, #22c55e)",
      boxShadow: "0 10px 18px rgba(34,197,94,0.25)",
      transition: "transform 120ms ease, filter 120ms ease",
    },
    footerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
      gap: 10,
      flexWrap: "wrap",
    },
    smallLink: {
      fontSize: 12,
      color: "#16a34a",
      textDecoration: "none",
      fontWeight: 700,
    },
    credsBox: {
      marginTop: 14,
      padding: 12,
      borderRadius: 12,
      background: "rgba(2,132,199,0.06)",
      border: "1px solid rgba(2,132,199,0.15)",
      color: "#0f172a",
      fontSize: 12,
      lineHeight: 1.5,
    },
    credsTitle: {
      fontWeight: 800,
      marginBottom: 6,
      color: "#0f172a",
    },
    mono: {
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.badge}>
            <span style={styles.dot} />
            Admin Access
          </div>

          <h2 style={styles.title}>Admin Login</h2>
          <p style={styles.subtitle}>Sign in to manage items (add, update, delete)</p>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Admin Email</label>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            autoComplete="email"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
        
        <button
          style={{
          height: 44,
          width: 180,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontWeight: 800,
          fontSize: 14,
          color: "white",
          background: "linear-gradient(90deg, #16a34a, #22c55e)",
          boxShadow: "0 10px 18px rgba(34,197,94,0.25)",
          transition: "transform 120ms ease"
      }}

           onClick={submit}
        >
            Login
        </button>
        </div>


        <div style={styles.credsBox}>
         <div style={styles.credsTitle}>Default Admin Credentials</div>
          <div>
            Email: <b style={styles.mono}>admin@commerce.com</b>
            <br />
            Password: <b style={styles.mono}>Admin@123</b>
          </div>
        </div>

        <div style={styles.footerRow}>
          <span style={styles.hint}>Tip: Keep this page only for admins.</span>
          <a style={styles.smallLink} href="/login/user">
            Go to User Login →
          </a>
        </div>
      </div>
    </div>
  );
}
