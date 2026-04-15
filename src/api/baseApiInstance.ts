import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosHeaders } from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  
  if (config.url?.includes("/auth/login")) return config;

  const accessToken = useAuthStore.getState().accessToken;

  // console.log("Interceptor Token:", accessToken);
  if (accessToken) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // console.log("401 error");
      const originalRequest = error.config;
      const { refreshToken, rememberMe, logout, login, user } =
        useAuthStore.getState();

      if (rememberMe && refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await api.post("/auth/refresh", {
            refreshToken,
            expiresInMins: 60,
          });
          const newAccessToken = res.data.accessToken;

          login(newAccessToken, refreshToken, user!, rememberMe);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return api(originalRequest);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            logout();
            window.location.href = "/login";
          }
        }
      }

      logout();
      console.log("Logged out due to 401 and no remember me");
      window.location.href = "/login";
      return Promise.reject(error);
    }
  },
);

export default api;
