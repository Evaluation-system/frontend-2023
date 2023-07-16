import * as yup from "yup";

import { FC, SetStateAction, Dispatch } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePhaseTaskMutation } from "api/phase.api";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicForm from "./DynamicForm";
import Modal from "components/ui/Modal";

type Props = {
  id: number;
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

type Form = {
  titleTask: string;
  descriptionTask: string;
  countTask: string;
  roleEmployee: string;
  startTask: string;
  endTask: string;
};

const ProjectPhaseForm: FC<Props> = ({ id, setOpenForm, openForm }) => {
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
    const {
      titleTask,
      descriptionTask,
      countTask,
      roleEmployee,
      startTask,
      endTask,
    } = data;

    const taskPhase = {
      phaseId: phaseId,
      titleTask: titleTask,
      descriptionTask: descriptionTask,
      countTask: Number(countTask),
      roleEmployee: roleEmployee,
      starTask: Number(startTask),
      endTask: Number(endTask),
    };
    setOpenForm(false);
    createPhaseTask(taskPhase);
    reset();
  };
  const fields = [
    {
      placeholder: "Название задачи",
      name: "titleTask",
    },
    {
      placeholder: "Описание задачи",
      name: "descriptionTask",
    },
    {
      placeholder: "Кол-во задач",
      name: "countTask",
    },
    {
      placeholder: "Роль исполняющего",
      name: "roleEmployee",
    },
    {
      placeholder: "Кол-во часов (от)",
      name: "startTask",
    },
    {
      placeholder: "Кол-во часов (до)",
      name: "endTask",
    },
  ];
  return (
    <>
      {openForm && (
        <Modal>
          <DynamicForm
            onSubmit={onSubmit}
            fields={fields}
            schema={schema}
            headerText="Новая задача"
            setOpenForm={setOpenForm}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectPhaseForm;
