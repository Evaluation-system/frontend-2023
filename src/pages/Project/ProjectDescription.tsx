import { FC } from "react";

type Props = {
  description: string;
};
const ProjectDescription: FC<Props> = ({ description }) => {
  return (
    <div>
      <span className="text-sm text-gray">Описание проекта: </span>
      <p className="overflow-hidden text-ellipsis line-clamp-4 text-xl ">
        {description}
      </p>
    </div>
  );
};

export default ProjectDescription;
