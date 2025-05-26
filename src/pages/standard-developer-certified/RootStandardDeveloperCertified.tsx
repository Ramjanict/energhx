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

const serverInternMenu = [
  {
    path: "/standard-developer-certified/dashboard",
    label: "Dashboard",
    icon: FaHome,
  },
  {
    path: "/standard-developer-certified/appointment-request",
    label: "Appointment Request",
    icon: FaUsers,
  },
  {
    path: "/standard-developer-certified/my-courses",
    label: "My Courses/LMS",
    icon: FaGraduationCap,
  },

  {
    path: "/standard-developer-certified/all-courses",
    label: "All Courses",
    icon: FaPhotoVideo,
  },
  {
    path: "/standard-developer-certified/history",
    label: "History",
    icon: IoMdTime,
  },
  {
    path: "/standard-developer-certified/subscription",
    label: "Subscription Packages",
    icon: BsCartDash,
  },

  {
    path: "/standard-developer-certified/settings",
    label: "Settings",
    icon: MdSettings,
  },
  { path: "/login", label: "Logout", icon: MdLogout },
];

const RootStandardDeveloperCertified = () => {
  const [user] = useState({
    name: "Emmnauel Nonye",
    role: "Developer (Certified)",
    profileImg: userImg,
  });
  return (
    <div>
      <NavbarAdmin user={user} />
      <CommonBanner
        name="Emmnauel Nonye"
        role="Developer (Certified)"
        imageUrl={userImg}
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

export default RootStandardDeveloperCertified;
