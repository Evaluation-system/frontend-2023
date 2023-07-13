import ProjectPhaseHeader from "./ProjectPhaseHeader";
import { FC, useState, Fragment, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
//React-Chart-Js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import { IPhaseTask } from "types/types";
import { addTask } from "store/tasks/taskSlice";
import {
  useDeletePhaseTaskMutation,
  useGetPhaseTasksQuery,
} from "api/phase.api";
import { useGetProjectQuery } from "api/project.api";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: number;
  numberPhase: number;
  projectId: number;
};

const ProjectPhaseMain: FC<Props> = ({ numberPhase, id, projectId }) => {
  const employeeSectionList = useAppSelector((state) => state.project.employee);
  //Получение поля "Задачи"

  const dispatch = useAppDispatch();

  //Для показа формы при нажатии на кнопку "Добавить задачу"
  const [openForm, setOpenForm] = useState(false);

  const phaseId = Number(id);

  const [deletePhaseTask, response] = useDeletePhaseTaskMutation();

  // -----------------------------------------------------

  const {
    isLoading: isLoadingTasks,
    data: dataTasks,
    error: errorTasks,
  } = useGetPhaseTasksQuery(phaseId);

  const taskListRedux = useAppSelector((state) => state.tasker.tasks);

  const priceListRedux = taskListRedux.map((item) => item.price);

  const {
    isLoading: isLoadingProject,
    data: dataProject,
    error: errorProject,
  } = useGetProjectQuery(projectId);

  const data = {
    labels: dataTasks?.task,
    datasets: [
      {
        label: "Размер",
        data: dataProject?.price,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="flex flex-col gap-5">
      <ProjectPhaseHeader numberPhase={numberPhase} id={id} />
      <div className="w-full h-[1px] bg-gray" />
      <section className="grid grid-cols-5">
        {/* График */}
        <div className="w-64 h-64 col-span-2">
          <Pie data={data} />
        </div>
        <section className="col-span-3">
          <ul className="flex flex-col gap-3">
            {dataTasks?.map((item, index) => (
              <Fragment key={index}>
                <li className="grid grid-cols-6 justify-center items-center">
                  <p className="flex col-span-2">{item.task}</p>
                  <p className="col-span-2">{item.duration}</p>
                  <div className="flex justify-between col-span-2">
                    <p>{item.price} &#8381;</p>
                    <span onClick={() => deletePhaseTask(item.id)}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </li>
                <div className="w-full h-[1px] bg-gray" />
              </Fragment>
            ))}
            <button
              className="text-blue text-end"
              onClick={(): void => setOpenForm(!openForm)}
            >
              Добавить задачу
            </button>
          </ul>
          <ProjectPhaseForm
            openForm={openForm}
            setOpenForm={setOpenForm}
            id={id}
          />
        </section>
      </section>
    </section>
  );
};

export default ProjectPhaseMain;
