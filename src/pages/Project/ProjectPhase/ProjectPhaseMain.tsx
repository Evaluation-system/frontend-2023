import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import ProjectPhaseMetric from "./ProjectPhaseMetric";
import ProjectPhaseMetricForm from "components/Forms/ProjectPhaseMetricForm";
import ProjectPhaseTask from "./ProjectPhaseTask";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { FC, useEffect } from "react";
import { useGetPhaseTasksQuery } from "api/phase.api";
import ProjectPhaseHeader from "./ProjectPhaseHeader";

import ProjectPhaseAdditionalInfo from "./ProjectPhaseAdditionalInfo";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: number;
  numberPhase: number;
};

const ProjectPhaseMain: FC<Props> = ({ numberPhase, id }) => {
  const phaseId = Number(id);

  //Получение задач
  const {
    isLoading: isLoadingTasks,
    data: dataTasks,
    error: errorTasks,
  } = useGetPhaseTasksQuery(phaseId);

  //Подсчитывают кол-во дней для решения задачи
  const totalEndTask: number | undefined = dataTasks
    ? dataTasks.reduce((acc, item) => acc + item.endTask, 0)
    : 0;

  const totalStartTask: number | undefined = dataTasks
    ? dataTasks.reduce((acc, item) => acc + item.starTask, 0)
    : 0;

  const totalDays: number | undefined = Math.round(
    (totalEndTask - totalStartTask) / 24
  );

  return (
    <section className="flex flex-col gap-5">
      <div className="w-full h-[1px] bg-gray" />
      <ProjectPhaseHeader numberPhase={numberPhase} id={id} />
      <section className="grid grid-cols-4 gap-10">
        {dataTasks?.map((item: any, index: number) => (
          <section key={item.id} className="relative group ">
            <ProjectPhaseTask
              item={item}
              numberTask={index + 1}
              numTsk={item.id}
            />
          </section>
        ))}
      </section>
      <ProjectPhaseMetric phaseId={phaseId} />
      <ProjectPhaseAdditionalInfo
        totalDays={totalDays}
        totalTasks={dataTasks?.length}
      />
      <section className="flex flex-col gap-5 justify-end">
        <ProjectPhaseForm id={id} />
        <ProjectPhaseMetricForm phaseId={phaseId} />
      </section>
    </section>
  );
};

export default ProjectPhaseMain;
