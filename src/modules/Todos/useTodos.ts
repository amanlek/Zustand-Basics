import { useQuery } from "@tanstack/react-query";
import { getTodosByUser, getTodos } from "./todoApi";
import type { TodosResponse } from "@/modules/Todos/todo";

const useTodos = (UserId?: string) => {
  return useQuery<TodosResponse>({
    queryKey: ["todos", UserId],
    queryFn: () => (UserId ? getTodosByUser(UserId) : getTodos()),
  });
};

export default useTodos;
