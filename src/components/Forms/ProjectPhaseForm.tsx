import { Dispatch, FC, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/ui/Input";
import { useAppDispatch } from "store/hooks/hooks";
import { addEmployee } from "store/projects/projectSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreatePhaseTaskMutation } from "api/phase.api";

type Props = {
  id: number;
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

type Form = {
  titleTask: string;
  descriptionTask: string;
  countTask: string;
  roleEmployee: string;
  startTask: string;
  endTask: string;
  Qa: string;
  PmAm: string;
  Bugs: string;
  Risks: string;
};

const ProjectPhaseForm: FC<Props> = ({ openForm, setOpenForm, id }) => {
  const schema = yup.object({
    titleTask: yup.string().required("Поле «Задача» обязательно"),
    descriptionTask: yup.string().required("Поле «Описание» обязательно"),
    countTask: yup
      .string()
      .required("Поле «Кол-во задач» обязательно")
      .matches(/^\d+$/, "Введенное значение должно быть число"),
    roleEmployee: yup.string().required("Поле «Роль исполняющего» обязательно"),
    startTask: yup
      .string()
      .required("Поле «Кол-во часов (от)» обязательно")
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
      .required("Поле «Кол-во часов (до)» обязательно")
      .matches(/^\d+$/, "Введенное значение должно быть число"),
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

  //Добавляет в стору
  const dispatch = useAppDispatch();

  const [createPhaseTask] = useCreatePhaseTaskMutation();

  const phaseId = Number(id);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    //Забираем поля из формы
    const {
      titleTask,
      descriptionTask,
      countTask,
      roleEmployee,
      startTask,
      endTask,
      Qa,
      PmAm,
      Bugs,
      Risks,
    } = data;

    //Вот сюда эти поля нужно вставить
    const taskPhase = {
      phaseId: phaseId,
      titleTask: titleTask,
      descriptionTask: descriptionTask,
      countTask: Number(countTask),
      roleEmployee: roleEmployee,
      starTask: Number(startTask),
      endTask: Number(endTask),
      QA: Number(Qa),
      PmAm: Number(PmAm),
      Bugs: Number(Bugs),
      Risks: Number(Risks),
    };

    // dispatch(addEmployee(data));

    createPhaseTask(taskPhase);

    setOpenForm(!openForm);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={openForm ? "flex flex-col gap-10" : "hidden"}
    >
      <section className="flex flex-col gap-5">
        <h3>Основные поля:</h3>
        <Input
          bg="inherit"
          placeholder="Задача"
          id="titleTask"
          type="text"
          register={{ ...register("titleTask") }}
          errorMessage={errors.titleTask?.message}
        />
        <Input
          bg="inherit"
          placeholder="Описание"
          id="descriptionTask"
          type="text"
          register={{ ...register("descriptionTask") }}
          errorMessage={errors.descriptionTask?.message}
        />
        <div className="flex justify-between gap-6">
          <Input
            bg="inherit"
            placeholder="Кол-во задач"
            id="countTask"
            type="text"
            register={{ ...register("countTask") }}
            errorMessage={errors.countTask?.message}
          />
          <Input
            bg="inherit"
            placeholder="Роль исполняющего"
            id="roleEmployee"
            type="text"
            register={{ ...register("roleEmployee") }}
            errorMessage={errors.roleEmployee?.message}
          />
          <Input
            bg="inherit"
            placeholder="Кол-во часов (от)"
            id="starTask"
            type="text"
            register={{ ...register("startTask") }}
            errorMessage={errors.startTask?.message}
          />
          <Input
            bg="inherit"
            placeholder="Кол-во часов (до)"
            id="endTask"
            type="text"
            register={{ ...register("endTask") }}
            errorMessage={errors.endTask?.message}
          />
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h3>Дополнительные поля:</h3>
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
      </section>
      <button
        type="submit"
        className="mt-10 p-5 rounded-full border-secondary border-2"
      >
        Добавить
      </button>
    </form>
  );
};

export default ProjectPhaseForm;
