import { BiLogIn } from "react-icons/bi";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import { useAuth } from "hooks/useAuth";
import CreateProject from "pages/CreateProject";
import { openCreate } from "store/ui/ui.slice";
import CheckAuthCreateButton from "components/ui/CheckAuthCreateButton";

const Header: FC = () => {
  const isAuth = useAuth();

  // const navigate = useNavigate();
  const UserData = useAppSelector((state) => state.user.user);

  const openCreateForm = useAppSelector((state) => state.ui.value);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0  py-5 px-8 flex justify-between items-center  backdrop-blur-3xl xl:py-[27px] xl:px-40 z-50`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img
            src="../img/Vector.png"
            alt="Логотип"
            className="w-auto h-auto"
          />
          <p className="hidden xl:flex font-bold uppercase text-xl">
            Community
          </p>
        </Link>
        {/* Меняет положения кнопки и профиля, если авторизован */}
        {isAuth ? (
          <>
            <button className="hidden xl:flex">
              <button
                onClick={() => dispatch(openCreate(true))}
                className="btnGradient"
              >
                Создать проект
              </button>
            </button>
            <Link to="/profile" className="flex gap-[10px] items-center">
              <img
                src="../../img/proj.jpg"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="hidden xl:flex">{UserData?.email}</span>
              <span className="hidden xl:flex">
                <BiLogIn />
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="flex gap-[10px] items-center">
              Войти
              <BiLogIn />
            </Link>
            <button className="hidden xl:flex">
              <CheckAuthCreateButton />
            </button>
          </>
        )}
      </header>
      {openCreateForm && <CreateProject />}
    </>
  );
};

export default Header;
