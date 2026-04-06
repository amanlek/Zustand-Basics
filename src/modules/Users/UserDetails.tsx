import { Row, Col, Spin } from "antd";
import { useParams } from "react-router-dom";
import useUser from "@/modules/Users/hooks/useUser";
import usePosts from "@/modules/Posts/usePosts";

import UserProfileCard from "./UserProfileCard";
import UserTabs from "./UserTabs";
import useTodos from "@/modules/Todos/useTodos";

const UserDetails = () => {
  const { id } = useParams();
  const { data: user } = useUser(id!);
  const { data: posts, isLoading: postsLoading } = usePosts(id);
  const { data: todos, isLoading: todosLoading } = useTodos(id);


  if (postsLoading || todosLoading) {
    return <Spin size="large" />;
  }

  // Set global user when fetched

  return (
    <Row
      gutter={[16, 16]}
    >
      {/* LEFT PROFILE */}
      <Col xs={24} md={8}>
        <UserProfileCard user={user} />
      </Col>

      {/* RIGHT CONTENT */}
      <Col xs={24} md={16}>
        <UserTabs posts={posts?.posts} todos={todos?.todos} />
      </Col>
    </Row>
  );
};

export default UserDetails;
