import { FC, useState, useEffect } from "react";
import { AiFillControl } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { IoCheckmarkSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const HomepageGuide: FC = () => {
  const words = [
    "От",
    "идеи",
    "к",
    "оценке:",
    "как",
    "начать",
    "работу",
    "с",
    "оценкой",
    "проектов",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 850);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <section className="relative text-secondary bg-[#111111] py-40">
      <div className="container mx-auto">
        <section className="flex flex-col gap-[100px]">
          <h2 className="text-secondary text-[50px] mx-auto text-center font-black font-geo w-[700px]">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ color: "white" }}
                animate={{
                  color: index === currentWordIndex ? "#0984e3" : "white",
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </h2>
          <section className="relative grid grid-cols-2 items-center gap-56">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="../img/bg/firstScreen.png"
                className="relative z-[10] shadow-2xl"
              />
              <img
                src="../img/bg/secondScreen.png"
                className="absolute top-20  left-20 shadow-2xl z-[1]"
              />
            </motion.div>

            <motion.section
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              className="flex flex-col gap-36 max-w-[500px] font-geo font-extralight text-justify"
            >
              <article className="flex flex-col gap-5">
                <h2 className="text-secondary font-extrabold flex gap-2 items-center">
                  <AiFillControl />
                  Управление проектами
                </h2>
                <p className="text-lg">
                  Изучите возможности авторизации, создания новых проектов и
                  определения фаз, чтобы эффективно управлять своими проектами.
                </p>
              </article>
              <article className="flex flex-col gap-5">
                <h2 className="text-secondary font-extrabold flex gap-2 items-center">
                  <TbListDetails />
                  Детали проекта
                </h2>
                <p className="text-lg font-extralight">
                  Детальное определение проекта: добавляйте характеристики,
                  задачи и метрики. Определите характеристики проекта, задачи
                  для каждой фазы и соответствующие метрики, чтобы точно оценить
                  проект и его эффективность.
                </p>
              </article>
              <article className="flex flex-col gap-5">
                <h2 className="text-secondary font-extrabold flex gap-2 items-center whitespace-nowrap">
                  <IoCheckmarkSharp />
                  Получение оценки проекта
                </h2>
                <p className="text-lg ">
                  Оцените свой проект, основываясь на заданных характеристиках,
                  задачах и метриках, и анализируйте результаты, чтобы принять
                  соответствующие решения и рекомендации для его улучшения.
                </p>
              </article>
            </motion.section>
          </section>
        </section>
      </div>
    </section>
  );
};

export default HomepageGuide;
