import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getPosts, {
  addPost,
  deletePost,
  getPostsByUser,
  updatePost,
} from "@/modules/Posts/postApi";
import type { PostsResponse } from "@/types/post";
import { QUERY_KEYS } from "@/constants/queryKeys";

const usePosts = (userId?: string) => {
  return useQuery<PostsResponse>({
    queryKey: userId ? ["posts", userId] : ["posts"],
    queryFn: () => (userId ? getPostsByUser(userId) : getPosts()),
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
};

export default usePosts;
