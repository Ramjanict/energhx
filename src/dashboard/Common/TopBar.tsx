import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import image from "../../assets/wordpress/imanueal.jpg";
import { useState, useEffect, useRef } from "react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [admin, setAdmin] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { DevToken, adminLogout } = useAdminStore();

  const handleClick = () => {
    if (DevToken) {
      adminLogout();
    } else {
      navigate("/admin-login");
    }
    setAdmin(false); // Close dropdown after action
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setAdmin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white shadow-sm">
      {/* Search bar */}
      <div className="flex items-center w-1/2 max-w-md border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
        />
        <button className="px-4 text-gray-500 hover:text-black">
          <FiSearch size={18} />
        </button>
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative text-gray-500 hover:text-black transition">
          <FaRegBell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setAdmin((prev) => !prev)}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:ring-2 hover:ring-primary transition-all"
          >
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="Profile"
            />
          </button>

          {admin && (
            <div
              role="menu"
              aria-expanded="true"
              className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition"
            >
              <div
                onClick={handleClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {DevToken ? "Logout" : "Login"}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
