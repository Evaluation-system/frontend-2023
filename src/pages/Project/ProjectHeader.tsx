import { Dispatch, FC, useRef, SetStateAction, useState } from "react";
import Avatar from "../../components/ui/Avatar";
import { BiEdit } from "react-icons/bi";
import { IProject } from "../../types/types";
import Input from "../../components/ui/Input";
import { BsCalendarDate } from "react-icons/bs";
import { IoLogoUsd, IoMdCheckmark } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlinePerson } from "react-icons/md";
import { useForm } from "react-hook-form";

type Props = {
  photo: string | undefined;
  project: IProject;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  handleUploadImage: any;
  handleImage: any;
};

const ProjectHeader: FC<Props> = ({
  project,
  photo,
  setOpenModal,
  openModal,
  handleUploadImage,
  handleImage,
}) => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatar = () => {
    avatarRef.current?.click();
  };

  //Форма
  const { register, watch, reset, handleSubmit } = useForm();

  const watchPrice = watch("price");
  const watchDate = watch("date");
  const watchPerson = watch("person");
  const [openPrice, setOpenPrice] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openPerson, setOpenPerson] = useState(false);

  const onSubmit = () => {};

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
          <button
            className="flex"
            onClick={(): Promise<any> => handleUploadImage()}
          >
            Загрузить фото
          </button>
        </div>
      </div>
      <section className="flex flex-col gap-3 xl:flex-row xl:gap-20">
        <form
          className="flex flex-col gap-7"
          onSubmit={handleSubmit(onSubmit())}
        >
          <div className="flex gap-5 items-center">
            <label className="flex gap-2 items-center">
              <IoLogoUsd /> Стоимость:
            </label>
            {openPrice ? (
              <div className="flex gap-2 items-center">
                <Input
                  register={{ ...register("price") }}
                  id="price"
                  placeholder="Введите стоимость"
                  type="text"
                  bg="inherit"
                />
                <button onClick={(): void => setOpenPrice(false)}>
                  <IoMdCheckmark />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span>{watchPrice}</span>
                {watchPrice ? (
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
                  placeholder="Введите сроки проекта"
                  type="text"
                  bg="inherit"
                />
                <button onClick={(): void => setOpenDate(false)}>
                  <IoMdCheckmark />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span>{watchDate}</span>
                {watchDate ? (
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
            {openPerson ? (
              <div className="flex gap-2 items-center">
                <Input
                  register={{ ...register("person") }}
                  id="person"
                  placeholder="Введите клиента"
                  type="text"
                  bg="inherit"
                />
                <button onClick={(): void => setOpenPerson(false)}>
                  <IoMdCheckmark />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span>{watchPerson}</span>
                {watchPerson ? (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenPerson(true)}
                  >
                    <AiOutlineEdit />
                  </button>
                ) : (
                  <button
                    className="flex gap-2 items-center text-gray"
                    onClick={(): void => setOpenPerson(true)}
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
