import { FC, useState } from "react";
import ProfileUser from "./ProfileUser";
import ProfileProjectList from "./ProfileProjectList";

const ProfilePage: FC = () => {
  const [chooseCategory, setChooseCategory] = useState(0);

  const category = [
    {
      id: 1,
      title: "Проекты",
    },
    {
      id: 2,
      title: "Профиль",
    },
  ];

  return (
    <section className="flex flex-col gap-5 bg-opacity-70 bg-primary py-7 xl:px-32 xl:py-12 mt-40 ">
      <ul className="flex  gap-10 text-xl font-geo font-bold ">
        {category.map((item) => (
          <li
            key={item.id}
            onClick={(): void => setChooseCategory(item.id)}
            className={
              chooseCategory === item.id
                ? "text-blue cursor-pointer"
                : "cursor-pointer"
            }
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div className="w-full h-[1px] bg-gray" />

      <section className="pt-10">
        {chooseCategory === 2 ? <ProfileUser /> : <ProfileProjectList />}
      </section>
    </section>
  );
};

export default ProfilePage;
