import { Layout, Menu, Typography, Avatar, Space, Tooltip } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
  LogoutOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { useAppStore } from "../store/useAppStore";
import { Button } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

// interface Props {
//   children: ReactNode;
// }

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useAppStore();
  const { logout, user } = useAuthStore();
  const role = user?.role;
  const menuItems = useMemo(
    () => [
      {
        key: "/",
        icon: <UserOutlined />,
        label: <Link to="/">Profile</Link>,
      },
      ...(role === "admin"
        ? [
            {
              key: "/users",
              icon: <UserOutlined />,
              label: <Link to="/users">Users</Link>,
            },
          ]
        : []),
      {
        key: "/posts",
        icon: <FileTextOutlined />,
        label: <Link to="/posts">Posts</Link>,
      },
      ...(role !== "user"
        ? [
            {
              key: "/todos",
              icon: <CheckSquareOutlined />,
              label: <Link to="/todos">Todos</Link>,
            },
          ]
        : []),
    ],
    [role],
  );
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: theme === "light" ? "#f5f5f5" : "#0f172a",
        color: theme === "light" ? "#001529" : "#e2e8f0",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{
          background: theme === "light" ? "#fff" : "#020617",
          position: "sticky",
          top: 0,
          height: "100vh",
          borderRight:
            theme === "light" ? "1px solid #f0f0f0" : "1px solid #1e293b",
        }}
      >
        <div
          style={{
            padding: "18px 16px",
            fontSize: 18,
            fontWeight: 600,
            borderBottom:
              theme === "light" ? "1px solid #f0f0f0" : "1px solid #1e293b",
            background: theme === "light" ? "#fff" : "#020617",
            color: theme === "light" ? "#001529" : "#e2e8f0",
          }}
        >
          <MenuOutlined />{" "}
          <Text
            style={{
              fontSize: 18,
              color: theme === "light" ? "#001529" : "#e2e8f0",
            }}
          >
            My Dashboard
          </Text>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[
            location.pathname === "/"
              ? "/"
              : `/${location.pathname.split("/")[1]}`,
          ]}
          theme={theme === "dark" ? "dark" : "light"}
          style={{
            borderRight: 0,
            background: theme === "light" ? "#fff" : "#020617",
            color: theme === "light" ? "#001529" : "#fff",
          }}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: theme === "light" ? "#ffffff" : "#0f172a",
            borderBottom: `1px solid ${theme === "light" ? "#f1f5f9" : "#1e293b"}`,
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 100,
            height: 60,
          }}
        >
          <Text
            strong
            style={{
              fontSize: 16,
              color: theme === "light" ? "#0f172a" : "#f1f5f9",
            }}
          >
            Dashboard
          </Text>

          <Space size={8} align="center">
            <Tooltip
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <Button
                type="text"
                icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                onClick={toggleTheme}
                style={{ color: theme === "light" ? "#64748b" : "#94a3b8" }}
              />
            </Tooltip>

            {user && (
              <>
                <Avatar
                  size={32}
                  style={{
                    background: "#3b82f6",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "default",
                  }}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>

                <Text
                  style={{
                    fontSize: 13,
                    color: theme === "light" ? "#374151" : "#cbd5e1",
                  }}
                >
                  {user.username}
                </Text>

                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  style={{ color: theme === "light" ? "#64748b" : "#94a3b8" }}
                />
              </>
            )}

            {!user && (
              <Button type="text" style={{ fontSize: 13 }}>
                Login
              </Button>
            )}
          </Space>
        </Header>

        <Content
          style={{
            margin: 20,
            background: theme === "light" ? "#f5f5f5" : "#0f172a",
          }}
        >
          <div
            style={{
              background: theme === "light" ? "#fff" : "#1e293b",
              color: theme === "light" ? "#001529" : "#e2e8f0",
              padding: 20,
              borderRadius: 12,
              minHeight: "calc(100vh - 120px)",
              boxShadow:
                theme === "light"
                  ? "0 2px 8px rgba(0,0,0,0.05)"
                  : "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
