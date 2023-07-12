import { BiLogIn } from "react-icons/bi";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/hooks";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";

const Header: FC = () => {
  const isAuth = useAuth();

  // const navigate = useNavigate();
  const UserData = useAppSelector((state) => state.user.user);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 py-5 px-8 flex justify-between items-center xl:py-[27px] xl:px-40  z-50 ${
        isScrolled ? "bg-primary" : "bg-transparent"
      }`}
      initial={{ backgroundColor: "transparent" }}
      animate={{ backgroundColor: isScrolled ? "#1B1B23" : "transparent" }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center gap-3">
        <img src="../img/Vector.png" alt="Логотип" className="w-auto h-auto" />
        <p className="hidden xl:flex font-bold uppercase text-xl">Community</p>
      </Link>

      {/* Меняет положения кнопки и профиля, если авторизован */}
      {isAuth ? (
        <>
          <button className="hidden xl:flex">
            <Link to="/create" className="btnGradient">
              Создать проект
            </Link>
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
            <Link to="/create" className="btnGradient">
              Создать проект
            </Link>
          </button>
        </>
      )}
    </motion.header>
  );
};

export default Header;
