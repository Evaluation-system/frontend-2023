import { FC } from "react";
import { choseUsData } from "data/Homepage/ChoseUs.data";
import HomepageChoseUsItem from "./ChoseUs/HomepageChoseUsItem";

const HomepageChooseUs: FC = () => {
  return (
    <section className="relative bg-[#000] overflow-hidden ">
      <div className="flex flex-col gap-40 container mx-auto py-40 ">
        <h2 className="relative font-geo font-extrabold text-[50px] w-1/2 text-center mx-auto z-10 leading-tight">
          Почему пользователи выбирают нас ?
        </h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-32 items-center ">
          {choseUsData.map((item) => (
            <HomepageChoseUsItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageChooseUs;
