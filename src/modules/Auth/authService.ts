import api from "../../api/baseApiInstance";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const getProfileApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const loginApi = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 60,
  });
  return res.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {
    refreshToken,
    expiresInMins: 60,
  });
  return res.data;
};