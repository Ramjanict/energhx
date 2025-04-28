import Sidebar from "@/common/Sidebar";
import { Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import userpic from "../../assets/user.png";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import { IoMdTime } from "react-icons/io";
const consumerMenu = [
  { path: "/standard-consumer/dashboard", label: "Dashboard", icon: FaHome },
  {
    path: "/standard-consumer/buildingInformation",
    label: "Building Information",
    icon: BsBuilding,
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

const StandardConsumerHistory = () => {
  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Consumer (Standard)",
    profileImg: userpic,
  });
  return (
    <div>
      <NavbarAdmin user={user} />
      <CommonBanner
        name="Emmnauel Nonye"
        role="Consumer (Standard)"
        imageUrl={userImg}
      />
      <CommonWrapper>
        <div className="flex w-full  ">
          <Sidebar menuItems={consumerMenu} />
          <div className="flex-1 border-t border-t-[#E7E9E8] p-6  relative">
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default StandardConsumerHistory;
