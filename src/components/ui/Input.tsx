import { FC } from "react";

type Props = {
  id: string;
  placeholder: string;
  type: string;
  register: any;
};

const Input: FC<Props> = ({ id, placeholder, type, register }) => {
  return <input id={id} placeholder={placeholder} type={type} {...register} />;
};

export default Input;
