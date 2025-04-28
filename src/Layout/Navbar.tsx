// Navbar.tsx
import { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarStandard from "./NavbarStandard";
import { NavbarUserProps } from "@/types";

const Navbar = () => {
  const [user] = useState<NavbarUserProps>({
    role: "user", // Change to "Admin" for Admin view
    profileImg: "/user.png",
  });

  return (
    <>
      {user.role === "user" ? <NavbarAdmin user={user} /> : <NavbarStandard />}
    </>
  );
};

export default Navbar;
