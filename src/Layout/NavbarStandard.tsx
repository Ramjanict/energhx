import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import userImg from "../assets/user.png";

import { FiMenu } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import DropDown from "@/common/DropDown";

const menuItems = [
  { menu: "Home", path: "/home" },
  { menu: "About Us", path: "/about-us" },
  { menu: "Consulting", path: "/consulting" },
  { menu: "Research", path: "/research" },
  { menu: "EnerghxPlus", path: "/energhxplus" },
  { menu: "Contact Us", path: "/contact-us" },
];

const NavbarStandard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // <- Ref for dropdown

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={` w-full z-10`}>
      <nav className="bg-white flex justify-between items-center px-4 xl:px-[5%] h-18 border-b border-[#E7E9E8] z-50 transition-all duration-300">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>

        <div className="flex gap-4 items-center">
          <ul className="text-primary-gray gap-2 text-xs lg:text-[16px] lg:gap-5 hidden md:flex">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="relative px-4 py-2 group hover:text-primary"
                >
                  {item.menu}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-70"></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div
              className="flex gap-2 relative"
              ref={dropdownRef} // <- Attach ref here
            >
              <img
                src={userImg}
                alt="User"
                className="w-12 h-12 ring-2 ring-primary rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />

              {isDropdownOpen && (
                <div className="absolute top-10 right-0 mt-2 z-50">
                  <DropDown />
                </div>
              )}
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
    </div>
  );
};

export default NavbarStandard;
