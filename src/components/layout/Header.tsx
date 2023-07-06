import Button from "../ui/Button";
import { BiEdit, BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks/hooks";
import { logout } from "../../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { toast, Toaster } from "react-hot-toast";
import CreateProject from "../../pages/CreateProject";
import Login from "../../pages/Login";

const Header: FC = () => {
  const isAuth = useAuth();

  const navigate = useNavigate();

  return (
    <header className="py-5 px-8 flex justify-between items-center mb-6 xl:py-[27px] xl:px-0 ">
      <Toaster />
      <Link to="/">
        <h3>Logo</h3>
      </Link>
      {isAuth ? (
        <span
          className="flex gap-[10px] items-center pl-28 text-blue cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          Профиль
          <CgProfile />
        </span>
      ) : (
        <Link to="/login" className="flex gap-[10px] items-center pl-28">
          Войти
          <BiLogIn />
        </Link>
      )}
      <Link to="/create" className="btnGradient">
        Создать проект
      </Link>
    </header>
  );
};

export default Header;
