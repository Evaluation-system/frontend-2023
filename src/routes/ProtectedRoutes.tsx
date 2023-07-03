import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";

type Props = {
  children: JSX.Element;
};

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const isAuth = useAuth();
  return <>{isAuth ? children : <Login />}</>;
};

export default ProtectedRoutes;
