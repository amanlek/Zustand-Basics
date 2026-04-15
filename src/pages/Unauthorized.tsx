import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      }
    />
  );
};

export default Unauthorized;
