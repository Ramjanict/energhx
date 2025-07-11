import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import CommonWrapper from "@/common/CommonWrapper";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { useState } from "react";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import NavbarStandard from "@/Layout/NavbarStandard";
import { TbReportSearch } from "react-icons/tb";
import { RiBuilding2Line } from "react-icons/ri";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const consumerMenu = [
  { path: "/basic-consumer/dashboard", label: "Dashboard", icon: FaHome },
  {
    path: "/basic-consumer/buildingInformation",
    label: "Building Information",
    icon: RiBuilding2Line,
  },
  { path: "/basic-consumer/analysis", label: "Analysis", icon: TbReportSearch },
  { path: "/basic-consumer/settings", label: "Settings", icon: MdSettings },

  { path: "/login", label: "Logout", icon: MdLogout },
];

const RootBasicConsumer = () => {
  const { user } = useConsumerStore();
  const [Consumer] = useState({
    name: `${user?.firstname ?? ""} ${user?.lastname ?? ""}`.trim(),
    role: "Consumer",
    profileImg: user?.profile_photo ?? userImg,
  });
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/basic-consumer/form" ? (
        <NavbarStandard />
      ) : (
        user && <NavbarAdmin user={Consumer} />
      )}

      <div className={`${pathname === "/basic-consumer/form" && "hidden"}`}>
        <CommonBanner
          name={Consumer.name}
          role={Consumer.role}
          imageUrl={Consumer.profileImg}
        />
      </div>

      <CommonWrapper>
        <div className="flex">
          <div className={`${pathname === "/basic-consumer/form" && "hidden"}`}>
            <Sidebar menuItems={consumerMenu} />
          </div>
          <div
            className={`flex-1 border-t border-t-[#E7E9E8] p-6 relative ${
              pathname === "/basic-consumer/form" && " border-t-0"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default RootBasicConsumer;
