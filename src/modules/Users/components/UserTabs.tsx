import { Button, Result, Tabs } from "antd";
import PostCard from "@/modules/Posts/PostCard";
import type { Post } from "@/modules/Posts/post";
import TodoItem from "../../Todos/TodoItem";
import type { Todo } from "@/modules/Todos/todo";
import { PlusOutlined } from "@ant-design/icons";
import { useAddPost } from "@/modules/Posts/usePosts";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  posts?: Post[];
  todos?: Todo[];
}

const UserTabs = ({ posts, todos }: Props) => {
  const role = useAuthStore((state) => state.user?.role);
  const addPostMutation = useAddPost();
  return (
    <Tabs
      items={[
        {
          key: "posts",
          label: "Posts",
          children: (
            <>
              {(posts || []).length === 0 ? (
                <Result
                  status="info"
                  title="No Posts Found"
                  subTitle="This user hasn’t created any posts yet."
                />
              ) : (
                (posts || []).map((post: Post) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
              {role === "user" && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addPostMutation.mutate({
                      title: "New Post",
                      body: "new post body",
                      userId: 1,
                    })
                  }
                >
                  Add Post
                </Button>
              )}
            </>
          ),
        },
        {
          key: "todos",
          label: "Todos",
          children:
            (todos || []).length === 0 ? (
              <Result
                status="info"
                title="No Todos Found"
                subTitle="This user doesn’t have any tasks yet."
                // extra={<Button type="primary">Add Todo</Button>}
              />
            ) : (
              (todos || []).map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ),
        },
      ]}
    />
  );
};

export default UserTabs;
