import { AiOutlineEdit } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FC, useState } from "react";
import { logout } from "../store/user/userSlice";
import { NavLink } from "react-router-dom";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast, Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../api/project.api";
import { useNavigate } from "react-router";

const ProfilePage: FC = () => {
  //Для навигации
  const navigate = useNavigate();

  //Сюда соем пользователя
  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id;
  const { isLoading, data, error } = useGetProjectsQuery(undefined, {
    skip: !userId,
  });
  const [deleteProject, response] = useDeleteProjectMutation();

  //Выход из профиля
  const dispatch = useAppDispatch();
  const handleExitAccout = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    toast.success("Вы вышли из аккаунта");
    navigate("/");
  };

  //Юзер, для прогрузки его почты, имени и телефона
  const UserData = useAppSelector((state) => state.user.user);

  return (
    <section className="flex flex-col gap-20 bg-opacity-70 bg-primary px-0 py-7 xl:px-32 xl:py-12  ">
      <Toaster />
      <section className="flex flex-col mx-auto text-center xl:mx-0 xl:text-start xl:flex-row flex-nowrap gap-5 items-center">
        {/* Пока нет бэка */}
        <img
          className="rounded-full w-[100px] h-[100px] object-cover mx-auto xl:mx-0"
          src="https://multsforkids.ru/data/uploads/personaji/barash/barash-kartinki-2.jpg"
        />

        {/* Когда будет бэк */}
        {/* <img
              className="rounded-full max-w-[100px] m-8"
              src={user?.photo}
            /> */}

        <article className="mt-8">
          <div className="mb-3">
            {/* Пока нет бэка */}
            <h3>Имя Имевское</h3>

            {/* Когда будет бэк */}
            {/* <h3>{user?.name}</h3> */}
          </div>

          <div className="text-[#FFFFFF] opacity-50 flex flex-nowrap mb-3 gap-[5px] items-center">
            <p>{UserData?.email}</p>
            <BsDot />
            {/* Пока нет бэка */}
            <div>+79996669669</div>

            {/* Когда будет бэк */}
            {/* <div>{user?.phone}</div> */}
          </div>

          <span
            className="flex gap-[10px] items-center text-blue cursor-pointer mb-3"
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

      <section>
        {isLoading ? (
          <p>Идёт загрузка проектов...</p>
        ) : data ? (
          <ol className="flex flex-col gap-3 font-light text-lg">
            {data.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-gray border-b-2 pb-3 px-6"
              >
                <NavLink
                  to={`/project/${item.id}`}
                  className="max-w-[500px] overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {item.id}. <span className="">{item.title}</span>
                </NavLink>
                <button
                  className="text-red cursor-pointer"
                  onClick={async () => {
                    const test = await deleteProject(item.id).then((respon) => {
                      console.log(respon);
                    });
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-secondary opacity-50 m-60">
            Нет созданных проектов :(
          </p>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
