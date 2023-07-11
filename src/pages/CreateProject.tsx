import * as yup from "yup";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import TextArea from "../components/ui/TextArea";
import { FC, useRef, useState, ChangeEvent } from "react";
import { RiImageEditFill } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import { TfiClose } from "react-icons/tfi";
import { useAppSelector } from "../store/hooks/hooks";
import {
  useCreateProjectMutation,
  useAddProjectImageMutation,
} from "../api/project.api";
import { useNavigate } from "react-router";
import { useUpdateRoleMutation } from "../api/api";
import { yupResolver } from "@hookform/resolvers/yup";

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
    imageProject: yup.object(),
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
  const [addProjectImage] = useAddProjectImageMutation();

  // --- ДЛЯ КАРТИНКИ ---
  //Сюда вставляется фото
  const [selectImage, setSelectImage] = useState<File | undefined>();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file);
  };
  // --- ДЛЯ КАРТИНКИ ---

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { title, description } = data;

    const postData = {
      title: title,
      description: description,
      UserId: user?.id,
    };

    return createProject(postData)
      .then((response) => {
        console.log("response");
        console.log(response);

        const projectId = response?.data?.id;

        console.log("projectId");
        console.log(projectId);

        const formData = new FormData();

        if (selectImage) {
          formData.append("file", selectImage);
        }

        const addProjectImageData = {
          projectId: projectId,
          data: formData,
        };

        console.log("formData");
        console.log(formData);
        console.log("addProjectImageData.data");
        console.log(addProjectImageData.data);

        // ВЫДАЧА РОЛИ АДМИНА (временно)
        // const rolePatch = {
        //   id: user?.id,
        //   patch: { role: "admin" },
        // };
        // updateRole(rolePatch);

        addProjectImage(addProjectImageData);
      })
      .then(() => navigate("/profile"))
      .then(() => reset());
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
        // fetcher={async (action) => {
        //   const response = await fetch(action);
        //   console.log("response:");
        //   console.log(response);
        // }}
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
            onChange={handleImage}
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
