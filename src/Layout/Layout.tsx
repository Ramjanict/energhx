import { Outlet, useLocation } from "react-router-dom";
import NavbarStandard from "./NavbarStandard";

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  const hideUI = ["/dashboard"].includes(pathname);
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
