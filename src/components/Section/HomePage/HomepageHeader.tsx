import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import { openCreate } from "store/ui/ui.slice";
import CreateProject from "pages/CreateProject";
import CheckAuthCreateButton from "components/ui/CheckAuthCreateButton";

const HomepageHeader: FC = () => {
  const [text, cycleText] = useCycle("превосходству", "успеху", "достижению");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleText();
    }, 2000);

    return () => clearInterval(interval);
  }, [cycleText]);

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const openCreateForm = useAppSelector((state) => state.ui.value);
  const navigate = useNavigate();
  return (
    <>
      <section className="relative h-[800px] w-full bg-[#090909] pt-32">
        <motion.main
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 flex flex-col gap-[60px] text-center items-center pt-[150px] pb-[150px] containerMain"
        >
          <div className="flex flex-col gap-5 px-5 xl:px-0  ">
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
                    ? "text-[#d63031]"
                    : "text-[#e84393]"
                }
              >
                {text}
              </motion.span>
            </h1>
            <h3 className="slug">создайте свой первый проект</h3>
          </div>
          <CheckAuthCreateButton />
        </motion.main>
        <img
          src="../img/bg/left.png"
          className="hidden xl:flex absolute top-[80px] left-0 opacity-40"
        />
        <img
          src="../img/bg/right.png"
          className="hidden xl:flex absolute top-[300px] right-0  opacity-40"
        />
        <img
          src="../img/bg/girds.webp"
          className="fixed top-0 bottom-0 right-0 left-0 h-full w-full object-cover "
        />
        {/* <img
          src="../img/bg/bgHome.jpg"
          className="flex fixed top-0 bottom-0 right-0 left-0 h-full w-full object-cover opacity-30"
        /> */}
      </section>
      {openCreateForm && <CreateProject />}
    </>
  );
};

export default HomepageHeader;
