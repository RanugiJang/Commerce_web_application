import { api } from "./axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

export const authApi = {
  register: async (data: RegisterRequest) => {
    const res = await api.post<AuthResponse>("/api/Auth/register", data);
    return res.data;
  },

  login: async (data: LoginRequest) => {
    const res = await api.post<AuthResponse>("/api/Auth/login", data);
    return res.data;
  },

  // If your backend has something like: POST /api/Auth/google
  // where frontend sends Google ID token and backend returns JWT
  googleLogin: async (idToken: string) => {
    const res = await api.post<AuthResponse>("/api/Auth/google", { idToken });
    return res.data;
  },

  // Optional: your backend "Me" endpoint to validate token (if you added it)
  me: async () => {
    const res = await api.get("/api/Me");
    return res.data;
  },
};
