import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaPhotoVideo } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";

import NavbarAdmin from "@/Layout/NavbarAdmin";
import NavbarStandard from "@/Layout/NavbarStandard";
import CommonBanner from "@/common/CommonBanner";
import CommonWrapper from "@/common/CommonWrapper";
import Sidebar from "@/common/Sidebar";

import userImg from "../../assets/user.png";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const serverMenu = [
  { path: "/basic-server/dashboard", label: "Dashboard", icon: FaHome },

  {
    path: "/basic-server/all-courses",
    label: "All Courses",
    icon: FaPhotoVideo,
  },
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
  const { DevUser } = useAdminStore();
  const navigate = useNavigate();

  const [user] = useState({
    name: `${DevUser?.user?.firstName ?? ""} ${
      DevUser?.user?.lastName ?? ""
    }`.trim(),
    role: "Server (Basic)",
    profileImg: DevUser?.user?.profile_photo ?? userImg,
  });

  const isFormPage =
    pathname === "/basic-server/form" ||
    pathname === "/basic-server/experience";

  const handleUpgrade = () => {
    if (DevUser?.user?.userType === "SERVER") {
      navigate("/basic-server/all-courses");
    } else {
      navigate("/basic-developer/all-courses");
    }
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
