import { FC, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useDeletePhaseTaskMutation } from "api/phase.api";
import { IPhaseTask } from "types/types";
import { motion, AnimatePresence } from "framer-motion";
import ProjectPhaseTaskEditForm from "components/Forms/ProjectPhaseTaskEditForm";
import { AiOutlineEdit } from "react-icons/ai";

type Props = {
  item: IPhaseTask;
  numberTask: number;
};

const ProjectPhaseTask: FC<Props> = ({ item, numberTask }) => {
  const [deletePhaseTask] = useDeletePhaseTaskMutation();

  const handleDeletePhaseTask = (id: number) => {
    deletePhaseTask(id);
    toast.success("Задача удалена");
  };
  const [openTask, setOpenTask] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  return (
    <>
      {openEditForm ? (
        <ProjectPhaseTaskEditForm openForm={setOpenEditForm} />
      ) : (
        ""
      )}
      <section
        className="p-6 rounded-xl borderd-primary border-[1px] border-solid cursor-pointer relative overflow-hidden"
        onClick={() => setOpenTask(!openTask)}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-900 via-transparent to-transparent mix-blend-multiply" />

        <header>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray">Задача №{numberTask}</span>
              <div className="flex gap-5">
                <span
                  className="relative z-50"
                  onClick={(): void => setOpenEditForm(!openEditForm)}
                >
                  <AiOutlineEdit />
                </span>
                <span
                  onClick={(): void => handleDeletePhaseTask(item.id)}
                  className="relative z-50"
                >
                  <FiTrash2 />
                </span>
              </div>
            </div>

            <p className="text-lg font-geo font-medium">{item.titleTask}</p>
          </div>
          <div>
            <span className="text-xs text-gray">Описание:</span>
            <p className="text-lg font-geo font-normal">
              {item.descriptionTask}
            </p>
          </div>
        </header>
        <AnimatePresence>
          {openTask && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div>
                <span className="text-xs text-gray">Кол-во задач: </span>
                <p className="text-lg font-geo font-medium">{item.countTask}</p>
              </div>
              <div>
                <span className="text-xs text-gray">Роль исполняющего: </span>
                <p className="text-lg font-geo font-medium">
                  {item.roleEmployee}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray">Кол-во часов (от): </span>
                <p className="text-lg font-geo font-medium">{item.starTask}</p>
              </div>
              <div>
                <span className="text-xs text-gray">Кол-во часов (до): </span>
                <p className="text-lg font-geo font-medium">{item.endTask}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default ProjectPhaseTask;
