import CreateProject from "../pages/CreateProject";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import Layout from "../components/layout/Layout";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Projectpage from "../pages/Project/Projectpage";
import ProtectedRoutes from "./ProtectedRoutes";
import Registartion from "../pages/Registartion";
import TestProfile from "../pages/TestProfile";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "project/:id",
        element: (
          <ProtectedRoutes>
            <Projectpage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create",
        element: (
          <ProtectedRoutes>
            <CreateProject />
          </ProtectedRoutes>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registartion />,
      },
      {
        path: "test",
        element: <TestProfile />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
