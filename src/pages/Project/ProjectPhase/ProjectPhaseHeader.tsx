import { FC } from "react";

const ProjectPhaseHeader: FC = () => {
  return (
    <header className="relative">
      <div className="absolute w-full bg-[#c7ecee] h-14 opacity-10 blur-lg" />
      <header className="relative grid grid-cols-9 items-center gap-4 text-secondary font-bold text-lg">
        <p className="col-span-2">Задача</p>
        <p className="col-span-2">Описание</p>
        <p className="text-center">Кол-во задач</p>
        <p className="col-span-2 text-center">Роль исполняющего</p>
        <p className="text-center">Кол-во часов (от)</p>
        <p className="text-center">Кол-во часов (до)</p>
      </header>
    </header>
  );
};

export default ProjectPhaseHeader;
