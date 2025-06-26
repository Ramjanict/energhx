import { motion } from "framer-motion";
import DashBoardHeader from "@/common/DashBoardHeader";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect, useState } from "react";
import Loading from "../basic-consumer/Loading";
import { useNavigate } from "react-router-dom";

const ChooseProgram = () => {
  const {
    getMyProgram,
    myProgram,
    isMyProgramFetching,
    DevUser,
    DevToken,
    getSingleProgram,
  } = useAdminStore();

  const navigate = useNavigate();
  const [selectProgramId, setSelectProgramId] = useState<string | null>(null);

  const userType = DevUser?.user?.userType;

  const routeMap: Record<string, string> = {
    BASIC_SERVER: "/basic-server",
    STANDARD_SERVER: "/standard-server",
    CERTIFIED_SERVER: "/standard-server-certified",
    BASIC_DEVELOPER: "/basic-developer",
    STANDARD_DEVELOPER: "/standard-developer",
    CERTIFIED_DEVELOPER: "/standard-developer-certified",
  };

  useEffect(() => {
    getMyProgram();
  }, []);

  useEffect(() => {
    localStorage.removeItem("selectedProgram");
    getMyProgram();
  }, []);

  useEffect(() => {
    if (selectProgramId) {
      localStorage.setItem("selectedProgram", selectProgramId);
    }
  }, [selectProgramId]);

  const handleRouting = async (status: string) => {
    if (selectProgramId && userType) {
      const routeKey = `${status}_${userType}`;
      const route = routeMap[routeKey];
      if (route) {
        await getSingleProgram(selectProgramId);
        navigate(route);
      }
    }
  };

  useEffect(() => {
    if (!DevToken) {
      navigate("/login");
    }
  }, [DevToken, navigate]);
  return (
    <section className="w-full min-h-[calc(100vh-96px)] flex flex-col items-center justify-center px-4 py-12 bg-slate-50">
      <DashBoardHeader className="pb-8 text-center text-sm sm:text-base">
        Select Your Preferred Program
      </DashBoardHeader>

      <div className="w-full max-w-6xl flex justify-center flex-wrap gap-6">
        {isMyProgramFetching ? (
          <Loading />
        ) : myProgram?.length === 0 ? (
          <p className="text-gray-500">No programs available.</p>
        ) : (
          myProgram.map((program) => (
            <motion.div
              key={program.program.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectProgramId(program.program.id);
                handleRouting(program.status);
              }}
              className="p-2 border border-primary w-[220px] h-[230px] bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex flex-col items-center"
            >
              <div className="w-full h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={program.program.thumbnail}
                  alt={program.program.title}
                  className="h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-primary text-center font-semibold text-sm truncate w-full mb-1">
                {program.program.title}
              </p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  program.status === "CERTIFIED"
                    ? "bg-green-100 text-green-700"
                    : program.status === "STANDARD"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {program.status}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default ChooseProgram;
