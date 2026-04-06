import type { JSX } from "react/jsx-runtime";

export interface Reaction {
  likes: number;
  dislikes: number;
}

export interface Post {
  map(arg0: (post: Post) => JSX.Element): import("react").ReactNode;
  length: number;
  id: number;
  title: string;
  body: string;
  userId: number;
  reactions: Reaction;
  total: number;
  tags: [];
}

export interface PostsResponse {
  posts: Post[];
}
