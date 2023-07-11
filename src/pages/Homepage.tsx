import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";

const Homepage: FC = () => {
  const [text, cycleText] = useCycle("превосходству", "успеху", "достижению");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleText();
    }, 2000);

    return () => clearInterval(interval);
  }, [cycleText]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col gap-[60px] text-center items-center pt-[150px]"
    >
      <div className="flex flex-col gap-5 px-5 xl:px-0 ">
        <h1 className="">
          Знание рисков – ключ к проектному{" "}
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={
              text === "превосходству"
                ? "text-blue"
                : text === "успеху"
                ? "text-red"
                : "text-[#e84393]"
            }
          >
            {text}
          </motion.span>
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
