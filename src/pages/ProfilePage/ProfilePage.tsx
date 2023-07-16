import { FC, useState } from "react";
import ProfileUser from "./ProfileUser";
import ProfileProjectList from "./ProfileProjectList";
import { motion } from "framer-motion";

const ProfilePage: FC = () => {
  const [chooseCategory, setChooseCategory] = useState(1);

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
    <section className="flex flex-col  bg-opacity-70 bg-primary py-7 xl:px-32 xl:py-12 mt-40 ">
      <ul className="flex  gap-10 text-xl font-geo font-bold items-center">
        {category.map((item) => (
          <li
            key={item.id}
            onClick={(): void => setChooseCategory(item.id)}
            className={
              chooseCategory === item.id
                ? "relative rounded-3xl px-3 py-1.5  cursor-pointer"
                : "cursor-pointer px-3 py-1.5"
            }
          >
            {chooseCategory === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-secondary mix-blend-exclusion"
                transition={{ duration: 0.5 }}
              />
            )}

            {item.title}
          </li>
        ))}
      </ul>
      <div className="w-full h-[1px] bg-gray mt-10" />

      <section className="pt-10">
        {chooseCategory === 2 ? <ProfileUser /> : <ProfileProjectList />}
      </section>
    </section>
  );
};

export default ProfilePage;
