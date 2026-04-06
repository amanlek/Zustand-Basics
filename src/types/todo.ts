import type { JSX } from "react/jsx-runtime";

export interface Todo {
  map(arg0: (todo: Todo) => JSX.Element): import("react").ReactNode;
  length: number;
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse {
  todos: Todo[];
}
