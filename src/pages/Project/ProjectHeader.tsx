import Avatar from "components/ui/Avatar";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { IProject } from "types/types";
import ProjectEditField from "components/Forms/ProjectEditField";
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";

type Props = {
  photo: string | undefined;
  project: IProject;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleImage: any;
};

const ProjectHeader: FC<Props> = ({
  project,
  photo,
  setOpenModal,
  handleImage,
}) => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  return (
    <header className="flex flex-col justify-between gap-10 p-4 mb-12">
      <div className="flex gap-5 items-center ">
        {project.pathImage ? (
          <Avatar photo={photo} avatarRef={avatarRef} />
        ) : (
          <Avatar avatarRef={avatarRef} />
        )}

        <div className="flex flex-col gap-2 max-w-xl">
          <ProjectTitle title={project.title} setOpenModal={setOpenModal} />
          <ProjectDescription description={project.description} />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={avatarRef}
          />
        </div>
      </div>
      <section className="flex flex-col gap-3 xl:flex-row xl:gap-20">
        <ProjectEditField project={project} />
      </section>
    </header>
  );
};

export default ProjectHeader;
