import { FC } from "react";

type Props = {
  first: string;
  second: string;
  third: string;
};

const ProjectSectionHeader: FC<Props> = ({ first, second, third }) => {
  return (
    <header className="grid grid-cols-4 items-center">
      <h4 className="grid col-span-2">{first}</h4>
      <p className="text-gray text-lg">{second}</p>
      <p className="text-gray text-lg">{third}</p>
    </header>
  );
};

export default ProjectSectionHeader;
