import { FC } from "react";

type Props = {
  numberTask: number;
};

const ProjectPhaseTaskHeader: FC<Props> = ({ numberTask }) => {
  return (
    <header className=" grid grid-cols-9 items-center gap-4 text-secondary font-bold text-lg">
      <p className="col-span-2">Задача №{numberTask}</p>
      <p className="col-span-2">Описание</p>
      <p className="text-center">Кол-во задач</p>
      <p className="col-span-2 text-center">Роль исполняющего</p>
      <p className="text-center">Кол-во часов (от)</p>
      <p className="text-center">Кол-во часов (до)</p>
    </header>
  );
};

export default ProjectPhaseTaskHeader;
