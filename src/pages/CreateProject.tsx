import * as yup from "yup";
import axios from "axios";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import TextArea from "../components/ui/TextArea";
import { FC } from "react";
import { instance } from "../api/axios.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../store/hooks/hooks";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProject } from "../types/types";

type Form = {
  title: string;
  description: string;
};

const CreateProject: FC = () => {
  //Валидация
  const schema = yup.object({
    title: yup.string().required("Поле «Название» обязательно"),
    description: yup.string().required("Поле «Описание» обязательно"),
  });
  //React-hook-form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  // const url = "http://localhost:3005/"

  const onSubmit: SubmitHandler<Form> = (data) => {
    const { title, description } = data;
    navigate("/profile");
    reset();
    const response = instance.post<CreateProject>(
      "http://localhost:3005/projects",
      {
        title: title,
        description: description,
        UserId: user?.id,
      }
    );
  };

  return (
    <Modal text="Создать проект">
      <form
        className="flex flex-col gap-[50px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="title"
          placeholder="Название"
          type="text"
          register={{ ...register("title") }}
          errorMessage={errors.title?.message}
        />
        <TextArea
          id="description"
          placeholder="Описание"
          register={{ ...register("description") }}
          errorMessage={errors.description?.message}
        />
        <div className="flex gap-5 justify-center xl:gap-[33px] xl:justify-end">
          <Button text="Назад" style="hidden xl:btn" action="/" />
          <button type="submit" className="btnGradient">
            Создать
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProject;
