import { Dispatch, FC, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/ui/Input";
import { useAppDispatch } from "store/hooks/hooks";
import { addEmployee } from "store/projects/projectSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { instance } from "api/axios.api";

type Props = {
  id: number;
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

type Form = {
  task: string;
  duration: number;
  price: number;
};

const ProjectPhaseForm: FC<Props> = ({ openForm, setOpenForm, id }) => {
  const schema = yup.object({
    task: yup.string().required("Поле «Задача» обязательно"),
    duration: yup
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

  const phaseId = Number(id);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { task, duration, price } = data;

    const taskPhase = {
      phaseId: phaseId,
      task: task,
      duration: duration,
      price: price,
    };

    dispatch(addEmployee(data));

    await instance.post("/phase-tasks", taskPhase);

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
        register={{ ...register("duration") }}
        errorMessage={errors.duration?.message}
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
