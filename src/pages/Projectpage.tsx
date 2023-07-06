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

  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      instance
        .post(`/auth/upload-image/${project?.id}`, formData)
        .then((response) => {
          console.log("Image uploaded:", response.data.filePath);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  return (
    <>
      {project && (
        <section className="p-5 container">
          <header className="flex justify-between gap-[100px] p-4">
            <div className="flex gap-5 items-center ">
              <img
                src={selectedImage}
                className="w-36 h-36 rounded-full "
                onClick={(): void => handleAvatar()}
              />

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
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button onClick={handleUpload}>Upload</button>
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
