import CommonWrapper from "../common/CommonWrapper";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.png";
import home3 from "@/assets/home3.png";
import { motion } from "framer-motion";
import DashBoardHeader from "@/common/DashBoardHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
const Home = () => {
  const navigate = useNavigate();
  const { getUserType, user } = useConsumerStore();

  const userType = [
    { user: "Normal Energy Users", path: "/basic-consumer/dashboard" },
    { user: "Energy Interns", path: "/basic-server/dashboard" },
    { user: "Energy Installers", path: "/basic-developer/dashboard" },
  ];

  useEffect(() => {
    const matched = userType.find((u) => u.user === user?.userType);

    if (matched) {
      navigate(matched.path);
    }
  }, [user]);

  return (
    <CommonWrapper>
      <section className=" w-full h-[calc(100vh-96px)] flex flex-col  items-center justify-center px-4">
        <DashBoardHeader className=" py-5 sm:pb-10  text-xs max-sm:text-center">
          SELECT YOUR PREFERRED USER-TYPE
        </DashBoardHeader>
        <div className="w-full flex gap-6 flex-wrap justify-center ">
          {/* Energy Consumer */}
          <motion.div
            onClick={() => {
              navigate("/basic-consumer/form");
              getUserType("Normal Energy Users");
            }}
            className="p-6 border border-primary bg-light-green rounded-2xl  w-[200px] h-[180px] flex flex-col justify-between items-center cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: "#C3E6C0" }}
          >
            <div className="bg-[#BEE6B0] p-6 rounded-md flex justify-center items-center w-18 h-18 ">
              <img src={home2} alt="Energy User" />
            </div>
            <p className="text-primary font-normal text-[16px]">
              Energy Consumer
            </p>
          </motion.div>

          {/* Energy Server */}
          <motion.div
            onClick={() => {
              navigate("/basic-server/form");
              getUserType("Energy Interns");
            }}
            className="p-6 border border-primary bg-light-green rounded-2xl  w-[200px] h-[180px] flex flex-col justify-between items-center cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: "#C3E6C0" }}
          >
            <div className="bg-[#BEE6B0] p-6 rounded-md flex justify-center items-center w-18 h-18">
              <img src={home3} alt="Energy Installer" />
            </div>
            <p className="text-primary font-normal text-[16px]">
              Energy Server
            </p>
          </motion.div>
          {/* Energy Developer */}
          <motion.div
            onClick={() => {
              navigate("/basic-developer/form");
              getUserType("Energy Installers");
            }}
            className="p-6 border border-primary bg-light-green rounded-2xl w-[200px] h-[180px] flex flex-col justify-between items-center cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: "#C3E6C0" }}
          >
            <div className="bg-[#BEE6B0] p-6 rounded-md flex justify-center items-center w-18 h-18 ">
              <img src={home1} alt="Energy Intern" className="" />
            </div>
            <p className="text-primary font-normal text-[16px]">
              Energy Developer
            </p>
          </motion.div>
        </div>
      </section>
    </CommonWrapper>
  );
};

export default Home;
