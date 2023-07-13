import { FC, useEffect, useState } from "react";
import { instance } from "api/axios.api";
import { IProject } from "types/types";
import { Link } from "react-router-dom";

const AdminPanel: FC = () => {
  const [projects, setProjects] = useState<IProject[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await instance.get<IProject[] | null>("/projects");
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  return (
    <section>
      <h3>Список всех проектов: </h3>
      <ul>
        {projects?.map((item) => (
          <li>
            <Link to={`/project/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AdminPanel;
