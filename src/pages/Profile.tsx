import { Flex, Typography } from "antd";
import "./style.scss";

const { Title } = Typography;

const Profile = () => {
  return (
    <Flex justify="center" className="profile-container">
      <Title>My Profile</Title>
    </Flex>
  );
};

export default Profile;
