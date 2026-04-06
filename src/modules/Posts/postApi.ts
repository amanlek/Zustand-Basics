import api from "@/api/baseApiInstance";

import type { Post, PostsResponse } from "@/types/post";

const getPosts = async (): Promise<PostsResponse> => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPostsByUser = async (
  userId: string,
): Promise<PostsResponse> => {
  const res = await api.get(`/posts/user/${userId}`);
  return res.data;
};

export const addPost = async (data: Partial<Post>) => {
  const res = await api.post("/posts/add", data);
  return res.data;
};

export const updatePost = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<Post>;
}) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await api.delete(`/posts/${id}`);
  console.log("Post Deleted", res.data);
  return res.data;
};

export default getPosts;
