import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg"; // Adjust the path to your logo
import userImg from "../assets/user.png";

const menuItems = [
  { menu: "Home", path: "https://energhx.com/" },
  { menu: "About Us", path: "https://consulting.energhx.com/about-us/" },
  { menu: "Consulting", path: "https://consulting.energhx.com/" },
  { menu: "Research", path: "https://research.energhx.com/" },
  { menu: "EnerghxPlus", path: "https://energhxplus.energhx.com" },
  { menu: "Contact Us", path: "https://consulting.energhx.com/contact-us/" },
];
import { FiMenu } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import DropDown from "@/common/DropDown";

const NavbarStandard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const [stricky, setStricky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStricky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <nav
        className={`${
          stricky && "fixed w-full transition-all duration-300"
        } bg-white  flex justify-between items-center px-4 xl:px-[5%] py-4 border-b border-[#E7E9E8]  z-50 `}
      >
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>

        <div className="flex gap-4 items-center">
          <ul
            className={`text-primary-gray gap-2 text-xs lg:text-[16px] lg:gap-5 hidden md:flex`}
          >
            {menuItems.map((item, i) => (
              <li key={i} className="">
                <a
                  href={`${item.path}`}
                  target="_blank"
                  className={`relative px-4 py-2 group hover:text-primary`}
                >
                  {item.menu}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-70"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                setIsDropdownOpen((pre) => !pre);
              }}
              className="flex gap-2 relative"
            >
              <div className="  ">
                <img
                  src={userImg}
                  alt="User"
                  className="w-12 h-12 ring-2 ring-primary rounded-full cursor-pointer"
                />

                {isDropdownOpen && (
                  <div id="dropdown" className=" absolute  right-0 mt-2">
                    <DropDown />
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden text-primary-gray text-2xl cursor-pointer"
            >
              {!isOpen && <FiMenu />}
            </button>
          </div>
        </div>

        {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
      </nav>
      <hr className="w-full text-[#E7E9E8]" />
    </>
  );
};

export default NavbarStandard;
