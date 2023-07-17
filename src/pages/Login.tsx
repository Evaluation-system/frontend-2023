import * as yup from "yup";
import Input from "components/ui/Input";
import Modal from "components/ui/Modal";
// import { AuthService } from "services/auth.service";
import { FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "store/user/userSlice";
import { setTokenToLocalStorage } from "helpers/localstorage.helper";
import { SubmitHandler, useForm } from "react-hook-form";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "store/hooks/hooks";
import { useAuth } from "hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "api/auth.api";

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

  const [doLogin, error] = useLoginMutation();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { email, password } = data;

    // const response = await AuthService.login({ email, password });

    const loginData = {
      email: email,
      password: password,
    };

    const response = await doLogin(loginData);

    console.log("login response");
    console.log(response);

    if (response?.data) {
      // setTokenToLocalStorage("token", response.token);

      dispatch(login(response?.data));

      toast.success("Вы авторизированы");
      navigate("/");
    }
    // try {
    // } catch (error) {}

    if (error?.isError) {
      console.log("login error");
      console.log(error);
    }

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
