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
  useGetUserProjectsQuery,
  useDeleteProjectMutation,
} from "../api/project.api";
import { useNavigate } from "react-router";

const ProfilePage: FC = () => {
  //Для навигации
  const navigate = useNavigate();

  //Сюда соем пользователя
  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id;
  const { isLoading, data, error } = useGetUserProjectsQuery(userId, {
    skip: !userId,
  });
  const [deleteProject, response] = useDeleteProjectMutation();

  console.log(userId);
  console.log(data);

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

      <section>
        {isLoading ? (
          <p>Идёт загрузка проектов...</p>
        ) : data?.length > 0 ? (
          <ol className="flex flex-col gap-3 font-light text-lg">
            {data.map((item, index) => (
              <li
                key={item.id}
                className="flex justify-between border-gray border-b-2 pb-3 px-6"
              >
                <NavLink
                  to={`/project/${item.id}`}
                  className="max-w-[500px] overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  <span>{index + 1}. </span>
                  <span className="">{item.title}</span>
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
        ) : error ? (
          <div>Error</div>
        ) : (
          <p className="text-center text-secondary opacity-50 m-40">
            Нет созданных проектов :(
          </p>
        )}
        dd
      </section>
    </section>
  );
};

export default ProfilePage;
