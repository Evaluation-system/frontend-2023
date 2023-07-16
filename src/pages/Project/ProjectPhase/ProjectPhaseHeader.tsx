import { useDeletePhaseMutation } from "api/phase.api";
import { FC, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import ProjectPhaseForm from "components/Forms/ProjectPhaseForm";
import ProjectPhaseMetricForm from "components/Forms/ProjectPhaseMetricForm";
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

  const [openEditName, setOpenEditName] = useState<boolean>(false);
  const phaseId: number = Number(id);

  const [openMetric, setOpenMetric] = useState<boolean>(false);
  const [openTaskField, setOpenTaskField] = useState<boolean>(false);
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
          Фаза №{numberPhase}{" "}
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
          <input className="flex bg-transparent" placeholder="Новое название" />
          <div className="flex gap-2 items-center">
            <IoMdCheckmark />
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
