import logo from "../../assets/wordpress/logo.png";
import { useState } from "react";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsFillGridFill } from "react-icons/bs";
import { MdQuiz, MdOutlineReviews, MdPayment } from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { BiHive, BiSolidBookmarkAltPlus } from "react-icons/bi";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { IoIosPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const sidebarList = [
  { label: "Home", tab: "home", icon: BsFillGridFill },
  { label: "Program", tab: "program", icon: VscFileSubmodule },
  { label: "Course", tab: "course", icon: BiHive },
  { label: "Module", tab: "module", icon: PiVideoFill },
  {
    label: "Basic Content",
    tab: "basicContent",
    icon: BiSolidBookmarkAltPlus,
  },
  { label: "Content", tab: "content", icon: LiaPhotoVideoSolid },
  { label: "Quiz", tab: "quiz", icon: MdQuiz },
  { label: "Review", tab: "review", icon: MdOutlineReviews },
  { label: "Payment", tab: "payment", icon: MdPayment },
  { label: "Add Admin", tab: "addAdmin", icon: IoIosPersonAdd },
];

interface SidebarProps {
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  const [active, setActive] = useState("Home");
  const [sidebar, setSidebar] = useState(false); // collapsed state

  return (
    <div
      className={`${
        sidebar ? "w-[72px]" : "w-[240px]"
      } bg-white border-r border-[#e4e4e4] flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="p-4 flex items-center justify-between">
        {!sidebar && (
          <Link to={"/"} className="max-w-28 transition-opacity duration-300">
            <img src={logo} alt="Logo" />
          </Link>
        )}
        <span
          onClick={() => setSidebar((prev) => !prev)}
          className="cursor-pointer text-xl ml-auto"
        >
          {sidebar ? <SlArrowRight /> : <SlArrowLeft />}
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-2">
        {sidebarList.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => {
                setActive(item.label);
                setActiveTab(item.tab);
              }}
              className={`group w-full flex items-center px-3 gap-1 py-2 rounded-md cursor-pointer transition-colors
                ${
                  active === item.label
                    ? "font-semibold bg-primary text-white"
                    : "bg-white text-[#283F3A] hover:bg-gray-100"
                }`}
            >
              <span className="text-xl">
                <Icon />
              </span>
              <span
                className={`transition-all duration-300 ease-in-out ${
                  sidebar
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
