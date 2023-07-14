import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import ProjectPhaseMetric from "./ProjectPhaseMetric";
import ProjectPhaseMetricForm from "components/Forms/ProjectPhaseMetricForm";
import ProjectPhaseTask from "./ProjectPhaseTask";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useDeletePhaseMutation } from "api/phase.api";
import { useGetPhaseTasksQuery } from "api/phase.api";
import ProjectPhaseHeader from "./ProjectPhaseHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: number;
  numberPhase: number;
  projectId: number;
};

const ProjectPhaseMain: FC<Props> = ({ numberPhase, id, projectId }) => {
  const phaseId = Number(id);

  //Получение задач
  const {
    isLoading: isLoadingTasks,
    data: dataTasks,
    error: errorTasks,
  } = useGetPhaseTasksQuery(phaseId);

  return (
    <section className="flex flex-col gap-5">
      <div className="w-full h-[1px] bg-gray" />
      <ProjectPhaseHeader numberPhase={numberPhase} id={id} />
      <section className="flex flex-col gap-7">
        {dataTasks?.map((item: any, index: number) => (
          <ProjectPhaseTask key={item.id} item={item} numberTask={index + 1} />
        ))}
      </section>
      <ProjectPhaseMetric phaseId={phaseId} />
      <section className="flex flex-col gap-5 justify-end">
        <ProjectPhaseForm id={id} />
        <ProjectPhaseMetricForm phaseId={phaseId} />
      </section>
    </section>
  );
};

export default ProjectPhaseMain;
