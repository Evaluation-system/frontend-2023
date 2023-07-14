import * as yup from "yup";
import Input from "components/ui/Input";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePhaseTaskMutation } from "api/phase.api";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  id: number;
};

type Form = {
  titleTask: string;
  descriptionTask: string;
  countTask: string;
  roleEmployee: string;
  startTask: string;
  endTask: string;
};

const ProjectPhaseForm: FC<Props> = ({ id }) => {
  const schema = yup.object({
    titleTask: yup.string().required("Поле «Задача» обязательно"),
    descriptionTask: yup.string().required("Поле «Описание» обязательно"),
    countTask: yup
      .string()
      .required("Поле «Кол-во задач» обязательно")
      .matches(/^\d+$/, "Введенное значение должно быть число"),
    roleEmployee: yup.string().required("Поле «Роль исполняющего» обязательно"),
    startTask: yup
      .string()
      .required("Поле «Кол-во часов (от)» обязательно")
      .matches(/^\d+$/, "Введенное значение должно быть число")
      .test(
        "startTask",
        "Начальное время не может быть больше завершающего",
        function (value) {
          const endTask = this.parent.endTask;
          if (value && endTask) {
            return parseInt(value, 10) <= parseInt(endTask, 10);
          }
          return true;
        }
      ),
    endTask: yup
      .string()
      .required("Поле «Кол-во часов (до)» обязательно")
      .matches(/^\d+$/, "Введенное значение должно быть число"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({ resolver: yupResolver(schema), mode: "onChange" });

  const [createPhaseTask] = useCreatePhaseTaskMutation();

  const phaseId = Number(id);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    //Забираем поля из формы
    const {
      titleTask,
      descriptionTask,
      countTask,
      roleEmployee,
      startTask,
      endTask,
    } = data;

    //Вот сюда эти поля нужно вставить
    const taskPhase = {
      phaseId: phaseId,
      titleTask: titleTask,
      descriptionTask: descriptionTask,
      countTask: Number(countTask),
      roleEmployee: roleEmployee,
      starTask: Number(startTask),
      endTask: Number(endTask),
    };

    // dispatch(addEmployee(data));

    createPhaseTask(taskPhase);

    setOpenForm(!openForm);
    reset();
  };

  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <button
        className="text-blue text-end"
        onClick={(): void => setOpenForm(!openForm)}
      >
        Добавить задачу
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={openForm ? "flex flex-col gap-10" : "hidden"}
      >
        <section className="flex flex-col gap-5">
          <h3>Добавьте задачу:</h3>
          <Input
            bg="inherit"
            placeholder="Задача"
            id="titleTask"
            type="text"
            register={{ ...register("titleTask") }}
            errorMessage={errors.titleTask?.message}
          />
          <Input
            bg="inherit"
            placeholder="Описание"
            id="descriptionTask"
            type="text"
            register={{ ...register("descriptionTask") }}
            errorMessage={errors.descriptionTask?.message}
          />
          <div className="flex justify-between gap-6">
            <Input
              bg="inherit"
              placeholder="Кол-во задач"
              id="countTask"
              type="text"
              register={{ ...register("countTask") }}
              errorMessage={errors.countTask?.message}
            />
            <Input
              bg="inherit"
              placeholder="Роль исполняющего"
              id="roleEmployee"
              type="text"
              register={{ ...register("roleEmployee") }}
              errorMessage={errors.roleEmployee?.message}
            />
            <Input
              bg="inherit"
              placeholder="Кол-во часов (от)"
              id="starTask"
              type="text"
              register={{ ...register("startTask") }}
              errorMessage={errors.startTask?.message}
            />
            <Input
              bg="inherit"
              placeholder="Кол-во часов (до)"
              id="endTask"
              type="text"
              register={{ ...register("endTask") }}
              errorMessage={errors.endTask?.message}
            />
          </div>
        </section>
        <button
          type="submit"
          className="mt-10 p-5 rounded-full border-secondary border-2"
        >
          Добавить
        </button>
      </form>
    </>
  );
};

export default ProjectPhaseForm;
