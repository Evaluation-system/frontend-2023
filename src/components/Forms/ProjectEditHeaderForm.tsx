import * as yup from "yup";
import Input from "components/ui/Input";
import Modal from "components/ui/Modal";
import TextArea from "components/ui/TextArea";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditProjectMutation } from "api/project.api";

type Props = {
  projectId: string | undefined;
  openModal: boolean;
  setOpenModal: any;
};
type TypeForm = {
  newTitle: string;
  newDescription: string;
};
const ProjectEditHeaderForm: FC<Props> = ({
  openModal,
  setOpenModal,
  projectId,
}) => {
  //Валидация полей
  const schema = yup.object({
    newTitle: yup.string().required("Поле «Новое название» обязательно"),
    newDescription: yup.string().required("Поле «Новое описание» обязательно"),
  });

  //Деструктуризация react-hook-form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  //RTK-Query изменение проекта
  const [editProject] = useEditProjectMutation();

  //Функция для отправки на сервер
  const onSubmit: SubmitHandler<TypeForm> = async (data) => {
    const { newTitle, newDescription } = data;

    const editProjectPatch = {
      id: projectId,
      patch: {
        title: newTitle,
        description: newDescription,
      },
    };
    editProject(editProjectPatch);

    reset();
    setOpenModal(!openModal);
    toast.success("Проект отредактирован");
  };
  return (
    <Modal text="Изменить проект">
      <header className="flex justify-between items-center">
        <h3>Изменить проект</h3>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          placeholder="Новое название"
          id="newTitle"
          type="text"
          register={{ ...register("newTitle") }}
          errorMessage={errors.newTitle?.message}
        />
        <TextArea
          placeholder="Новое описание"
          id="newDescription"
          register={{ ...register("newDescription") }}
          errorMessage={errors.newDescription?.message}
        />
        <div className="flex gap-5 justify-center">
          <button className="btn" onClick={(): void => setOpenModal(false)}>
            Закрыть
          </button>
          <input type="submit" className="btnGradient" value="Подтвердить" />
        </div>
      </form>
    </Modal>
  );
};

export default ProjectEditHeaderForm;
