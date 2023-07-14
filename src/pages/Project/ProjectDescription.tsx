import { FC } from "react";

type Props = {
  description: string;
};
const ProjectDescription: FC<Props> = ({ description }) => {
  return (
    <p className="text-gray overflow-hidden text-ellipsis line-clamp-4">
      {description}
    </p>
  );
};

export default ProjectDescription;
