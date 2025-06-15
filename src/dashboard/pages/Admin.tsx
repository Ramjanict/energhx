import { useState } from "react";
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

const Admin = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1  overflow-auto">
        <TopBar />

        <div className="p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Admin Dashboard
          </h1>
        </div>
        <div className="px-6">
          {activeTab === "home" && <Home />}
          {activeTab === "program" && <Program />}
          {activeTab === "course" && <Course />}
          {activeTab === "module" && <Module />}
          {activeTab === "basicContent" && <BasicContent />}
          {activeTab === "content" && <Content />}
          {activeTab === "quiz" && <Quiz />}
          {activeTab === "review" && <Review />}
          {activeTab === "payment" && <Payment />}{" "}
        </div>
      </div>
    </div>
  );
};
export default Admin;
