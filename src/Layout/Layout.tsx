import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavbarStandard from "./NavbarStandard";
import { useEffect } from "react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const { getUser } = useAdminStore();
  const navigate = useNavigate();

  const { token } = useConsumerStore();
  useEffect(() => {
    const redirectPaths = ["/login", "/signup", "/create-password"];
    if (token && redirectPaths.includes(pathname)) {
      navigate("/basic-consumer");
    }
  }, [token, pathname]);

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
    getUser();
  }, [pathname]);

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
