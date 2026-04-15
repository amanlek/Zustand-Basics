import { Row, Col, Spin } from "antd";
import { useAuthStore } from "@/store/useAuthStore";
import usePosts from "@/modules/Posts/usePosts";
import useTodos from "@/modules/Todos/useTodos";

import UserProfileCard from "@/modules/Users/components/UserProfileCard";
import UserTabs from "@/modules/Users/components/UserTabs";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const { data: posts, isLoading: postsLoading } = usePosts(user?.id);
  const { data: todos, isLoading: todosLoading } = useTodos(user?.id);

  if (postsLoading || todosLoading) {
    return <Spin size="large" />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <UserProfileCard user={user} />
      </Col>

      <Col xs={24} md={16}>
        <UserTabs posts={posts?.posts} todos={todos?.todos} />
      </Col>
    </Row>
  );
};

export default Profile;
