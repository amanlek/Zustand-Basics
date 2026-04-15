import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./modules/Users/components/UserDetails";
import PostsList from "./modules/Posts/PostsList";
import TodosList from "./modules/Todos/TodosList";
// import UsersList from "./modules/Users/components/UsersList";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import UserProfileCard from "./modules/Users/components/UserProfileCard";
import UsersList from "./modules/Users/components/UsersList";
import Login from "./modules/Auth/Login";
import Unauthorized from "./pages/Unauthorized";
import Profile from "./pages/Profile";

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
              <Route path="users" element={<UsersList />} />
            </Route>

            <Route path="posts" element={<PostsList />} />

            <Route
              element={<ProtectedRoute allowedRoles={["admin", "moderator"]} />}
            >
              <Route path="todos" element={<TodosList />} />
              <Route path="users/:id" element={<UserDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
