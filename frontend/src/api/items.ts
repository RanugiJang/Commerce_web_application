import api from "./axios";
import type { Item, CreateItemRequest, UpdateItemRequest } from "../types/types";

export async function getItems() {
  const res = await api.get<Item[]>("/api/items");
  return res.data;
}

export async function getItemById(id: number) {
  const res = await api.get<Item>(`/api/items/${id}`);
  return res.data;
}

export async function createItem(payload: CreateItemRequest) {
  const res = await api.post<Item>("/api/items", payload);
  return res.data;
}

export async function updateItem(id: number, payload: UpdateItemRequest) {
  const res = await api.put<Item>(`/api/items/${id}`, payload);
  return res.data;
}

export async function deleteItem(id: number) {
  await api.delete(`/api/items/${id}`);
}
