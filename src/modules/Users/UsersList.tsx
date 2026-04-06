import { Card, Row, Col, Spin, Avatar, Typography, Space, Tag, Button } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useUsers from "@/modules/Users/hooks/useUsers";
import type { User } from "@/types/users";
import { useStore } from "@/store/useStore";



const { Title, Text } = Typography;

const UsersList = () => {
  const { data, isLoading } = useUsers();
  const navigate = useNavigate();
const { count, increment, decrement } = useStore();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        {(data?.users || []).map((user: User) => (
          <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
            <Card
              hoverable
              onClick={() => navigate(`/users/${user.id}`)}
              style={{
                height: "100%",
                borderRadius: 12,
                transition: "0.3s",
                padding: 2,
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {/* Avatar + Name */}
                <Space align="center">
                  <Avatar size={48} icon={<UserOutlined />} />
                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      {user.firstName} {user.lastName}
                    </Title>
                    <Text type="secondary">
                      <MailOutlined /> {user.email}
                    </Text>
                  </div>
                </Space>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #f0f0f0" }} />

                {/* Footer Info */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tag color="blue">User ID: {user.id}</Tag>

                  <Text style={{ color: "#1890ff" }}>View →</Text>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <p>{count}</p>
<Button onClick={increment}>+</Button>
<Button onClick={decrement}>-</Button>
      
    </>
  );
};

export default UsersList;
