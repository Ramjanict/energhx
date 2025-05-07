import CommonBanner from "@/common/CommonBanner";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import Sidebar from "@/common/Sidebar"; // Replace with your custom Sidebar component
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import CommonWrapper from "@/common/CommonWrapper";
import userpic from "../../assets/user.png";
import NavbarStandard from "@/Layout/NavbarStandard";
import { IoMdTime } from "react-icons/io";
import { useServerStore } from "@/store/ServerStore";

const serverMenu = [
  { path: "/basic-server/dashboard", label: "Dashboard", icon: FaHome },
  { path: "/basic-server/settings", label: "Settings", icon: IoMdTime },
  { path: "/logout", label: "Logout", icon: MdLogout },
];

const RootBasicServer = () => {
  const { pathname } = useLocation();
  const { showPayment } = useServerStore();

  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Server (Basic)",
    profileImg: userpic,
  });

  const handleUpgrade = () => {
    showPayment();
  };
  return (
    <div>
      {pathname === "/basic-server/form" ? (
        <NavbarStandard />
      ) : (
        <NavbarAdmin user={user} />
      )}

      <div className={`${pathname === "/basic-server/form" && "hidden"}`}>
        <CommonBanner
          name="Emmnauel Nonye"
          role="Server (Basic)"
          imageUrl={userpic}
          onUpgrade={handleUpgrade}
        ></CommonBanner>
      </div>
      <CommonWrapper>
        <div className="flex w-full ">
          <div className={`${pathname === "/basic-server/form" && "hidden"}`}>
            <Sidebar menuItems={serverMenu} />
          </div>
          <div
            className={`flex-1 p-6 ${
              pathname === "/basic-server/form"
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

export default RootBasicServer;
