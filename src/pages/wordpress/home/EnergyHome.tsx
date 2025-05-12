import { ArrowRight } from "lucide-react";
import energyImage from "../../../assets/wordpress/about-image.png";

import { Link } from "react-router-dom";
import CommonWordPressHeader from "../CommonWordPressHeader";
import WordPressWrapper from "../WordPressWrapper";
const EnergyHome = () => {
  return (
    <section className="py-16 bg-white text-black w-full">
      <WordPressWrapper className=" grid md:grid-cols-3 gap-8 items-center">
        <div className=" md:col-span-2">
          <CommonWordPressHeader>ENERGHX HOME</CommonWordPressHeader>
          <p className="mb-4 text-[#696969]">
            ENERGHX™ releases a new platform for thermal comfort modelling,
            indoor air quality analysis, and smart energy management of energy
            consumption in every built environment. Its EnerghxPlus software is
            a mobile or web app that promotes energy transition and the adoption
            of electric mobility with a net-zero energy management system.
          </p>
          <p className="mb-6 text-[#696969]">
            With Energhx Smart Power, Gas, energy consumers can now Go Green...
            and Pay Less...
          </p>
          <Link
            to="/about"
            className="text-green-600 hover:text-green-700 font-medium flex items-center"
          >
            Know more about us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div>
          <img
            src={energyImage}
            alt="Engineers working"
            className=" w-full rounded-sm"
          />
        </div>
      </WordPressWrapper>
    </section>
  );
};

export default EnergyHome;
