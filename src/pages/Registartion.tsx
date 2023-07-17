import * as yup from "yup";
import Input from "components/ui/Input";
import Modal from "components/ui/Modal";
// import { AuthService } from "services/auth.service";
import { FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TfiClose } from "react-icons/tfi";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "api/auth.api";

type Form = {
  name: string;
  email: string;
  password: string;
  submitPassword: string;
};

const Registartion: FC = () => {
  //Валидация
  const schema = yup.object({
    name: yup
      .string()
      .required("Поле «Имя» обязательна")
      .min(4, "Минимальная длина поле «Имя» 4 символа"),
    email: yup
      .string()
      .required("Поле «Почта» обязательна")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Почта не валидна"),
    password: yup
      .string()
      .required("Поле «Пароль» обязательна")
      .min(8, "Минимальная длина поле «Пароль» 8 символов"),
    submitPassword: yup
      .string()
      .required("Поле «Подтвердить пароль» обязательно")
      .oneOf(
        [yup.ref("password")],
        "Поле «Пароль» и «Подтвердить пароль» не совпадают "
      ),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  // const pass: string = watch("password");
  // const subPass: string = watch("submitPassword");
  const navigate = useNavigate();

  const [doRegister, error] = useRegisterMutation();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { email, password, name } = data;

    // try {
    // const response: any = AuthService.registartion({ email, password });

    const registerData = {
      email: email,
      password: password,
    };

    const response = doRegister(registerData);

    console.log("register response");
    console.log(response);

    // if (response) {
    toast.success(`Аккаунт ${name} зарегистрирован`);
    reset();
    navigate("/login");
    //   }
    // } catch (error: any) {
    //   toast.error(error.toString());
    // }

    if (error.isError) {
      console.log("register error");
      console.log(error);

      toast.error(error.toString());
    }
  };

  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        <Navigate to="/profile" replace={true} />
      ) : (
        <Modal>
          <Toaster />
          <header className="flex justify-between items-center">
            <h3>Добро пожаловать</h3>
            <button onClick={() => navigate(-2)}>
              <TfiClose />
            </button>
          </header>
          <form
            className="flex flex-col gap-[50px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="name"
              placeholder="Имя"
              type="text"
              register={{ ...register("name") }}
              errorMessage={errors.name?.message}
            />
            <Input
              id="email"
              placeholder="Почта"
              type="text"
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
            <Input
              id="password"
              placeholder="Пароль"
              type="password"
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />
            <Input
              id="submitPassword"
              placeholder="Подтвердите пароль"
              type="password"
              register={{ ...register("submitPassword") }}
              errorMessage={errors.submitPassword?.message}
            />
            <div className="flex flex-col gap-[30px] items-center">
              <input
                type="submit"
                value="Регистрация"
                className="btnGradient"
              />
              <p className="mx-auto">
                Уже есть аккаунт ?{" "}
                <Link to="/login" className="text-blue">
                  Войдите
                </Link>
              </p>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Registartion;
