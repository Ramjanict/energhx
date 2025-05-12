import Sidebar from "@/common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import userpic from "../../assets/user.png";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import { RiBuilding2Line } from "react-icons/ri";
import { MdOutlineQueryStats } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

import { IoMdTime } from "react-icons/io";
const consumerMenu = [
  { path: "/standard-consumer/dashboard", label: "Dashboard", icon: FaHome },
  {
    path: "/standard-consumer/buildingInformation",
    label: "Building Information",
    icon: RiBuilding2Line,
  },
  {
    path: "/standard-consumer/energy-audit",
    label: "Energy Audit",
    icon: MdOutlineQueryStats,
  },
  {
    path: "/standard-consumer/analysis",
    label: "Analysis",
    icon: TbReportSearch,
  },
  {
    path: "/standard-consumer/certifiedAssociates",
    label: "Certified Associates",
    icon: IoPeople,
  },
  { path: "/standard-consumer/history", label: "History", icon: IoMdTime },
  { path: "/standard-consumer/settings", label: "Settings", icon: MdSettings },
  { path: "/logout", label: "Logout", icon: MdLogout },
];

const RootStandardConsumer = () => {
  const { pathname } = useLocation();
  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Consumer (Standard)",
    profileImg: userpic,
  });
  const hideUI = [
    "/standard-consumer/energy-audit",
    "standard-consumer/energy-audit/overview",
    "/standard-consumer/energy-audit/biomass",
    "/standard-consumer/energy-audit/solar",
    "standard-consumer/energy-audit/overview",
  ].includes(pathname);
  return (
    <div>
      <NavbarAdmin user={user} />
      <div className={`${hideUI ? "hidden" : ""}`}>
        <CommonBanner
          name="Emmnauel Nonye"
          role="Consumer (Standard)"
          imageUrl={userImg}
        />
      </div>

      <CommonWrapper>
        <div className="flex w-full  ">
          <div className={`${hideUI ? "hidden" : ""}`}>
            <Sidebar menuItems={consumerMenu} />
          </div>
          <div className="flex-1 border-t border-t-[#E7E9E8] p-6  relative">
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default RootStandardConsumer;
