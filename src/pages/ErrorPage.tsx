import { FC } from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-20">
      <h2 className="flex flex-col mx-auto mt-[200px] w-[800px] text-center">
        Ой! Здесь пусто... <h2 className="text-red">404 ошибка.</h2> Риски в
        действии! Вернитесь на главную страницу и исследуйте безопасные пути
        успеха!
      </h2>
      <button className="btn" onClick={(): void => navigate(-2)}>
        Назад
      </button>
    </div>
  );
};

export default ErrorPage;
