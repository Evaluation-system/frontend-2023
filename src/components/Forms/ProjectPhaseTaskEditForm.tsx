import Modal from "components/ui/Modal";
import { Dispatch, FC, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  openForm: Dispatch<SetStateAction<boolean>>;
};
type Form = {
  titleTask: string;
  descriptionTask: string;
  countTask: string;
  roleEmployee: string;
  startTask: string;
  endTask: string;
};
const ProjectPhaseTaskEditForm: FC<Props> = ({ openForm }) => {
  const schema = yup.object({
    titleTask: yup.string(),
    descriptionTask: yup.string(),
    countTask: yup
      .string()
      .matches(/^\d+$/, "Введенное значение должно быть число"),
    roleEmployee: yup.string(),
    startTask: yup
      .string()
      .matches(/^\d+$/, "Введенное значение должно быть число")
      .test(
        "startTask",
        "Начальное время не может быть больше завершающего",
        function (value) {
          const endTask = this.parent.endTask;
          if (value && endTask) {
            return parseInt(value, 10) <= parseInt(endTask, 10);
          }
          return true;
        }
      ),
    endTask: yup
      .string()
      .matches(/^\d+$/, "Введенное значение должно быть число"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({ resolver: yupResolver(schema), mode: "onChange" });

  return (
    <Modal>
      <header className="flex justify-between items-center">
        <h4>Изменить задачу</h4>
        <span onClick={(): void => openForm(false)} className="cursor-pointer">
          <AiOutlineClose />
        </span>
      </header>
      <p>dfdsf</p>
    </Modal>
  );
};

export default ProjectPhaseTaskEditForm;
