import { FC, Dispatch, SetStateAction } from "react";
import { BiEdit } from "react-icons/bi";

type Props = {
  title: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const ProjectTitle: FC<Props> = ({ title, setOpenModal }) => {
  return (
    <div className="flex flex-col">
      <span className="text-gray text-sm ">Название проекта: </span>
      <div className="flex gap-2 items-center">
        <h2 className="overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h2>
        <span className="pt-1" onClick={(): void => setOpenModal(true)}>
          <BiEdit />
        </span>
      </div>
    </div>
  );
};

export default ProjectTitle;
