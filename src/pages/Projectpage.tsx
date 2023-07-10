import * as yup from "yup";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import ProjectSection from "../components/layout/ProjectSection";
import TextArea from "../components/ui/TextArea";
import { BiEdit } from "react-icons/bi";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { instance } from "../api/axios.api";
import { IProject } from "../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdMonochromePhotos } from "react-icons/md";

type TypeForm = {
  newTitle: string;
  newDescription: string;
};

const Projectpage: FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<IProject | null | any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const schema = yup.object({
    newTitle: yup.string().required("Поле «Новое название» обязательно"),
    newDescription: yup.string().required("Поле «Новое описание» обязательно"),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    const fetchProject = async () => {
      const response = await instance.get<IProject | null>(`projects/${id}`);
      setProject(response.data);
    };
    fetchProject();
  }, [setProject]);

  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatar = () => {
    avatarRef.current?.click();
  };
  const onSubmit: SubmitHandler<TypeForm> = async (data) => {
    const { newTitle, newDescription } = data;
    await instance.patch(`projects/${id}`, {
      title: newTitle,
      description: newDescription,
    });
    setProject({
      ...project,
      title: newTitle,
      description: newDescription,
    });
    reset();
    setOpenModal(false);
  };

  //Сюда вставляется фото
  const [selectImage, setSelectImage] = useState<File | undefined>();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file);
  };

  //Функция загрузки файла на сервер
  const handleUploadImage = async () => {
    //Проверяем наличие файла
    if (!selectImage) {
      alert("Выберите фотографию");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectImage);

    //Выполняем запрос
    await instance.post(`projects/upload-image/${project?.id}`, formData);
  };

  //Сюда вставляем фото полученное с сервера
  const [photo, setPhoto] = useState<string | undefined>("");
  //Получаем фото с сервера
  useEffect(() => {
    const fetchPhoto = async () => {
      const uploadedFilename: string | null = project?.pathImage.substring(
        project?.pathImage.lastIndexOf("/") + 1
      );
      if (project) {
        console.log("123");
        const response = await instance.get(
          `projects/image/${uploadedFilename}`
        );
        const { baseURL, url } = response.config;
        setPhoto(baseURL! + url!);
      }
    };
    fetchPhoto();
  }, [project]);

  return (
    <>
      {project && (
        <section className="p-5 container">
          <header className="flex flex-col justify-between gap-[100px] p-4">
            <div className="flex gap-5 items-center ">
              {project?.pathImage ? (
                <div
                  className="relative w-36 h-36 rounded-full overflow-hidden"
                  onClick={(): void => handleAvatar()}
                >
                  <div className="absolute flex w-full h-full bg-primary z-10 top-28 opacity-80">
                    <div className="mx-auto pt-2">
                      <MdMonochromePhotos />
                    </div>
                  </div>
                  <img src={photo} className="absolute rounded-full z-0" />
                </div>
              ) : (
                <img
                  src="../img/proj.jpg"
                  className="w-36 h-36 rounded-full "
                />
              )}

              <div className="flex flex-col gap-2 max-w-xl">
                <div className="flex gap-5 items-center w-1/2">
                  <h2>{project.title}</h2>
                  <span
                    className="pt-1"
                    onClick={(): void => setOpenModal(!openModal)}
                  >
                    <BiEdit />
                  </span>
                </div>
                <p className="text-gray">{project.description}</p>
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
              <div className="flex flex-col gap-[10px]">
                <p className="text-gray">Стоимость: </p>
                <p>190 000₽</p>
              </div>
              <div className="flex flex-col gap-[10px] w-full">
                <p className="text-gray">Сроки:</p>
                <p>22 рабочих дней (~36 календарных дней)</p>
              </div>
            </section>
          </header>
          <section>
            <ProjectSection />
          </section>
        </section>
      )}
      {openModal ? (
        <Modal text="Изменить проект">
          <header className="flex justify-between items-center">
            <h3>Изменить проект</h3>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Input
              placeholder="Новое название"
              id="newTitle"
              type="text"
              register={{ ...register("newTitle") }}
              errorMessage={errors.newTitle?.message}
            />
            <TextArea
              placeholder="Новое описание"
              id="newDescription"
              register={{ ...register("newDescription") }}
              errorMessage={errors.newDescription?.message}
            />
            <div className="flex gap-5 justify-center">
              <button className="btn" onClick={(): void => setOpenModal(false)}>
                Закрыть
              </button>
              <input
                type="submit"
                className="btnGradient"
                value="Подтвердить"
              />
            </div>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Projectpage;
