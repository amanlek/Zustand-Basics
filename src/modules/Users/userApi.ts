import api from "@/api/baseApiInstance";
import type { UsersResponse, User } from "@/types/users";

export const getUsers = async (): Promise<UsersResponse> => {
  const res = await api.get("/users");
  return res.data;
};

export const getUser = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};