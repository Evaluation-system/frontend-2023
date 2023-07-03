import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { useNavigate } from "react-router";
import { deleteProject } from "../store/projects/projectSlice";

const ProfilePage: FC = () => {
  const projects = useAppSelector((state) => state.project.items);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="bg-primary p-6">
      <h3>Страница пользователя</h3>
      <p>Список проектов: </p>
      {projects.length > 0 ? (
        <div>
          {projects.map((item) => (
            <div>
              <p onClick={() => navigate(`/project/${item.title}`)}>
                {item.title}
              </p>
              <p
                className="text-red"
                onClick={() => dispatch(deleteProject(item.title))}
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
