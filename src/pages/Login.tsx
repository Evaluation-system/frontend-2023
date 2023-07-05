import Modal from "../components/ui/Modal";
import { FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthService } from "../services/auth.service";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks/hooks";
import { login } from "../store/user/userSlice";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Form = {
  email: string;
  password: string;
};

const Login: FC = () => {

    // const schema = yup.object({
    //     email:
    // })

  const {
    register,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data) => {
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
          {/*<Toaster/>*/}
          <form
            className="flex flex-col gap-[50px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="email"
              type="email"
              placeholder="Почта"
              register={{ ...register("email") }}
            />
            <Input
              id="password"
              type="password"
              placeholder="Пароль"
              register={{ ...register("password") }}
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
