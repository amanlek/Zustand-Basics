import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./modules/Users/UserDetails";
import PostsList from "./modules/Posts/PostsList";
import TodosList from "./modules/Todos/TodosList";
import UsersList from "./modules/Users/UsersList";
import AppLayout from "./components/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
            <AppLayout>
              <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/posts" element={<PostsList />} />
                <Route path="/todos" element={<TodosList />} />
              </Routes>
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
