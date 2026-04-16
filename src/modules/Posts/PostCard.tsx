import { Card, Typography, Space, Tag, Popconfirm, Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  MessageTwoTone,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import type { Post } from "@/modules/Posts/post";
import { useDeletePost, useUpdatePost } from "@/modules/Posts/usePosts";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useCallback } from "react";

const { Title, Text, Paragraph } = Typography;

interface Props {
  post: Post;
}

//react memo to prevent unnecessary re-renders when parent component updates but post props hasn't changed
const PostCard = React.memo(({ post }: Props) => {   
  const role = useAuthStore((state) => state.user?.role);

  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleUpdate = useCallback(() => {  
    updatePostMutation.mutate({
      id: post.id,
      data: {
        title: post.title + " (Updated)",
      },
    });
  }, [updatePostMutation, post.id, post.title]);

   const handleDelete = useCallback(() => {
     deletePostMutation.mutate(post.id);
   }, [deletePostMutation, post.id]);

   console.log("Rendered card:", post.id);
  const memoizedTags = React.useMemo(() => {
   
    return (post.tags || []).map((tag) => (
      <Tag key={tag} color="blue">
        #{tag}
      </Tag>
    ));
  }, [post.tags]);

  return (
    <Card
      hoverable
      style={{
        marginBottom: 16,
        borderRadius: 12,
      }}
      bodyStyle={{ padding: 16 }}
    >
      <Title level={5} style={{ marginBottom: 8 }}>
        {post.title}
      </Title>

      <Paragraph
        ellipsis={{ rows: 2 }}
        style={{ color: "#555", marginBottom: 12 }}
      >
        {post.body}
      </Paragraph>

      <Space wrap>{memoizedTags}</Space>

        {role === "admin" && (
          <Button
            icon={<EditOutlined />}
            onClick={handleUpdate}
            loading={updatePostMutation.isPending}
          >
            Update
          </Button>
        )}

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

        <Text style={{ color: "#1890ff", cursor: "pointer" }}>
          View <MessageTwoTone />
        </Text>
      </div>

      {role === "admin" && (
        <div style={{ marginTop: 10 }}>
          <Popconfirm
            title="Delete this post?"
            onConfirm={handleDelete}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={deletePostMutation.isPending}
            />
          </Popconfirm>
        </div>
      )}
    </Card>
  );
});



export default PostCard;
