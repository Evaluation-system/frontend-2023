import * as yup from "yup";
import Input from "../ui/Input";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { FC, useState } from "react";
import { IoLogoUsd, IoMdCheckmark } from "react-icons/io";
import { IProject } from "types/types";
import { MdOutlinePerson } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useEditProjectMutation } from "api/project.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiAdminFill } from "react-icons/ri";
import { useAppSelector } from "store/hooks/hooks";

type Form = {
  price: string;
  date: string;
  client: string;
};

type Props = {
  project: IProject;
};

const ProjectEditField: FC<Props> = ({ project }) => {
  const schema = yup.object({
    price: yup
      .string()
      .required("Поле «Стоимость» обязательно")
      .max(10, "Максимальное количество символов - 10")
      .matches(/^\d+$/, "Введенное значение должно быть число"),
    date: yup
      .string()
      .required("Поле «Сроки» обязательно")
      .max(5, "Максимальное количество символов - 5")
      .matches(/^\d+$/, "Введенное значение должно быть число"),
    client: yup.string().required("Поле «Клиент» обязательна"),
  });

  const [editProject] = useEditProjectMutation();
  const [openPrice, setOpenPrice] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  //Форма
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      price: project.price,
      date: project.terms,
      client: project.client,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const adminPerson = useAppSelector((state: any) => state.user.user);

  //Отслеживают введенное в инпуты
  const watchPrice = watch("price");
  const watchDate = watch("date");
  const watchClient = watch("client");

  //Отправка запроса на редактирование стоимости
  const handleFetchPrice = (): void => {
    const editProjectPatch = {
      id: project?.id,
      patch: {
        price: Number(watchPrice),
      },
    };
    editProject(editProjectPatch);
    setOpenPrice(false);
  };

  //Отправка запроса на редактиррование даты
  const handleFetchDate = () => {
    const editProjectPatch = {
      id: project?.id,
      patch: {
        terms: Number(watchDate),
      },
    };
    editProject(editProjectPatch);
    setOpenDate(false);
  };

  //Отправка запроса на редактирование клиента
  const handleFetchClient = () => {
    const editProjectPatch = {
      id: project?.id,
      patch: {
        client: watchClient,
      },
    };
    editProject(editProjectPatch);
    setOpenClient(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray text-sm">Дополнительные поля:</span>
      <div className="flex flex-col gap-4">
        <div className="flex gap-5 items-center">
          <label className="flex gap-2 items-center">
            <IoLogoUsd /> Стоимость:
          </label>

          {openPrice ? (
            <div className="flex gap-2 items-center">
              <Input
                register={{ ...register("price") }}
                id="price"
                placeholder={project?.price || "Введите стоимость"}
                type="text"
                bg="inherit"
                errorMessage={errors.price?.message}
              />
              <span
                onClick={(): void => {
                  handleFetchPrice();
                }}
              >
                <IoMdCheckmark />
              </span>

              <span onClick={(): void => setOpenPrice(false)}>
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span>{project?.price} &#8381;</span>
              {project?.price ? (
                <span
                  className="flex gap-2 items-center text-gray"
                  onClick={(): void => setOpenPrice(true)}
                >
                  <AiOutlineEdit />
                </span>
              ) : (
                <span
                  className="flex gap-2 items-center text-gray"
                  onClick={(): void => setOpenPrice(true)}
                >
                  Редактировать <AiOutlineEdit />
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-5 items-center">
          <label className="flex gap-2 items-center">
            <BsCalendarDate />
            Сроки:
          </label>

          {openDate ? (
            <div className="flex gap-2 items-center">
              <Input
                register={{ ...register("date") }}
                id="date"
                placeholder={project?.terms || "Введите сроки"}
                type="text"
                bg="inherit"
                errorMessage={errors.date?.message}
              />
              <span onClick={(): void => handleFetchDate()}>
                <IoMdCheckmark />
              </span>

              <span onClick={(): void => setOpenDate(false)}>
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span>{project?.terms} дней</span>
              {project?.terms ? (
                <div
                  className="flex gap-2 items-center text-gray"
                  onClick={(): void => setOpenDate(true)}
                >
                  <AiOutlineEdit />
                </div>
              ) : (
                <div
                  className="flex gap-2 items-center text-gray"
                  onClick={(): void => setOpenDate(true)}
                >
                  Редактировать <AiOutlineEdit />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <span className="flex text-secondary">
            <RiAdminFill />
          </span>
          Создатель проекта:
          <span>{adminPerson?.email}</span>
        </div>
        <div className="flex gap-5 items-center">
          <label className="flex gap-2 items-center">
            <MdOutlinePerson />
            Клиент:
          </label>

          {openClient ? (
            <div className="flex gap-2 items-center">
              <Input
                register={{ ...register("client") }}
                id="client"
                placeholder={project?.client || "Введите клиента"}
                type="text"
                bg="inherit"
                errorMessage={errors.client?.message}
              />
              <span onClick={(): void => handleFetchClient()}>
                <IoMdCheckmark />
              </span>
              <span onClick={(): void => setOpenClient(false)}>
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span>{project.client}</span>
              {project.client ? (
                <span
                  className="flex gap-2 items-center text-gray"
                  onClick={(): void => setOpenClient(true)}
                >
                  <AiOutlineEdit />
                </span>
              ) : (
                <span
                  className="flex gap-2 items-center text-gray"
                  onClick={(): void => setOpenClient(true)}
                >
                  Редактировать <AiOutlineEdit />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectEditField;
