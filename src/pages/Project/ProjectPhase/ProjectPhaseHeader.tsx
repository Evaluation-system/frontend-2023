import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import ProjectPhaseMetricForm from "components/Forms/ProjectPhaseMetricForm";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { FC, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast, Toaster } from "react-hot-toast";
import {
  useDeletePhaseMutation,
  useEditPhaseMetricMutation,
  useEditPhaseMutation,
} from "api/phase.api";
import { useGetProjectPhasesQuery } from "api/phase.api";

type Props = {
  numberPhase: number;
  id: number;
};

const ProjectPhaseHeader: FC<Props> = ({ numberPhase, id }) => {
  const [deletePhase] = useDeletePhaseMutation();

  const deletePhaseHandler = (id: number) => {
    deletePhase(id);
    toast.success("Фаза удалена");
  };

  const phaseId = Number(id);
  const [editPhase] = useEditPhaseMutation();
  const [titlePhase, setTitlePhase] = useState("");

  const handleTitlePhase = (e) => {
    setTitlePhase(e.target.value);
  };
  const fetchTitlePhase = () => {
    const newTitle = {
      id: phaseId,
      patch: {
        title: titlePhase,
      },
    };
    editPhase(newTitle);
  };
  const [openEditName, setOpenEditName] = useState<boolean>(false);

  const [openMetric, setOpenMetric] = useState<boolean>(false);
  const [openTaskField, setOpenTaskField] = useState<boolean>(false);

  const {
    isLoading: isLoadingPhases,
    data: dataPhases,
    error: errorPhases,
  } = useGetProjectPhasesQuery(phaseId);

  const handleApplyNewTitle = () => {
    fetchTitlePhase();
    setOpenEditName(false);
  };

  return (
    <>
      {openTaskField && (
        <ProjectPhaseForm
          id={id}
          setOpenForm={setOpenTaskField}
          openForm={openTaskField}
        />
      )}
      {openMetric && (
        <ProjectPhaseMetricForm
          phaseId={phaseId}
          setOpenForm={setOpenMetric}
          openForm={openMetric}
        />
      )}
      <Toaster />
      <section className="flex justify-between items-center">
        <h4 className="flex items-center gap-3 col-span-2">
          <>
            {dataPhases.map((item) => (
              <p>{item.title || "Фаза №" + numberPhase}</p>
            ))}
          </>

          <span
            className="cursor-pointer hover:opacity-50"
            onClick={(): void => setOpenEditName(!openEditName)}
          >
            <AiOutlineEdit />
          </span>
          <span
            className="text-red cursor-pointer hover:opacity-50"
            onClick={() => deletePhaseHandler(id)}
          >
            <RiDeleteBinLine />
          </span>
        </h4>
        <div className="flex gap-5">
          <span
            className="cursor-pointer text-blue"
            onClick={(): void => setOpenTaskField(!openTaskField)}
          >
            Добавить задачу
          </span>
          <span
            className="cursor-pointer text-blue"
            onClick={(): void => setOpenMetric(!openMetric)}
          >
            Изменить метрики
          </span>
        </div>
      </section>
      {openEditName && (
        <div className="flex gap-3 items-center">
          <input
            className="flex bg-transparent"
            placeholder="Новое название"
            value={titlePhase}
            onChange={handleTitlePhase}
          />
          <div className="flex gap-2 items-center">
            <span
              className="cursor-pointer hover:opacity-50"
              onClick={() => handleApplyNewTitle()}
            >
              <IoMdCheckmark />
            </span>
            <span
              className="cursor-pointer hover:opacity-50"
              onClick={(): void => setOpenEditName(!openEditName)}
            >
              <AiOutlineClose />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPhaseHeader;
