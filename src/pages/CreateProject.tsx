import * as yup from "yup";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import TextArea from "../components/ui/TextArea";
import { FC, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../store/hooks/hooks";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateRoleMutation } from "../api/api";
import { useCreateProjectMutation } from "../api/project.api";
import { TfiClose } from "react-icons/tfi";
import { RiImageEditFill } from "react-icons/ri";

type Form = {
  imageProject: any;
  title: string;
  description: string;
};

const CreateProject: FC = () => {
  //Валидация
  const schema = yup.object({
    title: yup.string().required("Поле «Название» обязательно"),
    description: yup.string().required("Поле «Описание» обязательно"),
  });
  //React-hook-form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();

  // Через новый АПИ
  const [createProject] = useCreateProjectMutation();
  const [updateRole] = useUpdateRoleMutation();

  const onSubmit: SubmitHandler<Form> = (data) => {
    const { title, description } = data;

    // Через новый АПИ
    const postData = {
      title: title,
      description: description,
      UserId: user?.id,
    };

    const rolePatch = {
      id: user?.id,
      patch: { role: "admin" },
    };

    createProject(postData);
    updateRole(rolePatch);

    console.log(postData);

    navigate("/profile");
    reset();
  };

  //Реф на кнопку загрузки проекта
  const refIconProject = useRef<HTMLInputElement | null>(null);
  //Функция клика по другому компоненту рефа
  const handleIconProject = () => refIconProject?.current?.click();
  return (
    <Modal text="Создать проект">
      <header className="flex justify-between items-center">
        <h3>Добро пожаловать</h3>
        <button onClick={() => navigate(-1)}>
          <TfiClose />
        </button>
      </header>
      <form
        className="flex flex-col gap-[50px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <p className="text-gray">Иконка проекта: </p>
          <span
            className="flex items-center gap-3 text-xl cursor-pointer"
            onClick={(): void => handleIconProject()}
          >
            <RiImageEditFill />
            Загрузить фото
          </span>
          <input
            {...register("imageProject")}
            type="file"
            className="hidden"
            ref={refIconProject}
          />
        </div>
        <Input
          id="title"
          placeholder="Название"
          type="text"
          register={{ ...register("title") }}
          errorMessage={errors.title?.message}
        />
        <TextArea
          id="description"
          placeholder="Описание"
          register={{ ...register("description") }}
          errorMessage={errors.description?.message}
        />
        <div className="flex gap-5 justify-center xl:gap-[33px] xl:justify-end">
          {/* <Button text="Назад" style="hidden xl:btn" action="/" /> */}
          <button type="submit" className="btnGradient">
            Создать
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProject;
