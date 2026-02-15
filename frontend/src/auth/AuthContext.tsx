import React, { createContext, useContext, useMemo, useState } from "react"; 
//manage authentication globally in frontend
type Role = "ADMIN" | "USER" | null; //Defining a type for user roles, which can be either "ADMIN", "USER", or null (for unauthenticated users) 

type AuthState = { 
  token: string | null;
  role: Role;
  email: string | null;
};

type AuthContextType = AuthState & { //Defining the shape of the AuthContext, which includes the authentication state (token, role, email) and two methods: setAuth for setting the authentication state and logout for clearing the authentication state.
  setAuth: (token: string, role: Role, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null); //Creating a React context for authentication, it will be used to provide the authentication state and methods to the components that need it.

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<Role>((localStorage.getItem("role") as Role) ?? null);
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));

  const setAuth = (t: string, r: Role, e: string) => {
    setToken(t);
    setRole(r);
    setEmail(e);
    localStorage.setItem("token", t);
    localStorage.setItem("role", r ?? "");
    localStorage.setItem("email", e);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  };

  const value = useMemo(() => ({ token, role, email, setAuth, logout }), [token, role, email]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
