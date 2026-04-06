import { Routes, Route } from "react-router-dom";
import UsersList from "@/modules/Users/UsersList";
import UserDetails from "@/modules/Users/UserDetails";
import PostsList from "@/modules/Posts/PostsList";
import TodosList from "@/modules/Todos/TodosList";
import AppLayout from "@/components/AppLayout";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/todos" element={<TodosList />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
