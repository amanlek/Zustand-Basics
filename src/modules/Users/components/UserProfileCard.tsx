import { Card, Avatar, Typography, Button } from "antd";
import { HomeTwoTone, PhoneTwoTone } from "@ant-design/icons";
import defaultUser from "@/assets/profile-image.webp";
// import type { User } from "@/modules/Users/users";
import { useAppStore } from "@/store/useAppStore";
// import { getProfileApi } from "@/modules/Auth/authService";
// import { useQuery } from "@tanstack/react-query";
// import { useAuthStore } from "@/store/useAuthStore";
import type { User } from "../users";
// import useUserContext from "./useUserContext";

const { Title, Text, Paragraph } = Typography;


const UserProfileCard = ({ user }: { user?: User | null}) => {
  // const token = useAuthStore((state) => state.accessToken);
  const { count, increment, decrement } = useAppStore();
  

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
          {user.address?.postalCode} <br />
          {user?.role}
        </Paragraph>
      </div>
      <p>{count}</p>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>

      <br />
    </Card>
  );
};

export default UserProfileCard;
