import TaskList from "./TaskList";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FC, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useAppDispatch } from "../../store/hooks/hooks";
import { addTask } from "../../store/tasks/taskSlice";
import axios from "axios";

type Form = {
  title: string;
  value: number;
};

const ProjectSection: FC = () => {
  const [form, setForm] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<Form>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Form> = (data) => {
    const { title, value } = data;
    // dispatch(addTask(data));
    // ПЕРЕПИСАТЬ СЕРВИСЫ
    const response = axios.post("http://localhost:3005/tasks", {
      cost: title,
      value: value,
    });
    reset();
    toast.success("Задача добавлена");
  };

  return (
    <section className="flex flex-col gap-5 text-gray p-6">
      <Toaster />
      <header className="grid grid-cols-4">
        <span className="flex items-center gap-4 col-span-2">
          <p className="text-secondary">Ценообразование</p>
          <MdOutlineKeyboardArrowDown />
        </span>
        <p>Заложенные расходы</p>
        <p>Объем</p>
      </header>
      <div className="w-full h-[1px] bg-gray" />
      <section className="grid grid-cols-2">
        <img src="../img/circle.png" className="col-span-1" />
        <div className="flex flex-col gap-3">
          <TaskList />
          <button className="flex justify-end" onClick={() => setForm(!form)}>
            {form ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </button>
          <form
            className={form ? "flex flex-col gap-4" : "hidden"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input {...register("title")} placeholder="Название" />
            <input {...register("value")} placeholder="Объем" type="number" />
            <button className="text-secondary" type="submit">
              Добавить
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default ProjectSection;
