import { FC } from "react";
import { HiArrowSmallRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomepageGetStart: FC = () => {
  return (
    <section className="relative bg-[#000] overflow-hidden">
      <div className="container mx-auto py-40 ">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
          className="relative font-geo font-extrabold text-[50px] w-1/2 text-center mx-auto z-10 leading-tight"
        >
          Воплотите свои уникальные идеи в реальность - создайте свой
          собственный проект и оставьте свой след в мире.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mt-20"
        >
          <div className="relative group  z-10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e84393] animate-tilt  to-[#6c5ce7] rounded-lg blur-sm opacity-75 group-hover:opacity-100 transistion duration-200"></div>
            <button className="relative bg-[#000] rounded-lg">
              <Link
                to="/create"
                className="flex gap-5 text-[20px] p-5 font-geo font-extralight  "
              >
                Cоздайте свой первый проект
                <span>|</span>
                <span className="flex gap-2 text-blue items-center group-hover:text-[#555] transistion duration-200">
                  Начать <HiArrowSmallRight />
                </span>
              </Link>
            </button>
          </div>
        </motion.div>
      </div>

      <img
        src="../img/bg/girds.webp"
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-full object-cover "
      />
      <img
        src="../img/bg/bgMount.jpg"
        className="absolute flex top-0 bottom-0 right-0 left-0 h-full w-full object-cover opacity-20 "
      />
    </section>
  );
};

export default HomepageGetStart;
