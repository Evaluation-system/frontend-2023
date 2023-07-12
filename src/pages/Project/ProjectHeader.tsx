import Avatar from "../../components/ui/Avatar";
import { BiEdit } from "react-icons/bi";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { IProject } from "../../types/types";
import ProjectEditField from "./ProjectEditField";

type Props = {
  photo: string | undefined;
  project: IProject;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  handleImage: any;
};

const ProjectHeader: FC<Props> = ({
  project,
  photo,
  setOpenModal,
  openModal,
  handleImage,
}) => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  return (
    <header className="flex flex-col justify-between gap-10 p-4 mb-12">
      <div className="flex gap-5 items-center ">
        {project.pathImage ? (
          <Avatar photo={photo} avatarRef={avatarRef.current} />
        ) : (
          <Avatar avatarRef={avatarRef.current} />
        )}

        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex gap-5 items-center">
            <h2 className="overflow-hidden whitespace-nowrap text-ellipsis">
              {project.title}
            </h2>
            <span
              className="pt-1"
              onClick={(): void => setOpenModal(!openModal)}
            >
              <BiEdit />
            </span>
          </div>

          <p className="text-gray overflow-hidden text-ellipsis line-clamp-4">
            {project.description}
          </p>

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
