import { useDeletePhaseMutation } from "api/phase.api";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

type Props = {
  id: number;
  numberPhase: number;
};

const ProjectPhaseHeader: FC<Props> = ({ numberPhase, id }) => {
  const [deletePhase, response] = useDeletePhaseMutation();

  const deletePhaseHandler = (id) => {
    deletePhase(id);
    toast.success("Фаза удалена");
  };

  return (
    <header className="grid grid-cols-5 items-center">
      <h4 className="flex items-center gap-3 col-span-2">
        Фаза №{numberPhase}{" "}
        <span
          className="text-red cursor-pointer"
          onClick={() => deletePhaseHandler(id)}
        >
          <RiDeleteBinLine />
        </span>
      </h4>
      <p className="text-gray text-lg">Задача</p>
      <p className="text-gray text-lg">Длительность</p>
      <p className="text-gray text-lg">Стоимость</p>
    </header>
  );
};

export default ProjectPhaseHeader;
