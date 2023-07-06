import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { instance } from "../api/axios.api";
import { useAppSelector } from "../store/hooks/hooks";
import { BsDot } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

const ProfilePage: FC = () => {
  //Для навигации
  const navigate = useNavigate();

  //Сюда соем проекты
  const [projects, setProjects] = useState([]);

  //Удаление проекта
  const deleteProject = async (id) => {
    const result = await instance.delete(
      `http://localhost:3005/projects/${id}`
    );
    console.log(result);
  };
  //Рендер проектов
  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("http://localhost:3005/projects");
      setProjects(response.data);
    };
    fetchData();
  }, []);

  //Сюда соем пользователя
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <section className="bg-primary p-6">
        <section className="flex flex-nowrap">
          <div>
            {/* Пока нет бэка */}
            <img
              className="rounded-full w-[100px] h-[100px] m-8 object-cover"
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
              {/* Пока нет бэка */}
              <div>plachu-na-tehno@gmail.com</div>

              {/* Когда будет бэк */}
              {/* <div>{user?.email}</div> */}

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
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 15.2862H18V16.56H0V15.2862ZM15.0429 4.45846C15.5571 3.94892 15.5571 3.18462 15.0429 2.67508L12.7286 0.382154C12.2143 -0.127385 11.4429 -0.127385 10.9286 0.382154L1.28571 9.936V14.0123H5.4L15.0429 4.45846ZM11.8286 1.27385L14.1429 3.56677L12.2143 5.47754L9.9 3.18462L11.8286 1.27385ZM2.57143 12.7385V10.4455L9 4.07631L11.3143 6.36923L4.88571 12.7385H2.57143Z"
                  fill="#4383FF"
                />
              </svg>
            </span>
          </article>
        </section>

        <article>
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
        </article>
      </section>

      {/* СТАРОЕ */}
      {/* <section className="bg-primary p-6">
      <h3>Страница пользователя</h3>
      <p>Список проектов: </p>

      {projects.length > 0 ? (
        <div>
          {projects.map((item) => (
            <div>
              <p onClick={() => navigate(`/project/${item.id}`)}>
                {item.title}
              </p>
              <p
                className="text-red"
                onClick={() => deleteProject(item.id)}
              >
                Удалить проект
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Проекты не найдены</p>
      )}
    </section> */}
    </>
  );
};

export default ProfilePage;
