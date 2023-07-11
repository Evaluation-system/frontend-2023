import * as yup from "yup";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { instance } from "../../api/axios.api";
import { IProject } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "react-hot-toast";
import EditProject from "../../components/ui/EditProject";
import ProjectHeader from "./ProjectHeader";
import ProjectSection from "./Project-Section/ProjectSection";
import ProjectSectionPricing from "./Project-Section/ProjectSectionPricing";
import ProjectSectionTasks from "./Project-Section/ProjectSectionTasks";
import ProjectSectionEmployee from "./Project-Section/ProjectSectionEmployee";
import {
  useGetProjectQuery,
  useEditProjectMutation,
  useAddProjectImageMutation,
  useGetProjectImageQuery,
} from "../../api/project.api";

type TypeForm = {
  newTitle: string;
  newDescription: string;
};

const Projectpage: FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<IProject | null>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const schema = yup.object({
    newTitle: yup.string().required("Поле «Новое название» обязательно"),
    newDescription: yup.string().required("Поле «Новое описание» обязательно"),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  // const fetchProject = async () => {
  //   const response = await instance.get(`projects/${id}`);
  //   console.log(response.data, "😊");
  //   setProject(response.data);
  // };
  // useEffect(() => {
  //   fetchProject();
  // }, []);

  //RTK
  const {
    isLoading: isLoadingProject,
    data: dataProject,
    error: errorProject,
  } = useGetProjectQuery(id);
  const [editProject] = useEditProjectMutation();
  const [addProjectImage] = useAddProjectImageMutation();
  const {
    isLoading: isLoadingImage,
    data: dataImage,
    error: errorImage,
  } = useGetProjectImageQuery(id);

  console.log("dataImage");
  console.log(dataImage);

  console.log("id");
  console.log(id);

  console.log("dataProject");
  console.log(dataProject);

  const onSubmit: SubmitHandler<TypeForm> = async (data) => {
    const { newTitle, newDescription } = data;

    // await instance.patch(`projects/${id}`, {
    //   title: newTitle,
    //   description: newDescription,
    // });

    // setProject({
    //   ...project,
    //   title: newTitle,
    //   description: newDescription,
    // });

    const editProjectPatch = {
      id: id,
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

  //Сюда вставляется фото
  const [selectImage, setSelectImage] = useState<File | undefined>();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file);
  };

  //Функция загрузки файла на сервер
  const handleUploadImage = async () => {
    //Проверяем наличие файла
    if (!selectImage) {
      alert("Выберите фотографию");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectImage);

    const addProjectImageData = {
      projectId: id,
      data: formData,
    };

    addProjectImage(addProjectImageData);

    // try {
    //   const formData = new FormData();
    //   formData.append("file", selectImage);

    //   //Выполняем запрос
    //   await instance.post(`projects/upload-image/${project?.id}`, formData);
    //   await fetchProject();
    // } catch (error) {
    //   console.log("Ошибка" + error);
    // }
  };

  // //Сюда вставляем фото полученное с сервера
  // const [photo, setPhoto] = useState<string | undefined>("");
  // //Получаем фото с сервера
  // useEffect(() => {
  //   const fetchPhoto = async () => {
  //     console.log("photo", project);
  //     if (project) {
  //       const response = await instance.get(`projects/image/${project.id}`);
  //       const { baseURL, url } = response.config;
  //       setPhoto(baseURL! + url!);
  //     }
  //   };
  //   fetchPhoto();
  // }, [project]);

  // console.log("photo");
  // console.log(photo);

  return (
    <>
      {isLoadingProject ? (
        <p>Идёт загрузка данных...</p>
      ) : dataProject ? (
        <section className="p-5 container">
          <Toaster />
          <ProjectHeader
            project={dataProject}
            photo={dataImage}
            setOpenModal={setOpenModal}
            openModal={openModal}
            handleUploadImage={handleUploadImage}
            handleImage={handleImage}
          />
          <section className="flex flex-col gap-10">
            <ProjectSectionPricing />
            <ProjectSectionTasks />
            <ProjectSectionEmployee />
          </section>
        </section>
      ) : errorProject ? (
        <div>Произошла ошибка</div>
      ) : (
        <p className="text-center text-secondary opacity-50 m-40">Ничего нет</p>
      )}

      {/* {project && (
        <section className="p-5 container">
          <Toaster />
          <ProjectHeader
            project={project}
            photo={photo}
            setOpenModal={setOpenModal}
            openModal={openModal}
            handleUploadImage={handleUploadImage}
            handleImage={handleImage}
          />
          <section className="flex flex-col gap-10">
            <ProjectSectionPricing />
            <ProjectSectionTasks />
            <ProjectSectionEmployee />
          </section>
        </section>
      )} */}

      {openModal ? (
        <EditProject
          registerInput={{ ...register("newTitle") }}
          registerTextArea={{ ...register("newDescription") }}
          errorMessageTextArea={errors.newDescription?.message}
          errorMessageInput={errors.newTitle?.message}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setOpenModal={setOpenModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Projectpage;
