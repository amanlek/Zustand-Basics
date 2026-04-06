import useTodos from "@/modules/Todos/useTodos";
import TodoItem from "@/modules/Todos/TodoItem";
import { Card, Typography, Space, Spin, Empty } from "antd";

const { Title } = Typography;

const TodosList = () => {
  const { data, isLoading } = useTodos();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const todos = data?.todos || [];

  return (
    <Card style={{ borderRadius: 12 }} bodyStyle={{ padding: 20 }}>
      {/* Title */}
      <Title level={4} style={{ marginBottom: 16 }}>
        Todos
      </Title>

      {/* Empty State */}
      {todos.length === 0 ? (
        <Empty description="No Todos Available" />
      ) : (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </Space>
      )}
    </Card>
  );
};

export default TodosList;
