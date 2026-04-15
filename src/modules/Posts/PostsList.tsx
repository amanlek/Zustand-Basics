import usePosts from "@/modules/Posts/usePosts";
import type { Post } from "@/modules/Posts/post";
import { Typography, Spin, Empty, Row, Col } from "antd";

import PostCard from "./PostCard";

const { Title } = Typography;

const PostsList = () => {
  const { data, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const posts = data?.posts || [];

  return (
    <div style={{ maxWidth: 1400, margin: "24px auto" }}>
      <Title level={4} style={{ marginBottom: 20 }}>
        Posts
      </Title>

      {posts.length === 0 ? (
        <Empty description="No Posts Available" />
      ) : (
        <Row gutter={[16, 16]}>
          {posts.map((post: Post) => (
            <Col xs={24} sm={12} md={8} lg={6} key={post.id}>
              <PostCard post={post} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default PostsList;
