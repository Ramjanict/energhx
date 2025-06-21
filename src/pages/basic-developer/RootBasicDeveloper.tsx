import CommonBanner from "@/common/CommonBanner";
import userImg from "../../assets/user.png";
import Sidebar from "@/common/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaPhotoVideo } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import NavbarStandard from "@/Layout/NavbarStandard";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
const developerMenu = [
  { path: "/basic-developer/dashboard", label: "Dashboard", icon: FaHome },

  {
    path: "/basic-developer/all-courses",
    label: "All Courses",
    icon: FaPhotoVideo,
  },
  { path: "/basic-developer/settings", label: "Settings", icon: MdSettings },
  {
    path: "/basic-developer/experience",
    label: "Add Experience",
    icon: AiOutlineCloudUpload,
  },
  { path: "/login", label: "Logout", icon: MdLogout },
];

const RootBasicDeveloper = () => {
  const { DevUser } = useAdminStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user] = useState({
    name: `${DevUser?.user?.firstName ?? ""} ${
      DevUser?.user?.lastName ?? ""
    }`.trim(),
    role: "Developer (Basic)",
    profileImg: DevUser?.user?.profile_photo ?? userImg,
  });

  const isFormPage =
    pathname === "/basic-developer/form" ||
    pathname === "/basic-developer/experience";

  const handleUpgrade = () => {
    if (DevUser?.user?.userType === "SERVER") {
      navigate("/basic-server/all-courses");
    } else {
      navigate("/basic-developer/all-courses");
    }
  };
  return (
    <div>
      {isFormPage ? (
        <NavbarStandard />
      ) : (
        user.profileImg && <NavbarAdmin user={user} />
      )}
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
