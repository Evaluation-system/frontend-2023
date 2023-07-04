import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { addProject } from "../store/projects/projectSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { instance } from "../api/axios.api";

type Form = {
  title: string;
  description: string;
};

const CreateProject: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const user = useAppSelector(state => state.user.user)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const url = "http://localhost:3005/"



  const onSubmit: SubmitHandler<Form> = (data) => {
    const { title, description } = data
    // dispatch(addProject(data));
    navigate("/profile");
    reset();
    const response = instance.post("http://localhost:3005/projects", {
      title: title,
      description: description,
      UserId: user?.id,
    })
  };


  return (
    <Modal text="Создать проект">
      <Toaster />
      <form
        className="flex flex-col gap-[50px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("title", { required: "Поле «Название» обязательно" })}
          placeholder="Название"
        />
        <textarea
          {...register("description", {
            required: "Поле «Описание» обязательно",
          })}
          placeholder="Описание"
        />
        <span className="hidden">
          {errors.title && toast.error(errors.title.message || "")}
          {errors.description && toast.error(errors.description.message || "")}
        </span>
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
