import { FC } from "react";

type Props = {
  id: string;
  placeholder: string;
  errorMessage: any;
  register: any;
};

const TextArea: FC<Props> = ({ id, placeholder, errorMessage, register }) => {
  return (
    <div className="relative flex flex-col gap-1">
      <textarea id={id} {...register} />
      <label className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 -top-2 z-10 origin-[0] left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ">
        {placeholder}
      </label>
      <p className="text-red">{errorMessage}</p>
    </div>
  );
};

export default TextArea;
