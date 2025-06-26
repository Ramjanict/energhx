import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { FaPhotoVideo } from "react-icons/fa";
import CommonWrapper from "@/common/CommonWrapper";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import { use, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const menuItems = [
  { path: "/standard-server/dashboard", label: "Dashboard", icon: FaHome },

  {
    path: "/standard-server/all-courses",
    label: "All Courses",
    icon: FaPhotoVideo,
  },
  { path: "/standard-server/settings", label: "Settings", icon: MdSettings },
  { path: "/login", label: "Logout", icon: MdLogout },
];
const RootStandardServer = () => {
  const { DevUser } = useAdminStore();

  const [user] = useState({
    name: `${DevUser?.user?.firstName ?? ""} ${
      DevUser?.user?.lastName ?? ""
    }`.trim(),
    role: "Server (Intern)",
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
