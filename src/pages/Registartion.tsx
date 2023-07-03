import Modal from "../components/ui/Modal";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AuthService } from "../services/auth.service";

type Form = {
  name: string;
  email: string;
  password: string;
  submitPassword: string;
};

const Registartion: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();

  const pass: string = watch("password");
  const subPass: string = watch("submitPassword");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { email, password, name } = data;
    try {
      const response: any = AuthService.registartion({ email, password });
      if (response) {
        toast.success(`Аккаунт ${name} зарегистрирован`);
        reset();
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  return (
    <Modal>
      <Toaster />
      <form
        className="flex flex-col gap-[50px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", {
            required: "Поле «Имя» обязательно",
            minLength: {
              value: 4,
              message: "Минимальная длина Имя 4 символа",
            },
          })}
          placeholder="Имя"
          type="text"
        />
        <input
          {...register("email", { required: "Поле «Почта» обязательно" })}
          placeholder="Почта"
          type="email"
        />
        <input
          {...register("password", {
            required: "Поле «Пароль» обязательно",
            minLength: {
              value: 8,
              message: "Минимальная длина Пароля 8 символов",
            },
          })}
          placeholder="Пароль"
          type="password"
        />
        <input
          {...register("submitPassword", {
            required: "Поле «Подтверждение пароля» обязательно",
          })}
          placeholder="Подтверждение пароля"
          type="password"
        />
        {pass !== subPass ? (
          <p className="text-red">Введенные пароли не совпадают</p>
        ) : (
          ""
        )}
        <span className="hidden">
          {errors.email && toast.error(errors.email?.message || "")}
          {errors.password && toast.error(errors.password?.message || "")}
          {errors.name && toast.error(errors.name?.message || "")}
          {errors.submitPassword &&
            toast.error(errors.submitPassword?.message || "")}
        </span>
        <div className="flex flex-col gap-[30px] items-center">
          <input type="submit" value="Регистрация" className="btnGradient" />
          <p className="mx-auto">
            Уже есть аккаунт ?{" "}
            <Link to="/login" className="text-blue">
              Войдите
            </Link>
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default Registartion;
