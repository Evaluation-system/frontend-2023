import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import ProjectSection from "../components/layout/ProjectSection";
import TextArea from "../components/ui/TextArea";
import { BiEdit } from "react-icons/bi";
import { FC, useEffect, useRef, useState } from "react";
import { instance } from "../api/axios.api";
import { IProject } from "../types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

type TypeForm = {
  newTitle: string;
  newDescription: string;
};

const Projectpage: FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<IProject | null>(null);

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
      const response = await instance.get<IProject[]>(
        `http://localhost:3005/projects/${id}`
      );
      setProject(response.data[0]);
    };
    fetchProject();
  }, []);

  const ref = useRef<HTMLInputElement | undefined>();

  const handleAvatar = () => {
    ref.current?.click();
  };
  const onSubmit: SubmitHandler<TypeForm> = (data) => {
    alert(data);
    reset();
  };

  // Выбранный файл
  const [selectedFile, setSelectedFile] = useState(null);
  // Ответ сервера
  const [uploaded, setUploaded] = useState();

  const handleChange = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Выбери файл");
      return;
    }
    const formData = new FormData();
    formData.append("originalname", selectedFile);

    const response = await axios.post(url, formData);
    setUploaded(response.data);
  };
  return (
    <>
      <section className="p-5 container">
        <header className="flex justify-between gap-[100px] p-4">
          <div className="flex gap-5 items-center ">
            {uploaded && (
              <img
                src={uploaded.filePath}
                className="w-36 h-36 rounded-full"
                onClick={(): void => handleAvatar()}
              />
            )}

            <div className="flex flex-col gap-2 max-w-xl">
              <div className="flex gap-5 items-center">
                <h2>Название проекта</h2>
                <span className="pt-1" onClick={(): void => setOpenModal(true)}>
                  <BiEdit />
                </span>
              </div>
              <p className="text-gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                excepturi dolore doloribus! Corrupti debitis quidem expedita ea
                accusantium excepturi dolore exercitationem dignissimos fugit
                quibusdam quos deleniti sapiente, quaerat deserunt modi!
              </p>
              <input
                type="file"
                ref={ref}
                onChange={handleChange}
                accept=".png, .jpg"
              />
              <button className="bg-red" onClick={() => handleUpload()}>
                Грузи его мать твою
              </button>
            </div>
          </div>
          <section className="flex gap-20">
            <div className="flex flex-col gap-[10px]">
              <p className="text-gray">Стоимость: </p>
              <p>190 000₽</p>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-gray">Сроки:</p>
              <p>26 рабочих дней (~36 календарных дней)</p>
            </div>
          </section>
        </header>

        <section>
          <ProjectSection />
        </section>
      </section>
      {openModal ? (
        <Modal text="Изменить проект">
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
