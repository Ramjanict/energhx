"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg"; // Adjust the path to your logo
import userImg from "../assets/user.png";
import { FiMenu } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import DropDown from "@/common/DropDown";

const menuItems = [
  { menu: "Home", path: "https://energhx.com/" },
  { menu: "About Us", path: "https://consulting.energhx.com/about-us/" },
  { menu: "Consulting", path: "https://consulting.energhx.com/" },
  { menu: "Research", path: "https://research.energhx.com/" },
  { menu: "EnerghxPlus", path: "https://energhxplus.energhx.com" },
  { menu: "Contact Us", path: "https://consulting.energhx.com/contact-us/" },
];

const NavbarStandard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const shouldSticky = window.scrollY > 100;
      setSticky(shouldSticky);

      // Update placeholder height only when becoming sticky
      if (shouldSticky && navbarRef.current && placeholderRef.current) {
        placeholderRef.current.style.height = `${navbarRef.current.offsetHeight}px`;
      } else if (placeholderRef.current) {
        placeholderRef.current.style.height = "0px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Placeholder div that will maintain the space when navbar becomes sticky */}
      <div
        ref={placeholderRef}
        className="transition-all duration-300"
        style={{
          height: sticky ? `${navbarRef.current?.offsetHeight}px` : "0px",
        }}
      />

      <nav
        ref={navbarRef}
        className={`bg-white flex justify-between items-center px-4 xl:px-[5%] py-4 border-b border-[#E7E9E8] z-50 transition-all duration-300 ${
          sticky ? "fixed top-0 left-0 w-full shadow-md" : "relative"
        }`}
      >
        <Link to="/">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-8" />
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
                  rel="noreferrer"
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
                  src={userImg || "/placeholder.svg"}
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
