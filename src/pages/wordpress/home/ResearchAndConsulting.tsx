import { Link } from "react-router-dom";
import research from "../../../assets/wordpress/research-banner.png";
import consulting from "../../../assets/wordpress/consult-banner.png";
import WordPressWrapper from "../WordPressWrapper";
const ResearchAndConsulting = () => {
  return (
    <section className="pb-16 ">
      <WordPressWrapper>
        <div className="w-full  grid md:grid-cols-2 gap-8">
          <div className=" relative h-[300px] overflow-hidden group">
            <img
              src={research}
              alt="Research"
              className="object-cover w-full h-full rounded-sm"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
              <Link
                to="/research"
                className="text-3xl font-bold font-secondary text-white mb-4"
              >
                ENERGHX
                <br />
                RESEARCH
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] overflow-hidden group">
            <img
              src={consulting}
              alt="Consulting"
              className="object-cover w-full h-full rounded-sm"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
              <Link
                to="/consulting"
                className="text-3xl font-bold font-secondary text-white mb-4"
              >
                ENERGHX
                <br />
                CONSULTING
              </Link>
            </div>
          </div>
        </div>
      </WordPressWrapper>
    </section>
  );
};

export default ResearchAndConsulting;
