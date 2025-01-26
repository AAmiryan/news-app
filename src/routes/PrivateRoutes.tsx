import { Flex, Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import "./styled.scss";

const PrivateRoutes = () => {  
  const isAuthenticate = localStorage.getItem("isAuthenticated");
  if (!isAuthenticate) {
    return <Navigate to={"/log-in"} />;
  }

  return (
    <Layout>
      <Header />
      <Content className="content">
        <Suspense
          fallback={
            <Flex className="spin-container" align="center" justify="center">
              <Spin size="large" />
            </Flex>
          }
        >
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

export default PrivateRoutes;
