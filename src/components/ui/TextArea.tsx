import { FC } from "react";

type Props = {
  id: string;
  placeholder: string;
  errorMessage: any;
  register: any;
};

const TextArea: FC<Props> = ({ id, placeholder, errorMessage, register }) => {
  return (
    <>
      <textarea id={id} placeholder={placeholder} {...register} />
      <p className="text-red">{errorMessage}</p>
    </>
  );
};

export default TextArea;
