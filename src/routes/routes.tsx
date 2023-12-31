import ErrorPage from "pages/ErrorPage";
import Homepage from "pages/Homepage";
import Layout from "components/layout/Layout";
import Login from "pages/Login";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import ProjectPage from "pages/Project/ProjectPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Registartion from "pages/Registartion";
import TestProfile from "pages/TestProfile";
import { createBrowserRouter } from "react-router-dom";
import CreateProject from "pages/CreateProject";

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
            <ProjectPage />
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
