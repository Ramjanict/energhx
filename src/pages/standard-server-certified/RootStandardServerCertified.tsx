import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import { Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import CommonWrapper from "@/common/CommonWrapper";
import { BsCartDash } from "react-icons/bs";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const serverInternMenu = [
  {
    path: "/standard-server-certified/dashboard",
    label: "Dashboard",
    icon: FaHome,
  },

  {
    path: "/standard-server-certified/all-courses",
    label: "All Courses",
    icon: FaPhotoVideo,
  },

  {
    path: "/standard-server-certified/settings",
    label: "Settings",
    icon: MdSettings,
  },
  { path: "/login", label: "Logout", icon: MdLogout },
];

const RootStandardServerCertified = () => {
  const { DevUser } = useAdminStore();
  const [user] = useState({
    name: `${DevUser?.user?.firstName ?? ""} ${
      DevUser?.user?.lastName ?? ""
    }`.trim(),
    role: "Server (Certified)",
    profileImg: DevUser?.user?.profile_photo ?? userImg,
  });
  return (
    <div>
      <NavbarAdmin user={user} />
      <CommonBanner
        name={user.name}
        role={user.role}
        imageUrl={user.profileImg}
      />
      <CommonWrapper>
        <div className="flex w-full">
          <Sidebar menuItems={serverInternMenu} />
          <div className="flex-1 border-t border-t-[#E7E9E8] p-6 ">
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default RootStandardServerCertified;
