import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userImg from "../assets/user.png";
import Logo from "@/assets/logo.svg";
import CommonWrapper from "@/common/CommonWrapper";
import bell from "../assets/bell.svg";
import { NavbarUserProps } from "@/types";
import DropDown from "@/common/DropDown";
import NotificationPopUp from "@/common/NotificationPopUp";

interface NavbarAdminProps {
  user: NavbarUserProps;
}
const NavbarAdmin = ({ user }: NavbarAdminProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const notificationElement = document.getElementById("notification-popup");
      const bellIconElement = document.getElementById("notification-bell");

      if (notificationElement && bellIconElement) {
        if (
          !notificationElement.contains(event.target as Node) &&
          !bellIconElement.contains(event.target as Node)
        ) {
          setIsNotificationOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className={`
bg-white  flex justify-between items-center px-4 xl:px-[5%] py-4 border-b border-[#E7E9E8] z-50 
      `}
      >
        <CommonWrapper>
          <div className="w-full flex justify-between items-center">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-8 w-[120px]" />
            </Link>

            <div className="flex items-center gap-6  ">
              <div
                className=" relative cursor-pointer"
                onClick={() => {
                  setIsNotificationOpen((pre) => !pre);
                }}
              >
                <img
                  className="w-10 h-10 rounded-full bg-light-green p-2"
                  src={bell}
                  alt="bell"
                />

                <div className="flex items-center justify-center w-4 h-4 bg-[#F1BB00] rounded-full  font-semibold text-[10px] absolute top-0 right-0">
                  1
                </div>
                {isNotificationOpen && (
                  <div
                    id="notification-popup"
                    className="fixed top-20 z-50 inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  "
                  >
                    <NotificationPopUp />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setIsDropdownOpen((pre) => !pre);
                }}
                className="flex gap-2 relative"
              >
                <div className="  ">
                  <img
                    src={user.profileImg || userImg}
                    alt="User"
                    className="w-12 h-12 ring-2 ring-primary rounded-full cursor-pointer"
                  />

                  {isDropdownOpen && (
                    <div id="dropdown" className=" absolute  right-0 mt-2">
                      <DropDown />
                    </div>
                  )}
                </div>
                <div className=" hidden sm:block">
                  <h2 className="text-[#112518] text-base ">{user.name}</h2>
                  <p className="text-primary font-semibold  text-sm">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CommonWrapper>
      </nav>
    </>
  );
};

export default NavbarAdmin;
