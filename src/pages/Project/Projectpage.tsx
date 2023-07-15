import ProjectEditHeaderForm from "components/Forms/ProjectEditHeaderForm";
import ProjectHeader from "./ProjectHeader";
import ProjectPhaseTabs from "./ProjectPhase/ProjectPhaseTabs";
import { ChangeEvent, FC, useState } from "react";
import {
  useAddProjectImageMutation,
  useGetProjectImageQuery,
  useGetProjectQuery,
} from "api/project.api";
import { useParams } from "react-router";

const ProjectPage: FC = () => {
  //Id проекта
  const { id } = useParams();

  const [openModal, setOpenModal] = useState<boolean>(false);

  //RTK
  const {
    isLoading: isLoadingProject,
    data: dataProject,
    error: errorProject,
  } = useGetProjectQuery(id);

  const {
    isLoading: isLoadingImage,
    data: dataImage,
    error: errorImage,
  } = useGetProjectImageQuery(id);

  const [addProjectImage] = useAddProjectImageMutation();

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

  if (isLoadingProject) {
    return <p>Идёт загрузка данных...</p>;
  }

  if (errorProject) {
    const errorMessage =
      errorProject instanceof Error
        ? errorProject.message
        : "Произошла ошибка при загрузке метрики";
    return <p>{errorMessage}</p>;
  }

  if (!dataProject) {
    return <p>Данные проектов не найдены</p>;
  }
  return (
    <>
      <section className="p-5 containerMain mt-32">
        <ProjectHeader
          project={dataProject}
          photo={dataImage}
          setOpenModal={setOpenModal}
          handleImage={handleImage}
        />
        <ProjectPhaseTabs id={id} dataProjectId={dataProject?.id} />
      </section>
      {openModal ? (
        <ProjectEditHeaderForm
          openModal={openModal}
          setOpenModal={setOpenModal}
          projectId={id}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectPage;
