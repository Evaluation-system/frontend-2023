import { FC, useState } from "react";
import ProjectSectionHeader from "./ProjectSectionHeader";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/ui/Input";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { addEmployee } from "../../../store/projects/projectSlice";

const ProjectSectionEmployee: FC = () => {
  const { register, handleSubmit } = useForm();

  //Пока суем в редакс, потом перевести на CRUD.
  const dispatch = useAppDispatch();

  //Фукнция отправки данных на сервер
  const onSubmit = (data) => {
    dispatch(addEmployee(data));
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
        <img src="../img/circle.png" />
        <section className="flex flex-col gap-10">
          <ul className="flex flex-col gap-3">
            <li className="grid grid-cols-2 justify-between">
              <p>Непрямые расходы</p>
              <div className="flex justify-between">
                <p>190 000Р</p>
                <p>Удалить</p>
              </div>
            </li>
            <div className="w-full h-[1px] bg-gray" />

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
