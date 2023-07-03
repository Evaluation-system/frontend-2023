import { FC } from "react";
import { BiTrash } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { removeTask } from "../../store/tasks/taskSlice";

type TypeTask = {
  title: string;
  value: number;
};

const TaskList: FC = () => {
  const task: TypeTask[] = useAppSelector((state) => state.tasker.tasks);
  const dispatch = useAppDispatch();

  return (
    <section className="flex flex-col gap-3">
      {task.map((item) => (
        <>
          <section className="grid grid-cols-2 justify-between">
            <p>{item.title}</p>
            <div className="flex justify-between items-center">
              <span>{item.value} &#8381; </span>
              <span onClick={() => dispatch(removeTask(item.title))}>
                <BiTrash />
              </span>
            </div>
          </section>
          <div className="w-full h-[1px] bg-gray " />
        </>
      ))}
    </section>
  );
};

export default TaskList;
