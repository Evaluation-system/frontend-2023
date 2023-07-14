import ProjectPhaseMain from "./ProjectPhaseMain";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useCreatePhaseMutation,
  useGetProjectPhasesQuery,
} from "api/phase.api";

type Props = {
  id: string | undefined;
  dataProjectId: any;
};

const ProjectPhaseTabs: FC<Props> = ({ id, dataProjectId }) => {
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

  const toggleTab = (index: number): void => {
    setToggleState(index);
  };

  const handleAddPhase = async () => {
    const createProjectData = {
      projectId: Number(id),
    };

    createPhase(createProjectData);
    toast.success("Новая фаза добавлена");

    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <button className="mb-10 text-blue" onClick={() => handleAddPhase()}>
        Добавить фазу
      </button>
      <section className="flex flex-col gap-10 w-full">
        <ul className="flex gap-5 overflow-x-auto">
          {dataPhases?.map((item, index) => (
            <li
              onClick={(): void => setToggleState(index)}
              className={
                toggleState === index
                  ? "text-blue min-w-[70px] cursor-pointer"
                  : "cursor-pointer min-w-[70px]"
              }
            >
              Фаза {index + 1}
            </li>
          ))}
        </ul>
        <section>
          {dataPhases?.map((item, index) => (
            <section className={toggleState === index ? "" : "hidden"}>
              <ProjectPhaseMain
                numberPhase={index + 1}
                key={item.id}
                id={item.id}
                projectId={dataProjectId}
              />
            </section>
          ))}
        </section>
      </section>
    </>
  );
};

export default ProjectPhaseTabs;
