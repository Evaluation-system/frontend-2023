import * as yup from "yup";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import ProjectSection from "../components/layout/ProjectSection";
import TextArea from "../components/ui/TextArea";
import { BiEdit } from "react-icons/bi";
import { FC, useEffect, useRef, useState } from "react";
import { instance } from "../api/axios.api";
import { IProject } from "../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetProjectQuery } from "../api/project.api";

type TypeForm = {
  newTitle: string;
  newDescription: string;
};

const Projectpage: FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const navigate = useNavigate();

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

  const { isLoading, data, error } = useGetProjectQuery(id);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await instance.get(
        `http://localhost:3005/projects/${id}`
      );
      setProject(response.data);
    };
    fetchProject();
  }, []);

  const ref = useRef<HTMLInputElement | null>(null);

  const handleAvatar = () => {
    ref.current?.click();
  };
  const onSubmit: SubmitHandler<TypeForm> = (data) => {
    alert(data);
    reset();
  };

  //Сюда вставляется фото
  const [selectImage, setSelectImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setSelectImage(file);
    console.log(selectImage);
  };

  //Сохраняем фото в состояние
  const [uploaded, setUploaded] = useState();

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
    const response = await instance.post(
      `projects/upload-image/${data?.id}`,
      formData
    );

    //Путь до изображения
    const uploadedFilePath = response.data.filePath;
    //Название изображения
    const uploadedFilename = uploadedFilePath.substring(
      uploadedFilePath.lastIndexOf("/") + 1
    );
    setUploaded(uploadedFilename);
    console.log(uploadedFilename);
  };

  //Сюда вставляем фото полученное с сервера
  const [photo, setPhoto] = useState("");

  //Получаем фото с сервера
  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await instance.get(`image/${uploaded}`);
      setPhoto(response.data);
    };
    fetchPhoto();
  }, [uploaded]);

  return (
    <>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : data ? (
        <section className="p-5 container">
          <header className="flex flex-col justify-between gap-[100px] p-4">
            <div className="flex gap-5 items-center ">
              {uploaded && (
                <img
                  src={photo}
                  className="w-36 h-36 rounded-full "
                  onClick={(): void => handleAvatar()}
                />
              )}

              <div className="flex flex-col gap-2 max-w-xl">
                <div className="flex gap-5 items-center w-1/2">
                  <h2>{data.title}</h2>
                  <span
                    className="pt-1"
                    onClick={(): void => setOpenModal(!openModal)}
                  >
                    <BiEdit />
                  </span>
                </div>
                <p className="text-gray">{data.description}</p>
                <input
                  className="hidden xl:flex"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
                <button
                  className="hidden xl:flex"
                  onClick={() => handleUploadImage()}
                >
                  Upload
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
      ) : (
        <div>Произошла ошабка :(</div>
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
