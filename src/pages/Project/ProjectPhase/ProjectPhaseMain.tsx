import ProjectPhaseHeader from "./ProjectPhaseHeader";
import { FC, Fragment } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppSelector } from "store/hooks/hooks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import {
  useDeletePhaseTaskMutation,
  useGetPhaseTasksQuery,
} from "api/phase.api";
import { useDeletePhaseMutation } from "api/phase.api";
import { toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import ProjectPhaseMetric from "components/Forms/ProjectPhaseMetric";
import { PiNotePencilFill } from "react-icons/pi";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: number;
  numberPhase: number;
  projectId: number;
};

const ProjectPhaseMain: FC<Props> = ({ numberPhase, id, projectId }) => {
  const phaseId = Number(id);

  const [deletePhaseTask, response] = useDeletePhaseTaskMutation();

  // -----------------------------------------------------

  const {
    isLoading: isLoadingTasks,
    data: dataTasks,
    error: errorTasks,
  } = useGetPhaseTasksQuery(phaseId);

  const taskListRedux = useAppSelector((state) => state.tasker.tasks);

  const [deletePhase] = useDeletePhaseMutation();

  const deletePhaseHandler = (id) => {
    deletePhase(id);
    toast.success("Фаза удалена");
  };

  const handleDeletePhaseTask = (id) => {
    deletePhaseTask(id);
    toast.success("Задача удалена");
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
        {dataTasks?.map((item) => (
          <Fragment key={item.id}>
            <div className="flex flex-col gap-4">
              <ProjectPhaseHeader />
              <div className="w-full h-[1px] bg-[#535c68]" />
              <section className="grid grid-cols-9 items-center gap-5 text-sm">
                <p className="col-span-2">{item.titleTask}</p>
                <p className="col-span-2">{item.descriptionTask}</p>
                <p className="text-center">{item.countTask}</p>
                <p className="col-span-2 text-center">{item.roleEmployee}</p>
                <p className="text-center">{item.starTask}</p>
                <p className="text-center">{item.endTask}</p>
              </section>
            </div>
            <div className="flex flex-col">
              <button
                className="flex gap-2 text-red items-center justify-end"
                onClick={() => handleDeletePhaseTask(item.id)}
              >
                Редактировать задачу <FiTrash2 />
              </button>
              <button
                className="flex gap-2 text-red items-center justify-end"
                onClick={() => handleDeletePhaseTask(item.id)}
              >
                Удалить задачу <FiTrash2 />
              </button>
            </div>

            <div className="w-full h-[1px] bg-[#535c68]" />
          </Fragment>
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
      <div className="flex flex-col gap-5 justify-end">
        <ProjectPhaseForm id={id} />
        <ProjectPhaseMetric />
      </div>
    </section>
  );
};

export default ProjectPhaseMain;
