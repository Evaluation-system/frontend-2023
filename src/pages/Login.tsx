import * as yup from "yup";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import { AuthService } from "../services/auth.service";
import { FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/user/userSlice";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { SubmitHandler, useForm } from "react-hook-form";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../store/hooks/hooks";
import { useAuth } from "../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";

type Form = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const schema = yup.object({
    email: yup
      .string()
      .required("Поле «Почта» обязательна")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Почта не валидна"),
    password: yup.string().required("Поле «Пароль» обязательна"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { email, password } = data;
    const response = await AuthService.login({ email, password });
    if (response) {
      setTokenToLocalStorage("token", response.token);
      dispatch(login(response));
      toast.success("Вы авторизированы");
      navigate("/");
    }
    try {
    } catch (error) {}
    reset();
  };

  const isAuth = useAuth();

  return (
    <>
      {!isAuth ? (
        <Modal>
          <header className="flex justify-between items-center">
            <h3>Добро пожаловать</h3>
            <button onClick={() => navigate(-1)}>
              <TfiClose />
            </button>
          </header>
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="email"
              type="email"
              placeholder="Почта"
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
            <Input
              id="password"
              type="password"
              placeholder="Пароль"
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />
            <div className="flex flex-col gap-[30px] items-center ">
              <input type="submit" value="Войти" className="btnGradient" />
              <p className="text-center">
                У вас нет аккаунта ?{" "}
                <Link to="/register" className="text-blue">
                  Зарегистрируйтесь
                </Link>
              </p>
            </div>
          </form>
        </Modal>
      ) : (
        <Navigate to="/profile" replace={true} />
      )}
    </>
  );
};

export default Login;
