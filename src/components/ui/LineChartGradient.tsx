import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IPhaseTask } from "types/types";
import { BsFillBarChartFill } from "react-icons/bs";
import { PointElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

type Props = {
  dataTasks: IPhaseTask[];
};

const LineChartGradient: FC<Props> = ({ dataTasks }) => {
  const data = {
    labels: [1, 2, 3, 4],
    datasets: [
      {
        label: "Кол-во подобных заданий",
        data: [1, 2, 30, 14, 15, 43, 7],
        backgroundColor: "rgba(77, 9, 232, 1.0)",
        borderColor: "rgba(77, 9, 232, 1.0)",
        borderWidth: 2,
        pointRadius: 0, // Отключение отображения точек данных
        tension: 0.4, // Напряжение кривой Безье (от 0 до 1)
        fill: true, // Отключение заливки под графиком
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
      <div className="w-full">
        <Line data={data} className="pb-10 p-5 w-[900px]" />
      </div>
    </section>
  );
};

export default LineChartGradient;
