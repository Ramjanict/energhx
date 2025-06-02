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
import { AiOutlineCloudUpload } from "react-icons/ai";
const developerMenu = [
  { path: "/basic-developer/dashboard", label: "Dashboard", icon: FaHome },
  { path: "/basic-developer/settings", label: "Settings", icon: MdSettings },
  {
    path: "/basic-developer/experience",
    label: "Add Experience",
    icon: AiOutlineCloudUpload,
  },
  { path: "/login", label: "Logout", icon: MdLogout },
];

const RootBasicDeveloper = () => {
  const { showPayment } = useServerStore();
  const { pathname } = useLocation();

  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Developer (Basic)",
    profileImg: userImg,
  });

  const isFormPage =
    pathname === "/basic-developer/form" ||
    pathname === "/basic-developer/experience";

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
          {!isFormPage && <Sidebar menuItems={developerMenu} />}
          <div
            className={`flex-1 p-6 relative ${
              isFormPage ? "border-0" : "border-t border-t-[#E7E9E8] "
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
