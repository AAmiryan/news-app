import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { lazy } from "react";

const LogIn = lazy(() => import("../pages/LogIn"));
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const News = lazy(() => import("../pages/News"));

export const routers = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/private",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/private/news",
        element: <News />,
      },
    ],
  },
]);
