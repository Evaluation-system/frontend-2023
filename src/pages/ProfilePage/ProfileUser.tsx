import Avatar from "../../components/ui/Avatar";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FC } from "react";
import { logout } from "../../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { useNavigate } from "react-router-dom";

const ProfileUser: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const UserData = useAppSelector((state) => state.user.user);

  const handleExitAccout = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    toast.success("Вы вышли из аккаунта");
    navigate("/");
  };
  return (
    <section className="flex flex-col mx-auto text-center xl:mx-0 xl:text-start xl:flex-row flex-nowrap gap-5 items-center">
      <Avatar />
      <article className="mt-8">
        <div className="mb-3">
          <h3>Имя Имевское</h3>
        </div>
        <div className="text-[#FFFFFF] opacity-50 flex flex-nowrap mb-3 gap-[5px] items-center">
          <p>{UserData?.email}</p>
          <BsDot />
          <div>+79996669669</div>
        </div>
        <span
          className="flex gap-[10px] justify-center items-center text-blue cursor-pointer mb-3 xl:justify-start"
          onClick={() => navigate("/profile")}
        >
          Редактировать профиль
          <AiOutlineEdit />
        </span>
        <button className="text-red" onClick={(): void => handleExitAccout()}>
          Выйти
        </button>
      </article>
    </section>
  );
};

export default ProfileUser;
