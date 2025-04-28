import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import { Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import CommonWrapper from "@/common/CommonWrapper";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";

const menuItems = [
  { path: "/standard-server/dashboard", label: "Dashboard", icon: FaHome },
  {
    path: "/standard-server/my-courses",
    label: "My Courses/LMS",
    icon: FaGraduationCap,
  },
  {
    path: "/standard-server/all-courses",
    label: "All Courses",
    icon: FaPhotoVideo,
  },
  { path: "/standard-server/history", label: "History", icon: IoMdTime },

  { path: "/standard-server/settings", label: "Settings", icon: MdSettings },
  { path: "/logout", label: "Logout", icon: MdLogout },
];
const RootStandardServer = () => {
  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Server (Intern)",
    profileImg: userImg,
  });
  return (
    <div>
      <NavbarAdmin user={user} />

      <CommonBanner
        name="Emmnauel Nonye"
        role="Server (Intern)"
        imageUrl={userImg}
      />

      <CommonWrapper>
        <div className="flex w-full">
          <Sidebar menuItems={menuItems} />
          <div className="flex-1 border-t border-t-[#E7E9E8] p-6">
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default RootStandardServer;
