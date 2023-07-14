import Input from "components/ui/Input";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
4;
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Form = {
  Qa: string;
  PmAm: string;
  Bugs: string;
  Risks: string;
};

const ProjectPhaseMetric: FC = () => {
  const schema = yup.object({
    Qa: yup
      .string()
      .required("Поле «QA» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
    PmAm: yup
      .string()
      .required("Поле «PM/AM» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
    Bugs: yup
      .string()
      .required("Поле «Bugs» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
    Risks: yup
      .string()
      .required("Поле «Risks» обязательно")
      .matches(
        /^\d{1,2}$/,
        "Введенное значение должно быть число, не более 2 символов"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({ resolver: yupResolver(schema), mode: "onChange" });

  //Для показа формы при нажатии на кнопку "Добавить метрики"
  const [openMetric, setOpenMetric] = useState(false);

  return (
    <>
      <button
        className="text-blue text-end"
        onClick={(): void => setOpenMetric(!openMetric)}
      >
        Добавить метрики
      </button>
      <form className={openMetric ? "flex flex-col gap-5" : "hidden"}>
        <h3>Метрики:</h3>
        <div className="flex justify-between gap-6">
          <Input
            bg="inherit"
            placeholder="QA %"
            id="Qa"
            type="text"
            register={{ ...register("Qa") }}
            errorMessage={errors.Qa?.message}
          />
          <Input
            bg="inherit"
            placeholder="PM/AM %"
            id="PmAm"
            type="text"
            register={{ ...register("PmAm") }}
            errorMessage={errors.PmAm?.message}
          />
          <Input
            bg="inherit"
            placeholder="Bugs %"
            id="Bugs"
            type="text"
            register={{ ...register("Bugs") }}
            errorMessage={errors.Bugs?.message}
          />
          <Input
            bg="inherit"
            placeholder="Risks %"
            id="Risks"
            type="text"
            register={{ ...register("Risks") }}
            errorMessage={errors.Risks?.message}
          />
        </div>
        <button
          type="submit"
          className="mt-10 p-5 rounded-full border-secondary border-2"
        >
          Добавить
        </button>
      </form>
    </>
  );
};

export default ProjectPhaseMetric;
