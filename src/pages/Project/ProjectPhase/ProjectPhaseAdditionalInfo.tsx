import { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import AreaChart from "components/ui/AreaChart";
import PieChart from "components/ui/PieChart";
import LineChartGradient from "components/ui/LineChartGradient";

type Props = {
  totalDays: number;
  totalTasks: number;
  dataTasks: any;
};

const ProjectPhaseAdditionalInfo: FC<Props> = ({
  totalDays,
  totalTasks,
  dataTasks,
}) => {
  const [openSection, setOpenSection] = useState(false);

  return (
    <section className="flex flex-col gap-5">
      <h5
        className="flex gap-2 items-center cursor-pointer"
        onClick={(): void => setOpenSection(!openSection)}
      >
        Дополнительная информация
        {openSection ? (
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown />
          </motion.span>
        ) : (
          <motion.span
            initial={{ rotate: 180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown />
          </motion.span>
        )}
      </h5>
      <AnimatePresence>
        {openSection && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
            className="flex flex-col gap-10"
          >
            <section className="flex flex-col gap-10">
              <div className="flex gap-10 items-center">
                <AreaChart dataTasks={dataTasks} />
                <PieChart dataTasks={dataTasks} />
              </div>
              {/* <LineChartGradient dataTasks={dataTasks} /> */}
            </section>
            <div>
              <p>Количество задач: {totalTasks}</p>
              <p>Общее кол-во дней на выполнение задач: {totalDays}</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectPhaseAdditionalInfo;
