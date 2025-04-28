import Breadcrumbs from "@/common/Breadcrumbs";
import light from "../assets/bulb-animation.gif";
import { Link } from "react-router-dom";

interface ThanksForm {
  title: string;
  path: string;
}
const ThanksForm: React.FC<ThanksForm> = ({ title, path }) => {
  return (
    <div>
      <div className="py-8">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <h1 className=" uppercase text-3xl text-primary font-secondary font-extrabold    tracking-widest">
          {title}
        </h1>
        <img src={light} alt="thanks" />
        <Link
          to={path}
          className=" bg-primary text-white rounded-xl px-6 py-4 mt-10 cursor-pointer"
        >
          Save Profile
        </Link>
      </div>
    </div>
  );
};

export default ThanksForm;
