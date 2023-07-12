import { FC } from "react";
import { useAuth } from "hooks/useAuth";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const isAuth = useAuth();
  return <>{isAuth ? children : <Navigate to="/login" replace={true} />}</>;
};

export default ProtectedRoutes;
