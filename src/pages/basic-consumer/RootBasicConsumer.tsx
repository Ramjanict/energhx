import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import CommonWrapper from "@/common/CommonWrapper";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { useState } from "react";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import { IoMdTime } from "react-icons/io";
import NavbarStandard from "@/Layout/NavbarStandard";

const consumerMenu = [
  { path: "/basic-consumer/dashboard", label: "Dashboard", icon: FaHome },
  {
    path: "/basic-consumer/buildingInformation",
    label: "Building Information",
    icon: BsBuilding,
  },
  {
    path: "/basic-consumer/certifiedAssociates",
    label: "Certified Associates",
    icon: IoPeople,
  },
  { path: "/basic-consumer/history", label: "History", icon: IoMdTime },
  { path: "/basic-consumer/settings", label: "Settings", icon: MdSettings },
  { path: "/logout", label: "Logout", icon: MdLogout },
];

const RootBasicConsumer = () => {
  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Consumer",
    profileImg: userImg,
  });
  const { pathname } = useLocation();
  const handleUpgrade = () => {
    alert("Upgrade process initiated!");
  };

  return (
    <div>
      {pathname === "/basic-consumer/form" ? (
        <NavbarStandard />
      ) : (
        <NavbarAdmin user={user} />
      )}

      <div className={`${pathname === "/basic-consumer/form" && "hidden"}`}>
        <CommonBanner
          name="Emmnauel Nonye"
          role="Consumer (Basic)"
          imageUrl={userImg}
          onUpgrade={handleUpgrade} // Pass the function, not a string
        />
      </div>

      <CommonWrapper>
        <div className="flex">
          <div className={`${pathname === "/basic-consumer/form" && "hidden"}`}>
            <Sidebar menuItems={consumerMenu} />
          </div>
          <div className="flex-1 border-t border-t-[#E7E9E8] p-6 relative">
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default RootBasicConsumer;
