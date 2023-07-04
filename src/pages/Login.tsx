import Modal from "../components/ui/Modal";
import {FC} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import {AuthService} from "../services/auth.service";
import {setTokenToLocalStorage} from "../helpers/localstorage.helper";
import {useAppDispatch} from "../store/hooks/hooks";
import {login} from "../store/user/userSlice";
import {useAuth} from "../hooks/useAuth";

type Form = {
    email: string;
    password: string;
};

const Login: FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<Form>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Form> = async (data) => {
        const {email, password} = data;
        const response = await AuthService.login({email, password});
        if (response) {
            setTokenToLocalStorage("token", response.token);
            const dispatch = useAppDispatch();
            dispatch(login(response));
            toast.success("Вы авторизированы");
            navigate("/");
        }
        try {
        } catch (error) {
        }
        reset();
    };

    const isAuth = useAuth();

    return (
        <>
            {!isAuth ?
                <Modal>
                    {/*<Toaster/>*/}
                    <form
                        className="flex flex-col gap-[50px]"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            {...register("email", {required: "Поле «Почта» обязательно"})}
                            placeholder="Почта"
                            type="email"
                        />
                        {errors.email && <div className="text-red" >{errors.email.message || ""}</div>}

                        <input
                            {...register("password", {required: "Поле «Пароль» обязательно"})}
                            placeholder="Пароль"
                            type="password"
                        />
                        {errors.password && <div className="text-red">{errors.password.message || ""}</div>}


                        <div className="flex flex-col gap-[30px] items-center ">
                            <input type="submit" value="Войти" className="btnGradient"/>
                            <p className="text-center">
                                У вас нет аккаунта ?{" "}
                                <Link to="/register" className="text-blue">
                                    Зарегистрируйтесь
                                </Link>
                            </p>
                        </div>
                    </form>
                </Modal>
                : <Navigate to="/profile" replace={true}/>
            }

        </>
    );
};

export default Login;
