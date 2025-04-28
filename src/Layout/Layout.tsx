import { Outlet } from "react-router-dom";
import NavbarStandard from "./NavbarStandard";

const Layout: React.FC = () => {
  return (
    <div>
      <NavbarStandard />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
