import { FC } from "react";

type Props = {
  numberPhase: number;
};

const ProjectSectionHeader: FC<Props> = ({ numberPhase }) => {
  return (
    <header className="grid grid-cols-5 items-center">
      <h4 className="grid col-span-2">Фаза №{numberPhase}</h4>
      <p className="text-gray text-lg">Задача</p>
      <p className="text-gray text-lg">Длительность</p>
      <p className="text-gray text-lg">Стоимость</p>
    </header>
  );
};

export default ProjectSectionHeader;
