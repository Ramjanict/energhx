import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";

import NavbarAdmin from "@/Layout/NavbarAdmin";
import NavbarStandard from "@/Layout/NavbarStandard";
import CommonBanner from "@/common/CommonBanner";
import CommonWrapper from "@/common/CommonWrapper";
import Sidebar from "@/common/Sidebar";

import userpic from "../../assets/user.png";
import { useServerStore } from "@/store/ServerStore";

const serverMenu = [
  { path: "/basic-server/dashboard", label: "Dashboard", icon: FaHome },
  { path: "/basic-server/settings", label: "Settings", icon: IoMdTime },
  {
    path: "/basic-server/experience",
    label: "Add Experience",
    icon: AiOutlineCloudUpload,
  },
  { path: "/login", label: "Logout", icon: MdLogout },
];

const RootBasicServer = () => {
  const { pathname } = useLocation();
  const { showPayment } = useServerStore();

  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Server (Basic)",
    profileImg: userpic,
  });

  const isFormPage =
    pathname === "/basic-server/form" ||
    pathname === "/basic-server/experience";

  const handleUpgrade = () => {
    showPayment();
  };

  return (
    <div>
      {isFormPage ? <NavbarStandard /> : <NavbarAdmin user={user} />}

      {!isFormPage && (
        <CommonBanner
          name={user.name}
          role={user.role}
          imageUrl={user.profileImg}
          onUpgrade={handleUpgrade}
        />
      )}

      <CommonWrapper>
        <div className="flex w-full">
          {!isFormPage && <Sidebar menuItems={serverMenu} />}
          <div
            className={`flex-1 relative p-6 ${
              isFormPage ? "border-0" : "border-t border-t-[#E7E9E8]"
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
