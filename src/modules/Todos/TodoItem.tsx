import { Checkbox, Card, Typography, Tag } from "antd";
import type { Todo } from "@/types/todo";

const { Text } = Typography;

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  return (
    <Card
      hoverable
      style={{
        marginBottom: 10,
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-between",
        padding: "2px 6px",
        width: "80%",
      }}
    >
      
      <Checkbox checked={todo.completed}>
        <Text
          style={{
            marginLeft: 8,
            // textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#999" : "#000",
          }}
        >
          {todo.todo}
        </Text>
      </Checkbox>

      <Tag color={todo.completed ? "green" : "orange"}>
        {todo.completed ? "Completed" : "Pending"}
      </Tag>
    </Card>
  );
};

export default TodoItem;
