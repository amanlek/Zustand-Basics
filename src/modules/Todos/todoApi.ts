import api from "@/api/baseApiInstance";
import type { TodosResponse } from "@/modules/Todos/todo";

export const getTodos = async (): Promise<TodosResponse> => {
  const res = await api.get("/todos");
  return res.data;
};

export const getTodosByUser = async (UserId: string): Promise<TodosResponse> => {
  const res = await api.get(`/todos/user/${UserId}`);
  return res.data;
};
