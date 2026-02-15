import { api } from "./axios";

export type Item = {
  id: number;
  name: string;
  rate: number;
  quantity: number;
};

export const getItems = async () => { 
  const res = await api.get<Item[]>("/items");
  return res.data;
};

export const createItem = async (payload: { name: string; rate: number; quantity: number }) => {
  const res = await api.post("/items", payload);
  return res.data;
};

export const updateItem = async (id: number, payload: { name?: string; rate?: number; quantity?: number }) => {
  const res = await api.put(`/items/${id}`, payload);
  return res.data;
};

export const deleteItem = async (id: number) => {
  await api.delete(`/items/${id}`);
};
