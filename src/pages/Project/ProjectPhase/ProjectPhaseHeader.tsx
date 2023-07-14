import { useDeletePhaseMutation } from "api/phase.api";
import { FC } from "react";
import { Toaster, toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

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

  return (
    <>
      <Toaster />
      <h4 className="flex items-center gap-3 col-span-2">
        Фаза №{numberPhase}{" "}
        <span
          className="text-red cursor-pointer"
          onClick={() => deletePhaseHandler(id)}
        >
          <RiDeleteBinLine />
        </span>
      </h4>
    </>
  );
};

export default ProjectPhaseHeader;
