import { FC } from "react";
import Button from "../components/ui/Button";

const Homepage: FC = () => {
  return (
    <main className="flex flex-col gap-[60px] text-center items-center pt-[150px]">
      <div className="flex flex-col gap-5 px-5 xl:px-0">
        <h1>Знание рисков – ключ к проектному превосходству!</h1>
        <h4>создайте свой первый проект</h4>
      </div>
      <Button text="Создать проект" style="btn" action="/create" />
    </main>
  );
};

export default Homepage;
