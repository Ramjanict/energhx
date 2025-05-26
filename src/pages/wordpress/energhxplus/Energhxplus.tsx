import DownloadBanner from "../Common/DownloadBanner";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import MotionImages from "../Common/MotionImages";
import NewFlash from "../Common/NewFlash";
import Residential from "../Common/Residential";
import WordPressWrapper from "../WordPressWrapper";
import EnergyBody from "./EnergyBody";
import Gallery from "./Gallery";
import residential from "../../../assets/wordpress/residential-1.png";
import commercial from "../../../assets/wordpress/commercial-1.png";
import industrial from "../../../assets/wordpress/industrial-1.png";
const cardTitle = [
  { title: "Solar Energy Conversion", img: residential },
  { title: "Wind Energy Conversion", img: commercial },
  { title: "Biomass Energy Conversion", img: industrial },
];

const lists = [
  "DEMAND SIDE MONITORING",
  "SMART POWER FOR BUSINESS",
  "SMART GAS FOR BUSINESS",
];
const Energhxplus = () => {
  return (
    <>
      <WordPressWrapper>
        <Header />
      </WordPressWrapper>
      <MotionImages title="ENERGHXPLUS" />
      <EnergyBody />
      <Gallery />
      <DownloadBanner />
      <Residential cardTitle={cardTitle} lists={lists} />
      <NewFlash />
      <Footer />
    </>
  );
};

export default Energhxplus;
