import ProjectPhaseHeader from "./ProjectPhaseHeader";
import { FC } from "react";
import { FiTrash2 } from "react-icons/fi";
import { PiNotePencilFill } from "react-icons/pi";
import { toast } from "react-hot-toast";
import { useDeletePhaseTaskMutation } from "api/phase.api";

type Props = {
  item: any;
};

const ProjectPhaseTask: FC<Props> = ({ item }) => {
  const [deletePhaseTask, response] = useDeletePhaseTaskMutation();

  const handleDeletePhaseTask = (id: number) => {
    deletePhaseTask(id);
    toast.success("Задача удалена");
  };
  return (
    <section className="flex flex-col gap-5">
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
        {/* <button
          className="flex gap-2 text-gree items-center justify-end"
          onClick={() => handleDeletePhaseTask(item.id)}
        >
          Редактировать задачу <PiNotePencilFill />
        </button> */}
        <button
          className="flex gap-2 text-red items-center justify-end mt-10"
          onClick={() => handleDeletePhaseTask(item.id)}
        >
          Удалить задачу <FiTrash2 />
        </button>
      </div>

      <div className="w-full h-[1px] bg-[#535c68]" />
    </section>
  );
};

export default ProjectPhaseTask;
