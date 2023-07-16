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
    <div className="relative ">
      <input
        id={id}
        type={type}
        {...register}
        style={{ backgroundColor: bg }}
        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={id}
        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 -top-0 z-10 origin-[0] left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 whitespace-nowrap "
      >
        {placeholder}
      </label>
      <p className="text-red">{errorMessage}</p>{" "}
    </div>
  );
};

export default Input;
