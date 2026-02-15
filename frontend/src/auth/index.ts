//starting file of the frontend application it renders the main app component in the root html element
// frontend/src/auth/index.ts
export type Role = "ADMIN" | "USER";

export type AuthData = {
  token: string;
  email?: string;
  role?: Role;
};

const TOKEN_KEY = "commerce_token";
const ROLE_KEY = "commerce_role";
const EMAIL_KEY = "commerce_email";

export function saveAuth(data: AuthData) {
  if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);

  if (data?.role) localStorage.setItem(ROLE_KEY, data.role);
  else localStorage.removeItem(ROLE_KEY);

  if (data?.email) localStorage.setItem(EMAIL_KEY, data.email);
  else localStorage.removeItem(EMAIL_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): Role | null {
  const r = localStorage.getItem(ROLE_KEY);
  if (r === "ADMIN" || r === "USER") return r;
  return null;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}
