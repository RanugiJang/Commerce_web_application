import { api } from "./axios";
import type { Item, CreateItemRequest, UpdateItemRequest } from "./types";

export const itemsApi = {
  // USER + ADMIN can view list (based on your controller)
  getAll: async () => {
    const res = await api.get<Item[]>("/api/Items");
    return res.data;
  },

  // USER + ADMIN can view by id
  getById: async (id: number) => {
    const res = await api.get<Item>(`/api/Items/${id}`);
    return res.data;
  },

  // ADMIN only
  create: async (data: CreateItemRequest) => {
    const res = await api.post<Item>("/api/Items", data);
    return res.data;
  },

  // ADMIN only
  update: async (id: number, data: UpdateItemRequest) => {
    const res = await api.put<Item>(`/api/Items/${id}`, data);
    return res.data;
  },

  // ADMIN only
  remove: async (id: number) => {
    await api.delete(`/api/Items/${id}`);
  },
};
