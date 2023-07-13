import * as yup from "yup";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "react-hot-toast";
import EditProject from "components/ui/EditProject";
import ProjectHeader from "./ProjectHeader";
import {
  useGetProjectQuery,
  useEditProjectMutation,
  useAddProjectImageMutation,
  useGetProjectImageQuery,
} from "api/project.api";
import ProjectPhaseMain from "./ProjectPhase/ProjectPhaseMain";
import { instance } from "api/axios.api";
import { IPhases } from "types/types";

type TypeForm = {
  newTitle: string;
  newDescription: string;
};

const ProjectPage: FC = () => {
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

  const handleAddPhase = async () => {
    try {
      await instance.post("/phase", {
        ProjectId: Number(id),
      });
      toast.success("Новая фаза добавлена");
    } catch (error) {
      console.log(error);
    }
  };

  const [wait, setWait] = useState<IPhases[] | null>(null);

  const NumberID = Number(id);

  useEffect(() => {
    const fetchPhases = async () => {
      const response = await instance.get<IPhases[] | null>(
        `phase/project/${NumberID}`
      );
      setWait(response.data);
    };
    fetchPhases();
  }, [dataProject]);

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
          <button className="pb-10 text-blue" onClick={() => handleAddPhase()}>
            Добавить фазу
          </button>
          <section className="flex flex-col gap-10">
            {wait?.map((item, index) => (
              <ProjectPhaseMain
                numberPhase={index + 1}
                key={item.id}
                id={item.id}
              />
            ))}
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

export default ProjectPage;
