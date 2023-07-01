import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  text: string;
  style: string;
  icon?: ReactNode;
  action?: string;
  paddingX?: string;
};

const Button: FC<Props> = ({ text, style, icon, action, paddingX }) => {
  return (
    <NavLink
      to={`${action}`}
      className={style}
      style={{ paddingLeft: paddingX, paddingRight: paddingX }}
    >
      {icon}
      {text}
    </NavLink>
  );
};

export default Button;
