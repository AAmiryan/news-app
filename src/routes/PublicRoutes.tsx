

import { Flex, Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import "./styled.scss";

const PublicRoutes = () => {
  const isAuthenticate = localStorage.getItem("isAuthenticated");

  if (isAuthenticate) {
    return <Navigate to={"/profile"} />;
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

export default PublicRoutes;
