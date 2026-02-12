import api from "./axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/types";

export async function login(payload: LoginRequest) {
  const res = await api.post<AuthResponse>("/api/auth/login", payload);
  return res.data;
}

export async function register(payload: RegisterRequest) {
  const res = await api.post<AuthResponse>("/api/auth/register", payload);
  return res.data;
}

export async function me() {
  // If you already have /api/me endpoint, use it.
  // If not, we’ll just decode role from saved login response.
  const res = await api.get("/api/me");
  return res.data;
}
