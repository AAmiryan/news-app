import { Button, Flex, Layout } from "antd";
import { pages } from "../../constants";
import { IPage } from "../../types";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const { Header: AntdHeader } = Layout;

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticate = localStorage.getItem("isAuthenticated");

  const handleLogOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AntdHeader className="header">
      <Flex justify="space-between" className="container">
        <Flex align="center" justify="center" gap={16}>
          {pages.map((page: IPage) => (
            <Button
              type="text"
              key={page.path}
              onClick={() =>
                navigate(
                  isAuthenticate && page.private ? page.private : page.path
                )
              }
            >
              {page.title}
            </Button>
          ))}
        </Flex>
        <Flex align="center" justify="center">
          {!isAuthenticate ? (
            <Button type="text" onClick={() => navigate("/log-in")}>
              Login
            </Button>
          ) : (
            <Button type="text" onClick={handleLogOut}>
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </AntdHeader>
  );
};
