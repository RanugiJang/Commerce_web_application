import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(900px 400px at 20% 10%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(900px 400px at 80% 20%, rgba(16,185,129,0.14), transparent 55%), #f7faf9",
        padding: 20
      }}
    >
      <div
        style={{
          width: "500%",
          paddingTop: 60,
          paddingBottom: 60,
          maxWidth: 800,   // 🔥 Bigger width
          maxHeight: 800,
          background: "white",
          borderRadius: 18,
          padding: "40px 35px",  // 🔥 More padding
          boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 60,
            fontWeight: 1000,
            color: "#0f172a",
            padding: 10,
          }}
        >
          Welcome to Commerce
        </h2>

        <p
          style={{
            marginTop: 10,
            fontSize: 20,
            color: "#64748b"
          }}
        >
          Select how you want to login
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 35
          }}
        >
          <Link to="/login/user" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                height: 52,   // 🔥 Taller button
                padding: 10,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 15,
                color: "white",
                background: "linear-gradient(90deg, #16a34a, #22c55e)",
                boxShadow: "0 10px 22px rgba(34,197,94,0.25)"
              }}
            >
              User Login (Google Only)
            </button>
          </Link>

          <Link to="/login/admin" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                height: 52,
                padding: 10,
                borderRadius: 12,
                border: "2px solid #22c55e",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 15,
                color: "#16a34a",
                background: "white"
              }}
            >
              Admin Login (Email / Password)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
