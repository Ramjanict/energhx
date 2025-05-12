import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import NavbarStandard from "@/Layout/NavbarStandard";
import { useServerStore } from "@/store/ServerStore";
import { TbReportSearch } from "react-icons/tb";
import { RiBuilding2Line } from "react-icons/ri";
const developerMenu = [
  { path: "/basic-developer/dashboard", label: "Dashboard", icon: FaHome },
  {
    path: "/basic-developer/buildingInformation",
    label: "Building Information",
    icon: RiBuilding2Line,
  },
  {
    path: "/basic-developer/analysis",
    label: "Analysis",
    icon: TbReportSearch,
  },

  { path: "/basic-developer/settings", label: "Settings", icon: MdSettings },
  { path: "/logout", label: "Logout", icon: MdLogout },
];

const RootBasicDeveloper = () => {
  const { showPayment } = useServerStore();
  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Developer (Basic)",
    profileImg: userImg,
  });

  const handleUpgrade = () => {
    showPayment();
  };
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === "/basic-developer/form" ? (
        <NavbarStandard />
      ) : (
        <NavbarAdmin user={user} />
      )}
      <div className={`${pathname === "/basic-developer/form" && "hidden"}`}>
        <CommonBanner
          name="Emmnauel Nonye"
          role="Developer (Basic)"
          imageUrl={userImg}
          onUpgrade={handleUpgrade}
        />
      </div>

      <CommonWrapper>
        <div className="flex w-full">
          <div
            className={`${pathname === "/basic-developer/form" && "hidden"}`}
          >
            <Sidebar menuItems={developerMenu} />
          </div>
          <div
            className={`flex-1 p-6 relative ${
              pathname === "/basic-developer/form"
                ? "border-0"
                : "border-t border-t-[#E7E9E8] "
            }`}
          >
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default RootBasicDeveloper;
