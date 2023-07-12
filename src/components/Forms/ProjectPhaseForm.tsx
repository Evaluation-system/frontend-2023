import { Dispatch, FC, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/ui/Input";
import { useAppDispatch } from "store/hooks/hooks";
import { addEmployee } from "store/projects/projectSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

type Form = {
  task: string;
  time: number;
  price: number;
};

const ProjectPhaseForm: FC<Props> = ({ openForm, setOpenForm }) => {
  const schema = yup.object({
    task: yup.string().required("Поле «Задача» обязательно"),
    time: yup
      .number()
      .required("Поле «Длительность» обязательно")
      .typeError("Поле «Длительность» обязательно"),
    price: yup
      .number()
      .required("Поле «Стоимость» обязательно")
      .typeError("Поле «Стоимость» обязательно"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({ resolver: yupResolver(schema), mode: "onChange" });

  //Добавляет в стору
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Form> = (data) => {
    dispatch(addEmployee(data));
    setOpenForm(!openForm);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={openForm ? "flex flex-col gap-5" : "hidden"}
    >
      <Input
        bg="inherit"
        placeholder="Задача"
        id="employee"
        type="text"
        register={{ ...register("task") }}
        errorMessage={errors.task?.message}
      />
      <Input
        bg="inherit"
        placeholder="Длительность"
        id="salary"
        type="number"
        register={{ ...register("time") }}
        errorMessage={errors.time?.message}
      />
      <Input
        bg="inherit"
        placeholder="Стоимость"
        id="salary"
        type="number"
        register={{ ...register("price") }}
        errorMessage={errors.price?.message}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ProjectPhaseForm;
