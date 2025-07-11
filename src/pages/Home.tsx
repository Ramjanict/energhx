import CommonWrapper from "../common/CommonWrapper";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.png";
import home3 from "@/assets/home3.png";
import { motion } from "framer-motion";
import DashBoardHeader from "@/common/DashBoardHeader";
import { useNavigate } from "react-router-dom";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const Home = () => {
  const navigate = useNavigate();
  const { getUserType } = useConsumerStore();
  const { getDevUserType } = useAdminStore();

  return (
    <CommonWrapper>
      <section className=" w-full h-[calc(100vh-96px)] flex flex-col  items-center justify-center px-4">
        <DashBoardHeader className=" py-5 sm:pb-10  text-xs max-sm:text-center">
          SELECT YOUR PREFERRED USER-TYPE
        </DashBoardHeader>
        <div className="w-full flex gap-6 flex-wrap justify-center ">
          <motion.div
            onClick={async () => {
              await getUserType("Normal Energy Users");
              navigate("/basic-consumer/form");
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

          <motion.div
            onClick={async () => {
              await getDevUserType("SERVER");
              navigate("/basic-server/form");
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

          <motion.div
            onClick={async () => {
              await getDevUserType("DEVELOPER");
              navigate("/basic-developer/form");
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
