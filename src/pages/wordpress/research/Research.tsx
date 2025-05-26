import DownloadBanner from "../Common/DownloadBanner";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import MotionImages from "../Common/MotionImages";
import ResearchAndConsulting from "../Common/ResearchAndConsulting";
import WordPressWrapper from "../Common/WordPressWrapper";
import ResearchGroup from "./ResearchGroup";

const Research = () => {
  return (
    <div>
      <WordPressWrapper>
        <Header />
      </WordPressWrapper>

      <MotionImages title="RESEARCHERS" />
      <WordPressWrapper>
        <ResearchGroup />
      </WordPressWrapper>
      <ResearchAndConsulting />
      <DownloadBanner />

      <Footer />
    </div>
  );
};

export default Research;
