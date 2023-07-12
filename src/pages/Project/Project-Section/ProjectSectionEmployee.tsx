import Input from "../../../components/ui/Input";
import ProjectSectionHeader from "./ProjectSectionHeader";
import { addEmployee } from "../../../store/projects/projectSlice";
import { FC, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
//React-Chart-Js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { instance } from "../../../api/axios.api";

type Form = {
  employee: string;
  salary: number;
};
ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectSectionEmployee: FC = () => {
  const { register, handleSubmit, reset } = useForm<Form>();

  //Пока суем в редакс, потом перевести на CRUD.
  const dispatch = useAppDispatch();

  //Фукнция отправки данных на сервер
  const onSubmit: SubmitHandler<Form> = (data) => {
    //Диспатчит в редакс пока что
    dispatch(addEmployee(data));
    //Закрывает и очищает форму

    instance.post("employee-payments", { data });
    setOpenForm(!openForm);
    reset();
  };

  const employeeSectionList = useAppSelector((state) => state.project.employee);
  //Получение поля "Размер выплаты"
  const salaries = employeeSectionList.map((item) => item.salary);
  //Получение поля "Сотрудник"
  const employeeName = employeeSectionList.map((item) => item.employee);

  const data = {
    labels: employeeName,
    datasets: [
      {
        label: "Размер",
        data: salaries,
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
  //Для показа формы при нажатии на кнопку "Добавить задачу"
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="flex flex-col gap-5">
      <ProjectSectionHeader
        first="Выплаты сотрудникам"
        second="Исполнитель"
        third="Размер выплаты"
      />
      <div className="w-full h-[1px] bg-gray" />
      <section className="grid grid-cols-2">
        {/* График */}
        <div className="w-64 h-64">
          <Pie data={data} />
        </div>
        <section className="flex flex-col gap-10">
          <ul className="flex flex-col gap-3">
            {/* //
            Выводим список из редакса
            // */}
            {employeeSectionList.map((item) => (
              <>
                <li className="grid grid-cols-2 justify-between items-center">
                  <p>{item.employee}</p>
                  <div className="flex justify-between">
                    <p>{item.salary} &#8381;</p>
                    <span>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </li>
                <div className="w-full h-[1px] bg-gray" />
              </>
            ))}
            {/* //Открывает форму */}
            <button
              className="text-blue text-end"
              onClick={(): void => setOpenForm(!openForm)}
            >
              Добавить задачу
            </button>
          </ul>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={openForm ? "flex flex-col gap-5" : "hidden"}
          >
            <Input
              bg="inherit"
              placeholder="Сотрудник"
              id="employee"
              type="text"
              register={{ ...register("employee") }}
            />
            <Input
              bg="inherit"
              placeholder="Размер выплаты"
              id="salary"
              type="number"
              register={{ ...register("salary") }}
            />
            <button type="submit">Добавить</button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default ProjectSectionEmployee;
