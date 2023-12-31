import { FC } from "react";
import { BiSupport } from "react-icons/bi";
import { ImPower } from "react-icons/im";
import { PiLinkSimpleBold } from "react-icons/pi";
import { SiSecurityscorecard } from "react-icons/si";
import { motion } from "framer-motion";
interface IItem {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
}
type Props = {
  item: IItem;
};
const HomepageChoseUsItem: FC<Props> = ({ item }) => {
  const { id, title, description, imgSrc } = item;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex flex-col gap-10"
    >
      <article className="flex flex-col gap-5 w-[500px]">
        <h2 className="text-secondary font-extrabold flex gap-2 items-center whitespace-nowrap">
          {id === 1 ? (
            <PiLinkSimpleBold />
          ) : id === 2 ? (
            <ImPower />
          ) : id === 3 ? (
            <BiSupport />
          ) : (
            <SiSecurityscorecard />
          )}
          {title}
        </h2>
        <p className="text-lg">{description}</p>
      </article>{" "}
      <div className="relative z-10">
        <img
          src={imgSrc}
          alt={title}
          className="cursor-pointer h-[300px] w-full object-cover rounded-lg border-solid border-[1px] border-gray"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-bl from-purple-950 via-blue to-transparent mix-blend-multiply opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
      </div>
    </motion.section>
  );
};

export default HomepageChoseUsItem;
