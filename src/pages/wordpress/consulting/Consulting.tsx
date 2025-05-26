import DownloadBanner from "../Common/DownloadBanner";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import MotionImages from "../Common/MotionImages";
import NewFlash from "../Common/NewFlash";
import ResearchAndConsulting from "../Common/ResearchAndConsulting";
import InternshipSection from "../Common/InternshipSection";
import WordPressWrapper from "../WordPressWrapper";
import EnergyHome from "../Common/EnergyHome";
const data = {
  title: "ENERGHX HOME",
  des: "  ENERGHX™ releases a new platform for thermal comfort modelling, indoor air quality analysis, and smart energy management of energyconsumption in every built environment. Its EnerghxPlus software isa mobile or web app that promotes energy transition and the adoptionof electric mobility with a net-zero energy management system.",
  link: true,
};
const Consulting = () => {
  return (
    <>
      <WordPressWrapper>
        <Header />
      </WordPressWrapper>
      <MotionImages title="ENERGHX CONSULTING" />
      <EnergyHome data={data} />

      <ResearchAndConsulting />

      <DownloadBanner />
      <InternshipSection />
      <NewFlash />
      <Footer />
    </>
  );
};

export default Consulting;
