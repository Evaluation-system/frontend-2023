import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineClose } from "react-icons/ai";
import Input from "components/ui/Input";

interface IFields {
  placeholder: string;
  name: string;
}

type Props = {
  onSubmit: any;
  schema: any;
  fields: IFields[];
  headerText: string;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

const DynamicForm: FC<Props> = ({
  onSubmit,
  schema,
  fields,
  headerText,
  setOpenForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleFormSubmit = async (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <section className="flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <h4>{headerText}</h4>
        <span className="cursor-pointer" onClick={() => setOpenForm(false)}>
          <AiOutlineClose />
        </span>
      </header>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5"
      >
        <section className="flex flex-col gap-8">
          {fields.map((field) => (
            <Input
              key={field.name}
              bg="inherit"
              placeholder={field.placeholder}
              id={field.name}
              type="text"
              register={{ ...register(field.name) }}
              errorMessage={errors[field.name]?.message}
            />
          ))}
        </section>
        <button
          type="submit"
          className="mt-10 p-5 rounded-full border-secondary border-2"
        >
          Добавить
        </button>
      </form>
    </section>
  );
};

export default DynamicForm;
