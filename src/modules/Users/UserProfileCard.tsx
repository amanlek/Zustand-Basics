import { Card, Avatar, Typography, Button } from "antd";
import { HomeTwoTone, PhoneTwoTone } from "@ant-design/icons";
import defaultUser from "@/assets/profile-image.webp";
import type { User } from "@/types/users";
import { useStore } from "@/store/useStore";
// import useUserContext from "./useUserContext";

const { Title, Text, Paragraph } = Typography;

interface Props {
  user?: User;
}

const UserProfileCard = ({ user }: Props) => {  
  const { count, increment, decrement } = useStore();
  if (!user) return null;
  
  
  return (
    <Card>
      <div style={{ textAlign: "center" }}>
        <Avatar size={80} src={defaultUser} />

        <Title level={4} style={{ marginTop: 10, marginBottom: 4 }}>
          {user?.firstName} {user?.lastName}
        </Title>
        

        <Text type="secondary">{user?.email}</Text>
        <Paragraph style={{ marginTop: 10 }}>
          <PhoneTwoTone />
          {user.phone} <br />
          <HomeTwoTone /> - {user.address?.address}, <br />
          {user.address?.city}, {user.address?.state} -{" "}
          {user.address?.postalCode}
        </Paragraph>
      </div>
      <p>{count}</p>
<Button onClick={increment}>+</Button>
<Button onClick={decrement}>-</Button>
    </Card>
  );
};

export default UserProfileCard;
