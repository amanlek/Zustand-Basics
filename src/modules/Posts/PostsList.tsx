import usePosts from "@/modules/Posts/usePosts";
import type { Post } from "@/types/post";
import { Card, Typography, Spin, Empty, Table, Tag, Tooltip } from "antd";

const { Title } = Typography;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text: string) => <strong>{text}</strong>,
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
    ellipsis: true,
    render: (body: string) => (
      <Tooltip title={body}>
        <Tag color="blue">
          {body.length > 60 ? body.substring(0, 60) + "..." : body}
        </Tag>
      </Tooltip>
    ),
  },
  {
    title: "Likes",
    key: "likes",
    render: (record: Post) => (
      <Tag color="green">{record.reactions?.likes}</Tag>
    ),
  },
  {
    title: "Dislikes",
    key: "dislikes",
    render: (record: Post) => (
      <Tag color="red">{record.reactions?.dislikes}</Tag>
    ),
  },
];

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
    <Card
      style={{
        borderRadius: 12,
        margin: "24px auto",
        maxWidth: 1400,
      }}
    >
      <Title level={4} style={{ marginBottom: 16 }}>
        All Posts
      </Title>

      {posts.length === 0 ? (
        <Empty description="No Posts Available" />
      ) : (
        <Table
          columns={columns}
          dataSource={posts}
          scroll={{ x: "max-content", y: 550 }}
          rowKey="id"
          pagination={{
            pageSize: 8,
          }}
          bordered
          className="styled-table"
        />
      )}
    </Card>
  );
};

export default PostsList;
