import { FC, ReactNode } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

type Props = {
  text: string;
  style: string;
  icon?: ReactNode;
  action?: string;
  paddingX?: string;
};

const Button: FC<Props> = ({ text, style, icon, action, paddingX }) => {
  const navigate = useNavigate();
  return <span>fdsf</span>;
};

export default Button;
