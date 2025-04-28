import lightGreen from "../assets/Profile/lightGreen.svg";
import lightBlack from "../assets/Profile/lightBlack.svg";
import arrowGreen from "../assets/Profile/arrowGreen.png";
import arrowBlack from "../assets/Profile/arrowBlack.png";

const breadcrumbs = [
  {
    arrow: null,
    light: lightGreen,
    title: "Utility Selection",
    color: "text-[#2DAD00]",
  },
  {
    arrow: arrowGreen,
    light: lightGreen,
    title: "Selected Commodity",
    color: "text-[#2DAD00]",
  },
  {
    arrow: arrowBlack,
    light: lightBlack,
    title: "Personal Info",
    color: "text-[#9DA6A0]",
  },
  {
    arrow: arrowBlack,
    light: lightBlack,
    title: "Verify & Submit",
    color: "text-[#9DA6A0]",
  },
];
const Breadcrumbs = () => {
  return (
    <div className=" hidden  sm:flex justify-between  items-center gap-2 bg-[#EAF7E6] rounded-xl px-10 py-6 font-primary  overflow-hidden">
      {breadcrumbs.map((item, i) => (
        <div className=" flex gap-2   items-center " key={i}>
          {item.arrow === null ? (
            <></>
          ) : (
            <img className="w-5 sm:w-16" src={item.arrow} alt="arrowGreen" />
          )}
          <img className=" hidden md:block" src={item.light} alt="green" />
          <p className={`text-xs lg:text-lg line-clamp-1 ${item.color}`}>
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
