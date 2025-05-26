import Header from "../Common/Header";
import EnergyHome from "../Common/EnergyHome";
import Internship from "./Internship";
import DownloadBanner from "../Common/DownloadBanner";
import Residential from "../Common/Residential";
import NewFlash from "../Common/NewFlash";
import Footer from "../Footer";
import WordPressWrapper from "../WordPressWrapper";
import MotionImages from "../Common/MotionImages";
import residential from "../../../assets/wordpress/residential-1.png";
import commercial from "../../../assets/wordpress/commercial-1.png";
import industrial from "../../../assets/wordpress/industrial-1.png";
const data = {
  title: "ABOUT ENERGHX",
  des: "  ENERGHX™ releases a new platform for thermal comfort modelling, indoor air quality analysis, and smart energy management of energy consumption in every built environment. Its EnerghxPlus software isa mobile or web app that promotes energy transition and the adoptionof electric mobility with a net-zero energy management system.",
  link: false,
};

const cardTitle = [
  { title: "Residential", img: residential },
  { title: "COMMERCIAL", img: commercial },
  { title: "INDUSTRIAL", img: industrial },
];
const lists = [
  "DEMAND SIDE MONITORING",
  "SMART POWER FOR BUSINESS",
  "SMART GAS FOR BUSINESS",
];

const AboutUs: React.FC = () => {
  return (
    <div className="">
      <div className=" md:bg-[#2b2b2b]">
        <WordPressWrapper>
          <Header />
        </WordPressWrapper>
      </div>

      <MotionImages title="ABOUT US" />
      <EnergyHome data={data} />
      <WordPressWrapper className="pb-16">
        <Internship />
      </WordPressWrapper>
      <DownloadBanner />
      <Residential cardTitle={cardTitle} lists={lists} />
      <NewFlash />
      <Footer />
    </div>
  );
};

export default AboutUs;
