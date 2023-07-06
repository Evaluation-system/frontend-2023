import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Homepage: FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col gap-[60px] text-center items-center pt-[150px]"
    >
      <div className="flex flex-col gap-5 px-5 xl:px-0 ">
        <h1 className="slug">
          Знание рисков – ключ к проектному превосходству!
        </h1>
        <h3 className="slug">создайте свой первый проект</h3>
      </div>
      <Link to="/create" className="btnGradient">
        Создать проект
      </Link>
    </motion.main>
  );
};

export default Homepage;
