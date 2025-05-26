import CommonHeader from "./CommonHeader";
import DashBoardHeader from "./DashBoardHeader";
import twing from "../assets/twing.png";
import { OverViewProps } from "@/types";
import { useLocation } from "react-router-dom";

const OverView: React.FC<OverViewProps> = ({ object, handleOverview }) => {
  const { pathname } = useLocation();

  const hideUI = [
    "/basic-consumer/dashboard",
    "/basic-consumer/dashboard/",
    "/basic-consumer",
    "/basic-consumer/",
  ].includes(pathname);
  return (
    <div>
      <div className=" bg-white rounded-lg ">
        {object.title && <CommonHeader>{object.title}</CommonHeader>}

        <div className="">
          <DashBoardHeader> {object.subTitle}</DashBoardHeader>

          <p className="text-[#112518] font-semibold pb-5">{object.des}</p>

          <ul className="mt-4 space-y-2 text-[#758179] mb-5">
            {object?.service?.map((item) => (
              <li key={item} className="flex items-start">
                <span className="text-primary mr-2">
                  <img className="pt-1  min-w-3" src={twing} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-4  text-[#758179]">
            <span className="text-primary font-semibold mr-1">Note:</span>
            {object.note}
          </p>

          <div className={`${hideUI ? "hidden" : ""}`}>
            {object.button && (
              <div onClick={handleOverview} className={`mt-10 text-center `}>
                <button className="w-full py-3 bg-light-green text-primary  transition-all rounded-lg hover:bg-primary hover:text-white hover:cursor-pointer">
                  {object.price}$ - {object.button}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
