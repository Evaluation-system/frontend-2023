import Avatar from "../../components/ui/Avatar";
import Input from "../../components/ui/Input";
import { AiOutlineEdit } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { instance } from "../../api/axios.api";
import { IoLogoUsd, IoMdCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IProject } from "../../types/types";
import { MdOutlinePerson } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditProjectMutation } from "../../api/project.api";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  photo: string | undefined;
  project: IProject;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  handleImage: any;
};

type Form = {
  price: number;
  date: string | number;
  client: string;
};

const ProjectHeader: FC<Props> = ({
  project,
  photo,
  setOpenModal,
  openModal,
  handleImage,
}) => {
  const [editProject] = useEditProjectMutation();

  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatar = () => {
    avatarRef.current?.click();
  };

  //Форма
  const { register, watch, reset, handleSubmit } = useForm<Form>({
    defaultValues: {
      price: project.price,
      date: project.terms,
      client: project.client,
    },
  });

  //-------------------------------------------------------------------------
  //Отслеживает все что вводят в инпут стоимости
  const watchPrice = watch("price");
  //Отслеживает все что вводят в инпут сроков
  const watchDate = watch("date");
  //Отслеживает все что вводят в инпут клиента
  const watchClient = watch("client");
  //Открывают и закрывают соответствующую форму
  const [openPrice, setOpenPrice] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openClient, setOpenClient] = useState(false);

  //Функция отправки запроса на сервер
  const onSubmit: SubmitHandler<Form> = (data) => {
    const { price, date, client } = data;

    //ТУТ СДЕЛАТЬ ПРОВЕРКУ НА НАЛИЧИЕ УЖЕ ТЕКУЩИХ ВВЕДЕННЫХ ДАННЫХ
    if (price !== project.price) {
    }
    reset();
  };

  const handleValidatePrice = (): void => {
    const numberPrice = Number(watchPrice);

    if (!watchPrice) {
      toast.success("Заполните поле");
    } else if (!numberPrice) {
      toast.success("Введено не число");
    } else {
      const editProjectPatch = {
        id: project?.id,
        patch: {
          price: Number(watchPrice),
        },
      };

      console.log("editProjectPatch price");
      console.log(editProjectPatch);

      editProject(editProjectPatch);

      setOpenPrice(false);
    }
  };
  const handleValidateDate = () => {
    {
      if (!watchDate) {
        toast.success("Заполните поле");
      } else {
        const editProjectPatch = {
          id: project?.id,
          patch: {
            terms: watchDate,
          },
        };

        console.log("editProjectPatch terms");
        console.log(editProjectPatch);

        editProject(editProjectPatch);

        setOpenDate(false);
      }
    }
  };
  const handleValidateClient = () => {
    {
      if (!watchClient) {
        toast.success("Заполните поле");
      } else {
        const editProjectPatch = {
          id: project?.id,
          patch: {
            client: watchClient,
          },
        };

        console.log("editProjectPatch client");
        console.log(editProjectPatch);

        editProject(editProjectPatch);

        setOpenClient(false);
      }
    }
  };
  return (
    <header className="flex flex-col justify-between gap-10 p-4 mb-12">
      <div className="flex gap-5 items-center ">
        {project.pathImage ? (
          <Avatar photo={photo} handleAvatar={handleAvatar} />
        ) : (
          <Avatar handleAvatar={handleAvatar} />
        )}

        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex gap-5 items-center">
            <h2 className="overflow-hidden whitespace-nowrap text-ellipsis">
              {project.title}
            </h2>
            <span
              className="pt-1"
              onClick={(): void => setOpenModal(!openModal)}
            >
              <BiEdit />
            </span>
          </div>

          <p className="text-gray overflow-hidden text-ellipsis line-clamp-4">
            {project.description}
          </p>

          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={avatarRef}
          />
        </div>
      </div>
      <section className="flex flex-col gap-3 xl:flex-row xl:gap-20">
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
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
                />
                <button
                  onClick={(): void => {
                    handleValidatePrice();
                  }}
                >
                  <IoMdCheckmark />
                </button>

                <button onClick={(): void => setOpenPrice(false)}>
                  <AiOutlineClose />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span>{project?.price}</span>
                {project?.price ? (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenPrice(true)}
                  >
                    <AiOutlineEdit />
                  </button>
                ) : (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenPrice(true)}
                  >
                    Редактировать <AiOutlineEdit />
                  </button>
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
                />
                <button onClick={(): void => handleValidateDate()}>
                  <IoMdCheckmark />
                </button>

                <button onClick={(): void => setOpenDate(false)}>
                  <AiOutlineClose />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span>{project?.terms}</span>
                {project?.terms ? (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenDate(true)}
                  >
                    <AiOutlineEdit />
                  </button>
                ) : (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenDate(true)}
                  >
                    Редактировать <AiOutlineEdit />
                  </button>
                )}
              </div>
            )}
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
                />
                <button onClick={(): void => handleValidateClient()}>
                  <IoMdCheckmark />
                </button>
                <button onClick={(): void => setOpenClient(false)}>
                  <AiOutlineClose />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span>{project.client}</span>
                {project.client ? (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenClient(true)}
                    type="submit"
                  >
                    <AiOutlineEdit />
                  </button>
                ) : (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenClient(true)}
                  >
                    Редактировать <AiOutlineEdit />
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </section>
    </header>
  );
};

export default ProjectHeader;
