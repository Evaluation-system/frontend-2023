import { FC } from "react";
import ProfileUser from "./ProfileUser";
import ProfileProjectList from "./ProfileProjectList";

const ProfilePage: FC = () => {
  return (
    <section className="flex flex-col gap-20 bg-opacity-70 bg-primary px-0 py-7 xl:px-32 xl:py-12  ">
      <ProfileUser />
      <ProfileProjectList />
    </section>
  );
};

export default ProfilePage;
