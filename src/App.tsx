import "./App.css";
import { Route, Routes } from "react-router-dom";

// import TodosList from "./modules/Todos/TodosList";
// import UsersList from "./modules/Users/components/UsersList";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import UserProfileCard from "./modules/Users/components/UserProfileCard";
// import UsersList from "./modules/Users/components/UsersList";
import Login from "./modules/Auth/Login";
import Unauthorized from "./pages/Unauthorized";
import Profile from "./pages/Profile";
import React, { Suspense } from "react";
import { Spin } from "antd";
const UserDetails = React.lazy(
  () => import("./modules/Users/components/UserDetails"),
);
const PostsList = React.lazy(
  () => import("./modules/Posts/PostsList")
);
const UsersList = React.lazy(
  () => import("./modules/Users/components/UsersList"),
);
const TodosList = React.lazy(
  () => import("./modules/Todos/TodosList")
);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route
                path="users"
                element={
                  <Suspense fallback={<Spin size="large" />}>
                    <UsersList />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="posts"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 100,
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  }
                >
                  <PostsList />
                </Suspense>
              }
            />

            <Route
              element={<ProtectedRoute allowedRoles={["admin", "moderator"]} />}
            >
              <Route
                path="todos"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 100,
                        }}
                      >
                        <Spin size="large" />
                      </div>
                    }
                  >
                    <TodosList />
                  </Suspense>
                }
              />
              <Route
                path="users/:id"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 100,
                        }}
                      >
                        <Spin size="large" />
                      </div>
                    }
                  >
                    <UserDetails />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
