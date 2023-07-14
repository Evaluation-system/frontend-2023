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

  return (
    <>
      {isLoadingProject ? (
        <p>Идёт загрузка данных...</p>
      ) : dataProject ? (
        <section className="p-5 container">
          <ProjectHeader
            project={dataProject}
            photo={dataImage}
            setOpenModal={setOpenModal}
            openModal={openModal}
            handleImage={handleImage}
          />
          <ProjectPhaseTabs id={id} dataProjectId={dataProject?.id} />
        </section>
      ) : errorProject ? (
        <div>Произошла ошибка</div>
      ) : (
        <p className="text-center text-secondary opacity-50 m-40">Ничего нет</p>
      )}

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
