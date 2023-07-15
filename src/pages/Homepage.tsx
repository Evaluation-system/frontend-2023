import { FC } from "react";
import HomepageHeader from "components/Section/HomePage/HomepageHeader";
import HomepageGuide from "components/Section/HomePage/HomepageGuide";
import HomepageGetStart from "components/Section/HomePage/HomepageGetStart";
import HomepageFooter from "components/Section/HomePage/HomepageFooter";

const Homepage: FC = () => {
  return (
    <section className="flex flex-col  ">
      <HomepageHeader />
      <HomepageGuide />
      <HomepageGetStart />
      <HomepageFooter />
    </section>
  );
};

export default Homepage;
