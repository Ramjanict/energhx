import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.svg";

const Header = () => {
  const { pathname } = useLocation();

  const menus = [
    { label: "Home", path: "/home" },
    { label: "Research", path: "/research" },
    { label: "Consulting", path: "/consulting" },
    { label: " Contact us", path: "/contact-us" },
  ];

  console.log("pathname", pathname);
  return (
    <div>
      <header className="flex items-center justify-between pt-10">
        <div>
          <img src={logo} alt="" />
        </div>
        <nav className="hidden md:flex space-x-8">
          {menus.map((menu) => (
            <Link
              key={menu.label}
              to={menu.path}
              className={`${
                pathname === menu.path ? "text-primary" : "text-white"
              } hover:text-green-500 transition-colors`}
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Header;
