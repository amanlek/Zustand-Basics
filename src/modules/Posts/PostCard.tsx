import { Card, Typography, Space, Tag, Popconfirm, Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  MessageTwoTone,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { Post } from "@/types/post";
import { useDeletePost, useUpdatePost } from "@/modules/Posts/usePosts";

const { Title, Text, Paragraph } = Typography;

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  return (
    <Card
      hoverable
      style={{
        marginBottom: 16,
        borderRadius: 12,
      }}
      bodyStyle={{ padding: 16 }}
    >
      {/* TITLE */}
      <Title level={5} style={{ marginBottom: 8 }}>
        {post.title}
      </Title>

      {/* BODY */}
      <Paragraph
        ellipsis={{ rows: 2 }}
        style={{ color: "#555", marginBottom: 12 }}
      >
        {post.body}
      </Paragraph>

      {
        <Space size={[0, 8]} wrap style={{ marginBottom: 12 }}>
          {post.tags.map((tag) => (
            <Tag key={tag} color="blue">
              #{tag}
            </Tag>
          ))}

          <Button
            icon={<EditOutlined />}
            onClick={() =>
              updatePostMutation.mutate({
                id: post.id,
                data: {
                  title: post.title + " (Updated)",
                },
              })
            }
            loading={updatePostMutation.isPending}
          >
            Update
          </Button>
        </Space>
      }

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #f0f0f0",
          paddingTop: 10,
        }}
      >
        <Space size="middle">
          <Text>
            <LikeOutlined /> {post.reactions?.likes}
          </Text>

          <Text>
            <DislikeOutlined /> {post.reactions?.dislikes}
          </Text>
        </Space>

        {/* Comments */}
        <Text style={{ color: "#1890ff", cursor: "pointer" }}>
          View <MessageTwoTone />
        </Text>
      </div>

      <Popconfirm
        title="Delete this post?"
        onConfirm={() => deletePostMutation.mutate(post.id)}
      >
        <Button
          danger
          icon={<DeleteOutlined />}
          loading={deletePostMutation.isPending}
        />
      </Popconfirm>
    </Card>
  );
};

export default PostCard;
