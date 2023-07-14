import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import ProjectPhaseMetric from "components/Forms/ProjectPhaseMetric";
import ProjectPhaseTask from "./ProjectPhaseTask";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useDeletePhaseMutation } from "api/phase.api";
import { useGetPhaseTasksQuery } from "api/phase.api";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: number;
  numberPhase: number;
  projectId: number;
};

const ProjectPhaseMain: FC<Props> = ({ numberPhase, id, projectId }) => {
  const phaseId = Number(id);

  const {
    isLoading: isLoadingTasks,
    data: dataTasks,
    error: errorTasks,
  } = useGetPhaseTasksQuery(phaseId);

  const [deletePhase] = useDeletePhaseMutation();

  const deletePhaseHandler = (id: number) => {
    deletePhase(id);
    toast.success("Фаза удалена");
  };

  return (
    <section className="flex flex-col gap-5">
      <h4 className="flex items-center gap-3 col-span-2">
        Фаза №{numberPhase}{" "}
        <span
          className="text-red cursor-pointer"
          onClick={() => deletePhaseHandler(id)}
        >
          <RiDeleteBinLine />
        </span>
      </h4>
      <div className="w-full h-[1px] bg-gray" />
      <section className="flex flex-col gap-7">
        {dataTasks?.map((item: any) => (
          <ProjectPhaseTask key={item.id} item={item} />
        ))}
        <section className="flex flex-col gap-5">
          <h4>Метрики: </h4>
          <ul>
            <li>QA %:</li>
            <li>PM/AM %:</li>
            <li>Bugs %:</li>
            <li>Risks %:</li>
          </ul>
        </section>
      </section>
      <section className="flex flex-col gap-5 justify-end">
        <ProjectPhaseForm id={id} />
        <ProjectPhaseMetric />
      </section>
    </section>
  );
};

export default ProjectPhaseMain;
