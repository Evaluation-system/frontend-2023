import ProjectPhaseMain from "./ProjectPhaseMain";
import { FC, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  useCreatePhaseMutation,
  useGetProjectPhasesQuery,
} from "api/phase.api";
import { IPhases } from "types/types";

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

  if (isLoadingPhases) {
    return <p>Идёт загрузка фаз...</p>;
  }

  if (errorPhases) {
    const errorMessage =
      errorPhases instanceof Error
        ? errorPhases.message
        : "Произошла ошибка при загрузке фазы";
    return <p>{errorMessage}</p>;
  }

  if (!dataPhases) {
    return <p>Данные фаз не найдены</p>;
  }
  //Табы, переключения между фазами
  const [toggleState, setToggleState] = useState(0);

  const handleAddPhase = async () => {
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
              <ul className="flex gap-5 overflow-x-auto">
                {dataPhases?.map((item: IPhases, index: number) => (
                  <li
                    onClick={(): void => setToggleState(index)}
                    className={
                      toggleState === index
                        ? "text-blue min-w-[70px] cursor-pointer"
                        : "cursor-pointer min-w-[70px]"
                    }
                  >
                    Фаза № {index + 1}
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
            <section className={toggleState === index ? "" : "hidden"}>
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
