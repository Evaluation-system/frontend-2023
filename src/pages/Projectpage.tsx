import { FC } from "react";
import ProjectSection from "../components/layout/ProjectSection";
import { useParams } from "react-router";
import { useAppSelector } from "../store/hooks/hooks";
const Projectpage: FC = () => {
  const { title } = useParams();
  const project = useAppSelector((state) => state.project.items);
  return (
    <section className="bg-primary p-5">
      <h2>{title}</h2>
      <h3>Мой проект по технологии</h3>
      <section className="flex gap-28">
        <p className="text-gray font-light max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ip
        </p>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p>Стоимость</p>
            <span>190 000₽</span>
          </div>
          <div>
            <p>Сроки:</p>
            <span>26 рабочих дней (~36 календарных дней)</span>
          </div>
        </div>
      </section>
      <section>
        <ProjectSection />
      </section>
    </section>
  );
};

export default Projectpage;
