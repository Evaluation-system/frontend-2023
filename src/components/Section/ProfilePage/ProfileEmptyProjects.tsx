import CreateProject from "pages/CreateProject";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import { openCreate } from "store/ui/ui.slice";
const ProfileEmptyProjects: FC = () => {
  const dispatch = useAppDispatch();

  const openCreateForm = useAppSelector((state) => state.ui.value);

  return (
    <>
      {openCreateForm && <CreateProject />}
      <section className="flex flex-col gap-10 items-center justify-center">
        <h2>Проектов пока нет!</h2>
        <div>
          <button
            onClick={() => dispatch(openCreate(true))}
            className="py-3 px-5 bg-secondary text-primary rounded-lg"
          >
            Создать Новый Проект
          </button>
        </div>
      </section>
    </>
  );
};

export default ProfileEmptyProjects;
