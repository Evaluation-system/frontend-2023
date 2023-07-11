import { FC } from "react";
import ProjectSectionHeader from "./ProjectSectionHeader";

const ProjectSectionPricing: FC = () => {
  return (
    <section className="flex flex-col gap-5">
      <ProjectSectionHeader
        first="Ценообразование"
        second="Заложенные расходы"
        third="Объем"
      />
      <div className="w-full h-[1px] bg-gray" />
      <section>
        <img src="../img/circle.png" />
      </section>
    </section>
  );
};

export default ProjectSectionPricing;
