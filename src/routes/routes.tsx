import CreateProject from "../pages/CreateProject";
import EditProfiel from "../pages/EditProfiel";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import Layout from "../components/layout/Layout";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";
import Projectpage from "../pages/Projectpage";
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
        path: "project",
        element: <Projectpage />,
      },
      {
        path: "create",
        element: <CreateProject />,
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
    ],
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "edit",
    element: <EditProfiel />,
  },
]);
