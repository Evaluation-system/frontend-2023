import { FC, useState, useEffect } from "react";
import ProjectSection from "../components/layout/ProjectSection";
import { useParams } from "react-router";
import { instance } from "../api/axios.api";

const Projectpage: FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);

  // const url = import.meta.env.VITE_URL;


  useEffect(() => {
    const fetchProject = async () => {
      const response = await instance.get(`http://localhost:3005/projects/${id}`);
      setProject(response.data);
    }
    fetchProject();
  }, []);

  return (
    <>
      {project && (
        <section className="bg-primary p-5">
          <h2>{project.title}</h2>
          <section className="flex gap-28">
            <p className="text-gray font-light max-w-xl">
              {project.description}
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
      )}
    </>
  );
};

export default Projectpage;
