import { FC } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { openCreate } from "store/ui/ui.slice";

const CheckAuthCreateButton: FC = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <section>
      {isAuth ? (
        <button
          onClick={() => dispatch(openCreate(true))}
          className="btnGradient "
        >
          Создать проект
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="btnGradient ">
          Создать проект
        </button>
      )}
    </section>
  );
};

export default CheckAuthCreateButton;
