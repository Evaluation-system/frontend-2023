import * as yup from "yup";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditPhaseMetricMutation } from "api/phase.api";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicForm from "./DynamicForm";
import Modal from "components/ui/Modal";

type Form = {
  qa: string;
  pmAm: string;
  bugs: string;
  risks: string;
};

type Props = {
  phaseId: number;
  setOpenForm: any;
  openForm: boolean;
};
const ProjectPhaseMetricForm: FC<Props> = ({
  phaseId,
  setOpenForm,
  openForm,
}) => {
  const schema = yup.object({
    qa: yup
      .string()
      .required("Поле «QA» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
    pmAm: yup
      .string()
      .required("Поле «PM/AM» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
    bugs: yup
      .string()
      .required("Поле «Bugs» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
    risks: yup
      .string()
      .required("Поле «Risks» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
  });
  const { reset } = useForm<Form>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [editPhaseMetric] = useEditPhaseMetricMutation();
  //Функция отправки данных на сервер
  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { qa, pmAm, bugs, risks } = data;

    const metric = {
      id: phaseId,
      patch: {
        qa: Number(qa),
        pmAm: Number(pmAm),
        bugs: Number(bugs),
        risks: Number(risks),
      },
    };
    editPhaseMetric(metric);
    setOpenForm(false);
    reset();
  };

  const fields = [
    {
      placeholder: "QA %",
      name: "qa",
    },
    {
      placeholder: "PM/AM %",
      name: "pmAm",
    },
    {
      placeholder: "Bugs %",
      name: "bugs",
    },
    {
      placeholder: "Risks %",
      name: "risks",
    },
  ];

  return (
    <>
      {openForm && (
        <Modal>
          <DynamicForm
            fields={fields}
            onSubmit={onSubmit}
            schema={schema}
            headerText="Добавить метрики"
            setOpenForm={setOpenForm}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectPhaseMetricForm;
