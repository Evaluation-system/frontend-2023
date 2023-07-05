import { FC } from "react";

type Props = {
  id: string;
  placeholder: string;
  type: string;
  register: any;
  errorMessage: any;
};

const Input: FC<Props> = ({
  id,
  placeholder,
  type,
  register,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-0">
      <input id={id} placeholder={placeholder} type={type} {...register} />
      <p className="text-red">{errorMessage}</p>{" "}
    </div>
  );
};

export default Input;
