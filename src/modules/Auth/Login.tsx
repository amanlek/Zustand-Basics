import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Space,
  message,
  Checkbox,
} from "antd";
import { getProfileApi, loginApi } from "@/modules/Auth/authService";

const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!username || !password) {
      message.error("Please enter username and password");
      return;
    }
    try {
      // console.log(username, password);
      const res = await loginApi(username, password);

      // console.log("Login API Response:", res);

      const { refreshToken, accessToken } = res;

      useAuthStore.setState({ accessToken });

      const userData = await getProfileApi();

      const userWithRole = {
        ...userData,
        role: userData.role ?? "user",
      };

      login(accessToken, refreshToken, userWithRole, rememberMe);

      // console.log(userData.role);
      message.success("Login successful");
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // console.log("AXIOS ERROR:", err);

        message.error(
          err.response?.data?.message || err.message || "Login failed",
        );
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 350, textAlign: "center" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>Login</Title>

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="large"
          />

          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
          />
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember Me
            </Checkbox>
          </div>
          <Button type="primary" size="large" block onClick={handleLogin}>
            Login
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
