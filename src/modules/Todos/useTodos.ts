import { useQuery } from "@tanstack/react-query";
import { getTodo, getTodos } from "./todoApi";
import type { TodosResponse } from "@/types/todo";

const useTodos = (UserId?: string ) => {
  return useQuery<TodosResponse>({
    queryKey: ["todos", UserId],
    queryFn:() => (UserId ? getTodo(UserId) : getTodos()),
  });
};

export default useTodos;
