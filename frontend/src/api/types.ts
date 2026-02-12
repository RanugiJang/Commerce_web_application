export type Role = "USER" | "ADMIN";

export type AuthResponse = {
  token: string;
  email: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  role: Role;
};

export type Item = {
  id: number;
  name: string;
  rate: number;
  quantity: number;
};

export type CreateItemRequest = {
  name: string;
  rate: number;
  quantity: number;
};

export type UpdateItemRequest = {
  name: string;
  rate: number;
  quantity: number;
};
