import React, { createContext, useContext, useMemo, useState } from "react";

type Role = "USER" | "ADMIN" | null;

type AuthState = {
  token: string | null;
  email: string | null;
  role: Role;
};

type AuthContextType = AuthState & {
  login: (token: string, email: string, role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
  const [role, setRole] = useState<Role>((localStorage.getItem("role") as Role) ?? null);

  const login = (t: string, e: string, r: Role) => {
    setToken(t);
    setEmail(e);
    setRole(r);

    localStorage.setItem("token", t);
    localStorage.setItem("email", e);
    localStorage.setItem("role", r ?? "");
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  const value = useMemo(() => ({ token, email, role, login, logout }), [token, email, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
