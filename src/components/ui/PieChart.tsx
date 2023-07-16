import { FC } from "react";
import { IPhaseTask } from "types/types";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BsPieChartFill } from "react-icons/bs";

type Props = {
  dataTasks: IPhaseTask;
};
ChartJS.register(ArcElement, Tooltip);

const PieChart: FC<Props> = ({ dataTasks }) => {
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const datasets = dataTasks.map((task, index) => ({
    label: task.titleTask,
    data: [Math.ceil((task.endTask - task.starTask) / 24)],
    backgroundColor: [
      "rgba(0, 180, 216, 1)",
      "rgba(59, 0, 154, 1)",
      "rgba(86, 11, 173, 1)",
      "rgba(114, 9, 183, 1)",
      "rgba(181, 23, 158, 1)",
      "rgba(247, 37, 133, 1)",
    ][index % 6],
    borderWidth: 0,
  }));

  const data = {
    labels: [],
    datasets,
  };
  return (
    <section className="flex flex-col w-1/3 h-[440px] bg-[#0A0D10] p-5 rounded-3xl">
      <header>
        <h3 className="flex gap-4 items-center">
          <BsPieChartFill />
          Время
        </h3>
        <span>
          График указывает на кол-во дней, требующиеся на решение задачи
        </span>
      </header>
      <div className="flex mx-auto w-[300px] h-[300px] items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </section>
  );
};

export default PieChart;
