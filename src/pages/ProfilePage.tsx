import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { instance } from "../api/axios.api";



const ProfilePage: FC = () => {

  //Для навигации
  const navigate = useNavigate();

  //Сюда соем проекты
  const [projects, setProjects] = useState([])

  //Удаление проекта
  const deleteProject = async (id) => {
    const response = await instance.delete(`http://localhost:3005/projects/${id}`)
  }
  //Рендер проектов
  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("http://localhost:3005/projects")
      setProjects(response.data)
    }
    fetchData()
  }, [deleteProject])


  return (
    <section className="bg-primary p-6">
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
    </section>
  );
};

export default ProfilePage;
