import { FC } from "react";
import ProjectSectionHeader from "./ProjectSectionHeader";

const ProjectSectionTasks: FC = () => {
  return (
    <section className="flex flex-col gap-5">
      <ProjectSectionHeader
        first="Временные затраты"
        second="Задача"
        third="Длительностьв"
      />
      <div className="w-full h-[1px] bg-gray" />
      <section>
        <img src="../img/circle.png" />
      </section>
    </section>
  );
};

export default ProjectSectionTasks;
