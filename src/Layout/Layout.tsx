import { Outlet, useLocation } from "react-router-dom";
import NavbarStandard from "./NavbarStandard";
import { useServerStore } from "@/store/ServerStore/ServerStore";
import { useEffect } from "react";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const { getUser, DevToken } = useServerStore();

  const hideUI = [
    "/dashboard",
    "/home",
    "/about-us",
    "/consulting",
    "/research",
    "/energhxplus",
    "/contact-us",
    "/research/emmanuel-ob-ogedengbe",
    "/research/olugbenga-o-noah",
    "/research/buraimoh-olanike-maria",
    "/admin-login",
  ].includes(pathname);

  useEffect(() => {
    if (DevToken) {
      getUser();
    }
  }, [DevToken]);

  return (
    <div>
      <div className={`${hideUI ? "hidden" : ""}`}>
        <NavbarStandard />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
