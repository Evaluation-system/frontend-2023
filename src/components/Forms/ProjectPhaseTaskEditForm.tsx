import * as yup from "yup";
import Input from "components/ui/Input";
import Modal from "components/ui/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditPhaseTaskMutation } from "api/phase.api";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  openForm: Dispatch<SetStateAction<boolean>>;
  numberTask: number;
};
type Form = {
  titleTask: string | undefined;
  descriptionTask: string | undefined;
  countTask: string | undefined;
  roleEmployee: string | undefined;
  starTask: string | undefined;
  endTask: string | undefined;
};
const ProjectPhaseTaskEditForm: FC<Props> = ({ openForm, numberTask }) => {
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

  return (
    <Modal>
      <header className="flex justify-between items-center">
        <h4>Изменить задачу</h4>
        <span onClick={(): void => openForm(false)} className="cursor-pointer">
          <AiOutlineClose />
        </span>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <section className="flex flex-col gap-8">
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
          </div>
          <div className="flex justify-between gap-6">
            <Input
              bg="inherit"
              placeholder="Кол-во часов (от)"
              id="starTask"
              type="text"
              register={{ ...register("starTask") }}
              errorMessage={errors.starTask?.message}
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
          Изменить
        </button>
      </form>
    </Modal>
  );
};

export default ProjectPhaseTaskEditForm;
