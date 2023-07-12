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

  //RTK
  const {
    isLoading: isLoadingProject,
    data: dataProject,
    error: errorProject,
  } = useGetProjectQuery(id);
  const [editProject] = useEditProjectMutation();
  const [addProjectImage] = useAddProjectImageMutation();

  // const {
  //   isLoading: isLoadingImage,
  //   data: dataImage,
  //   error: errorImage,
  // } = useGetProjectImageQuery(id);

  // console.log("dataImage");
  // console.log(dataImage);

  // console.log("id");
  // console.log(id);

  // console.log("dataProject");
  // console.log(dataProject);

  const onSubmit: SubmitHandler<TypeForm> = async (data) => {
    const { newTitle, newDescription } = data;

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

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const addProjectImageData = {
        projectId: id,
        data: formData,
      };

      addProjectImage(addProjectImageData);
    }
  };

  return (
    <>
      {isLoadingProject ? (
        <p>Идёт загрузка данных...</p>
      ) : dataProject ? (
        <section className="p-5 container">
          <Toaster />
          <ProjectHeader
            project={dataProject}
            photo={`http://localhost:3005/projects/image/${id}`}
            setOpenModal={setOpenModal}
            openModal={openModal}
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
