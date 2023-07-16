import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IPhaseTask } from "types/types";
import { BsFillBarChartFill } from "react-icons/bs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  dataTasks: IPhaseTask;
};
const AreaChart: FC<Props> = ({ dataTasks }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    width: 200,
    height: 200,
  };
  console.log(dataTasks);
  const labels = dataTasks.map((task) => task.titleTask);
  const countTask = dataTasks.map((task) => task.countTask);
  const backgroundColors = ["rgba(77, 9, 232, 1.0)", "rgba(247, 37, 133, 1.0)"];

  const data = {
    labels,
    datasets: [
      {
        label: "Кол-во подобных заданий",
        data: countTask,
        backgroundColor: backgroundColors,
        borderRadius: 20,
        paddingBottom: 100,
      },
    ],
  };
  return (
    <section className="w-full h-[440px] bg-[#0A0D10] p-5 rounded-3xl">
      <header>
        <h3 className="flex gap-4 items-center">
          <BsFillBarChartFill />
          Задачи
        </h3>
        <span>График указывает количество подобных подзадач в задании</span>
      </header>
      <Bar options={options} data={data} className="pb-10 p-5" />
    </section>
  );
};

export default AreaChart;
