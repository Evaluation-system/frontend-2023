import { FC } from "react";
import { Link } from "react-router-dom";

const Homepage: FC = () => {
  return (
    <main className="flex flex-col gap-[60px] text-center items-center pt-[150px]">
      <div className="flex flex-col gap-5 px-5 xl:px-0">
        <h1>Знание рисков – ключ к проектному превосходству!</h1>
        <h4>создайте свой первый проект</h4>
      </div>
      <Link to="/create" className="btnGradient">
        Создать проект
      </Link>
    </main>
  );
};

export default Homepage;
