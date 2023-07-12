import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useGetUserProjectsQuery,
  useDeleteProjectMutation,
} from "api/project.api";
import { useAppSelector } from "store/hooks/hooks";

const ProfileProjectList: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id;
  const { isLoading, data, error } = useGetUserProjectsQuery(userId, {
    skip: !userId,
  });
  const [deleteProject, response] = useDeleteProjectMutation();

  return (
    <section>
      {isLoading ? (
        <p>Идёт загрузка данных...</p>
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
                  await deleteProject(item.id).then((respon) => {});
                }}
              >
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
        </ol>
      ) : error ? (
        <div>Произошла ошибка</div>
      ) : (
        <p className="text-center text-secondary opacity-50 m-40">
          Нет созданных проектов :(
        </p>
      )}
    </section>
  );
};

export default ProfileProjectList;
