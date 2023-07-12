import { FC } from "react";

type Props = {
  id: string;
  placeholder: string | number;
  type: string;
  register: any;
  errorMessage: any;
  bg?: string | null;
};

const Input: FC<Props> = ({
  id,
  placeholder,
  type,
  register,
  errorMessage,
  bg = "#1B1B23",
}) => {
  return (
    <div className="flex flex-col gap-0">
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        {...register}
        style={{ backgroundColor: bg }}
      />
      <p className="text-red">{errorMessage}</p>{" "}
    </div>
  );
};

export default Input;
