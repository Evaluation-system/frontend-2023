import { FC, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

import { AiOutlineEdit } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { instance } from "../api/axios.api";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { useGetProjectsQuery } from "../api/api";
import { useNavigate } from "react-router";

const ProfilePage: FC = () => {
  //Для навигации
  const navigate = useNavigate();

  //Сюда соем проекты
  const [projects, setProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  //Удаление проекта
  const deleteProject = async (id) => {
    const result = await instance.delete(
      `http://localhost:3005/projects/${id}`
    );
    console.log(result);
  };
  //Рендер проектов (старое)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await instance.get("http://localhost:3005/projects");
  //     setProjects(response.data);
  //   };
  //   fetchData();
  // }, []);

  //Рендер проектов через другой апи (RTK Query)
  // useEffect(() => {
  //   const { isLoading, data, error } = useGetProjectsQuery();
  //   setProjects(data);
  //   setIsLoading(isLoading);

  //   console.log("project data:");
  //   console.log(data);
  // }, []);

  //Сюда соем пользователя
  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id;
  const { isLoading, data, error } = useGetProjectsQuery(undefined, {
    skip: !userId,
  });

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
    <section className="flex flex-col gap-20 bg-primary px-32 py-12 ">
      <Toaster />
      <section className="flex flex-nowrap gap-5 items-center">
        <div>
          {/* Пока нет бэка */}
          <img
            className="rounded-full w-[100px] h-[100px] object-cover"
            src="https://multsforkids.ru/data/uploads/personaji/barash/barash-kartinki-2.jpg"
          />

          {/* Когда будет бэк */}
          {/* <img
              className="rounded-full max-w-[100px] m-8"
              src={user?.photo}
            /> */}
        </div>

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
      {/* Проекты через старый АПИ */}
      {/* <article>
        {projects.length > 0 ? (
          <div>
            {projects.map((item) => (
              <div className=" flex flex-nowrap items-center ml-8 mb-5 border-b-2">
                <p
                  className="text-[#FFFFFF] opacity-50 cursor-pointer w-full"
                  onClick={() => navigate(`/project/${item.id}`)}
                >
                  {item.id < 10
                    ? `0${item.id} ${item.title}`
                    : `${item.id} ${item.title}`}
                </p>

                <p
                  className="text-red cursor-pointer"
                  onClick={() => deleteProject(item.id)}
                >
                  <FaRegTrashAlt />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#FFFFFF] opacity-50 m-60">
            Нет созданных проектов :(
          </p>
        )}
      </article> */}

      {/* Проекты через новый АПИ (RTK Query) */}
      <section>
        {isLoading ? (
          <p>Идёт загрузка проектов...</p>
        ) : data ? (
          <ol className="flex flex-col gap-3 font-light text-lg">
            {data.map((item) => (
              <li className="flex justify-between border-gray border-b-2 pb-3">
                <NavLink to={`/project/${item.id}`}>
                  {item.id}. {item.title}
                </NavLink>
                <button
                  className="text-red cursor-pointer"
                  onClick={() => deleteProject(item.id)}
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
