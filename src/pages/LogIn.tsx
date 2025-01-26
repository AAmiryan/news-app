import { useState } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { ILoginValues } from "../types/logIn";
import { useNavigate } from "react-router-dom";
import { generateFakeToken } from "../utils/fakeToken";
import "./style.scss";

const { Text } = Typography;

const LogIn = () => {
  const [isIncorrectData, setIsIncorrectData] = useState<string>("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: ILoginValues): void => {
    if (values.password === "12345" && values.username === "admin") {
      const fakeToken = generateFakeToken();
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", fakeToken);
      navigate("/profile");
    } else {
      setIsIncorrectData("Please enter correct username or password");
    }
  };

  return (
    <Flex justify="center" className="login-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="login-form"
      >
        <Flex vertical>
          <Form.Item name="username" label="Username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            normalize={(value: string): string => value.trim()}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {isIncorrectData ? (
            <Text type="danger">{isIncorrectData}</Text>
          ) : null}
          <Button type="primary" htmlType="submit" className="login-button">
            Login
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default LogIn;
