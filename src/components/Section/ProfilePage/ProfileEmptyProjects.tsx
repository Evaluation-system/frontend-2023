import { FC } from "react";
import { Link } from "react-router-dom";

const ProfileEmptyProjects: FC = () => {
  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <h2>Проектов пока нет!</h2>
      <div>
        <Link
          to="/create"
          className="py-3 px-5 bg-secondary text-primary rounded-lg"
        >
          Создать Новый Проект
        </Link>
      </div>
    </section>
  );
};

export default ProfileEmptyProjects;
