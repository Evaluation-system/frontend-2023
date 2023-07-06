import { BiLogIn } from "react-icons/bi";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/hooks";
import { useAuth } from "../../hooks/useAuth";

const Header: FC = () => {
  const isAuth = useAuth();

  // const navigate = useNavigate();
  const UserData = useAppSelector((state) => state.user.user);
  return (
    <header className="py-5 px-8 flex justify-between items-center mb-6 xl:py-[27px] xl:px-0 ">
      <Link to="/" className="flex items-center gap-3">
        <img src="./img/Vector.png" alt="Логотип" />
        <p className="font-bold uppercase text-xl">Community</p>
      </Link>
      {isAuth ? (
        <>
          <Link to="/create" className="btnGradient">
            Создать проект
          </Link>
          <Link to="/profile" className="flex gap-[10px] items-center">
            <img
              src="../img/proj.jpg"
              className="w-10 h-10 rounded-full object-cover"
            />
            {UserData?.email}
            <BiLogIn />
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="flex gap-[10px] items-center">
            Войти
            <BiLogIn />
          </Link>
          <Link to="/create" className="btnGradient">
            Создать проект
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
