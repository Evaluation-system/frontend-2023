import { FC } from "react";
import { phaseTaskHeader } from "data/ProjectPhase";

type Props = {
  numberTask: number;
};

const ProjectPhaseTaskHeader: FC<Props> = ({ numberTask }) => {
  return (
    <header className=" grid grid-cols-9 items-center gap-4 text-primary font-normal text-sm">
      {phaseTaskHeader.map((item) => (
        <p
          className={
            item.id === 1
              ? "col-span-2"
              : item.id === 2
              ? "col-span-2 text-center"
              : "text-center"
          }
        >
          {item.title === "Задача"
            ? item.title + " №" + numberTask
            : item.title}
        </p>
      ))}
    </header>
  );
};

export default ProjectPhaseTaskHeader;
