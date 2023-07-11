import { FC } from "react";
import ProjectSectionHeader from "./ProjectSectionHeader";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/ui/Input";

const ProjectSectionEmployee: FC = () => {
  const { register, handleSubmit } = useForm();
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

            <button className="text-blue text-end">Добавить задачу</button>
          </ul>
          <form className="flex flex-col gap-5">
            <Input />
            <Input />
          </form>
        </section>
      </section>
    </section>
  );
};

export default ProjectSectionEmployee;
