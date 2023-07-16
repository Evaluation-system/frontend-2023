import * as yup from "yup";
import Input from "components/ui/Input";
import Modal from "components/ui/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditPhaseTaskMutation } from "api/phase.api";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicForm from "./DynamicForm";

type Props = {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  numberTask: number;
  openForm: boolean;
};
type Form = {
  titleTask: string | undefined;
  descriptionTask: string | undefined;
  countTask: string | undefined;
  roleEmployee: string | undefined;
  starTask: string | undefined;
  endTask: string | undefined;
};
const ProjectPhaseTaskEditForm: FC<Props> = ({
  numberTask,
  setOpenForm,
  openForm,
}) => {
  const schema = yup.object({
    titleTask: yup.string(),
    descriptionTask: yup.string(),
    countTask: yup
      .string()
      .matches(/^\d+$/, "Введенное значение должно быть число"),
    roleEmployee: yup.string(),
    starTask: yup
      .string()
      .matches(/^\d+$/, "Введенное значение должно быть число")
      .test(
        "starTask",
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
      .matches(/^\d+$/, "Введенное значение должно быть число"),
  });

  //React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({ resolver: yupResolver(schema), mode: "onChange" });

  //Хук RTK-Query для изменнеия задания
  const [editPhaseTask] = useEditPhaseTaskMutation();

  //Функция редактирования задания
  const onSubmit: SubmitHandler<Form> = (data) => {
    const {
      titleTask,
      descriptionTask,
      countTask,
      roleEmployee,
      starTask,
      endTask,
    } = data;

    const newEditTask = {
      id: Number(numberTask),
      patch: {
        titleTask: titleTask,
        descriptionTask: descriptionTask,
        countTask: Number(countTask),
        roleEmployee: roleEmployee,
        starTask: Number(starTask),
        endTask: Number(endTask),
      },
    };
    setOpenForm(false);
    editPhaseTask(newEditTask);
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
      name: "starTask",
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
            fields={fields}
            onSubmit={onSubmit}
            schema={schema}
            headerText="Изменить задачу"
            setOpenForm={setOpenForm}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectPhaseTaskEditForm;
