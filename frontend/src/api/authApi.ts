import { api } from "./axios";

export type AuthResponse = {
  token: string;
  email: string;
  role: "ADMIN" | "USER";
};

export const loginAdmin = async (email: string, password: string) => { //Method to login an admin user, it sends a POST request to the /auth/login endpoint with the email and password, and returns the response data which contains the JWT token, email, and role of the logged in user.
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
};

export const loginGoogle = async (credential: string) => {
  const res = await api.post("/auth/google", { credential });
  return res.data
};

export const getMe = async () => {
  const res = await api.get("/me");
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};
