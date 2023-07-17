import ProjectPhaseMain from "./ProjectPhaseMain";
import { FC, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  useCreatePhaseMutation,
  useGetProjectPhasesQuery,
} from "api/phase.api";
import { IPhases } from "types/types";
import { motion } from "framer-motion";

type Props = {
  id: string | undefined;
  dataProjectId: any;
};

const ProjectPhaseTabs: FC<Props> = ({ id }) => {
  //Преобразование id в число
  const NumberID = Number(id);
  //Получение данных фазы из RTK-Query
  const {
    isLoading: isLoadingPhases,
    data: dataPhases,
    error: errorPhases,
  } = useGetProjectPhasesQuery(NumberID);

  //Создание фазы через RTK-Query
  const [createPhase] = useCreatePhaseMutation();
  //Табы, переключения между фазами
  const [toggleState, setToggleState] = useState(0);

  const handleAddPhase = () => {
    const createProjectData = {
      projectId: Number(id),
    };

    createPhase(createProjectData);
    toast.success("Новая фаза добавлена");
  };

  return (
    <>
      <Toaster />
      <button className="mb-10 text-blue" onClick={() => handleAddPhase()}>
        Добавить фазу
      </button>
      <section className="flex flex-col gap-10 w-full">
        <div>
          <div>
            {dataPhases?.length > 0 ? (
              <ul className="flex space-x-1 overflow-x-auto w-full items-center">
                {dataPhases?.map((item: IPhases, index: number) => (
                  <li
                    key={item.id}
                    onClick={(): void => setToggleState(index)}
                    className={`${
                      toggleState === index ? "" : "hover:opacity-50"
                    } relative rounded-full px-3 py-1.5 cursor-pointer min-w-[120px] text-center`}
                  >
                    {toggleState === index && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-secondary"
                        transition={{ duration: 1 }}
                      />
                    )}
                    <span className="relative z-10 mix-blend-exclusion">
                      {item.title || "Фаза № " + (1 + index)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div>Пока что вы не добавили фазы...</div>
            )}
          </div>
        </div>
        <section>
          {dataPhases?.map((item: IPhases, index: number) => (
            <section
              className={toggleState === index ? "" : "hidden"}
              key={item.id}
            >
              <ProjectPhaseMain
                numberPhase={index + 1}
                key={item.id}
                id={item.id}
              />
            </section>
          ))}
        </section>
      </section>
    </>
  );
};

export default ProjectPhaseTabs;
