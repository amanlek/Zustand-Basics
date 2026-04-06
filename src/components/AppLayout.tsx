import {Layout, Menu, Typography, Avatar, Space} from "antd";
import {
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useStore } from "../store/useStore";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, type ReactNode } from "react";


const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme); 

  
  return (
    <Layout
      style={{
        minHeight: "100vh",
        color: theme === "light" ? "#001529" : "#fff",
        background: theme === "light" ? "#fff" : "#001529",
      }}
    >
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{
          background: theme === "light" ? "#fff" : "#001529",
          color: theme === "light" ? "#001529" : "#fff",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo / Title */}
        <div
          style={{
            padding: "20px 16px",
            fontSize: 18,
            fontWeight: 600,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: theme === "light" ? "#fff" : "#37393b",
            color: theme === "light" ? "#001529" : "#fff",
          }}
        >
          <MenuOutlined /> <Text style={{ fontSize: 20 }}>My Dashboard</Text>
        </div>

        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            borderRight: 0,
            background: theme === "light" ? "#fff" : "#001529",
            color: theme === "light" ? "#001529" : "#fff",
          }}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link to="/">Users</Link>,
            },
            // {
            //   key: "/posts",
            //   icon: <FileTextOutlined />,
            //   label: <Link to="/posts">Posts</Link>,
            // },
            // {
            //   key: "/todos",
            //   icon: <CheckSquareOutlined />,
            //   label: <Link to="/todos">Todos</Link>,
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        <Header
          style={{
            background: theme === "light" ? "#fff" : "#37393b",
            color: theme === "light" ? "#001529" : "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Dashboard
          </Title>

          <Space>
            <Button type="primary" onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
</Button>

            <Text>Welcome, User</Text>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            margin: 20,
            background: theme === "light" ? "#fff" : "#001529",
          }}
        >
          <div
            style={{
              background: theme === "light" ? "#fff" : "#37393b",
              color: theme === "light" ? "#001529" : "#fff",
              padding: 20,
              borderRadius: 12,
              minHeight: "calc(100vh - 120px)",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
