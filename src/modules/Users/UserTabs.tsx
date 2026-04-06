import { Button, Result, Tabs } from "antd";
import PostCard from "@/modules/Posts/PostCard";
import type { Post } from "@/types/post";
import TodoItem from "../Todos/TodoItem";
import type { Todo } from "@/types/todo";
import { PlusOutlined } from "@ant-design/icons";
import { useAddPost } from "@/modules/Posts/usePosts";

interface Props {
  posts?: Post[];
  todos?: Todo[];
}

const UserTabs = ({ posts, todos }: Props) => {
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
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 16 }}
                onClick={() =>
                  addPostMutation.mutate({
                    title: "New Post",
                    body: "This is a new post",
                    userId: 1,
                  })
                }
                loading={addPostMutation.isPending}
              >
                Add Post
              </Button>
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
