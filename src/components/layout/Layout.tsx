import Header from "./Header";
import { FC } from "react";
import { Outlet } from "react-router-dom";
const Layout: FC = () => {
  return (
    <>
      <section className="containerMain">
        <Header />
        <Outlet />
      </section>
      <img
        src="../img/bg/left.png"
        className="hidden xl:flex absolute top-[80px] left-0 z-[-1]"
      />
      <img
        src="../img/bg/right.png"
        className="hidden xl:flex absolute top-[300px] right-0 z-[-1]"
      />
      <img
        src="../img/bg/girds.webp"
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-full z-[-1] object-cover"
      />
      <img
        src="../img/bg/bgHome.jpg"
        className="flex fixed top-0 bottom-0 right-0 left-0 h-full w-full z-[-2] object-cover"
      />
    </>
  );
};

export default Layout;
