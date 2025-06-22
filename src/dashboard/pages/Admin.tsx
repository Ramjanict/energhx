import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "./Home";

import TopBar from "@/dashboard/Common/TopBar";
import Program from "./Program";
import Course from "./Course";
import Module from "./Module";

import Quiz from "./Quiz";
import Review from "./Review";
import Payment from "./Payment";
import Content from "./Content";
import BasicContent from "./BasicContent";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useNavigate } from "react-router-dom";
import CreateAdmin from "./CreateAdmin";
import { toast } from "react-toastify";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const { DevUser, DevToken } = useAdminStore();
  useEffect(() => {
    if (!DevToken) {
      navigate("/admin-login");
      return;
    }

    const userType = DevUser?.user?.userType;

    // Deny access if user is not SUPER_ADMIN and not ADMIN
    if (userType !== "SUPER_ADMIN" && userType !== "ADMIN") {
      toast.error("Access restricted to administrators only.");
      navigate("/admin-login");
    }
  }, [DevToken, DevUser, navigate]);

  return (
    <div className="flex min-h-screen bg-[#fafafa] overflow-hidden">
      <div className="min-h-screen">
        <Sidebar setActiveTab={setActiveTab} />
      </div>

      <div className="flex-1 flex flex-col max-h-screen">
        <TopBar />

        <div className="p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Admin Dashboard
          </h1>
        </div>

        <div className="px-6 overflow-y-auto flex-1">
          {activeTab === "home" && <Home />}
          {activeTab === "program" && <Program />}
          {activeTab === "course" && <Course />}
          {activeTab === "module" && <Module />}
          {activeTab === "basicContent" && <BasicContent />}
          {activeTab === "content" && <Content />}
          {activeTab === "quiz" && <Quiz />}
          {activeTab === "review" && <Review />}
          {activeTab === "payment" && <Payment />}
          {activeTab === "addAdmin" && <CreateAdmin />}
        </div>
      </div>
    </div>
  );
};
export default Admin;
