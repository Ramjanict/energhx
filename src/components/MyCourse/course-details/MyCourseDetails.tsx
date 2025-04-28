import {
  singleCourseModuleList,
  singleCourseClassList,
  singleCourseAssignmentList,
} from "../../../common/LMS/standardDeveloperData";
import { FaLongArrowAltRight } from "react-icons/fa";
import MyModule from "../module/MyModue";
import { generateRandomId } from "@/lib/utils";
import { useState } from "react";
import MyClassDetails from "../class/MyClass";
import MyAssignment from "../assignment/MyAssignment";
import MyCertificate from "../certificate/MyCertificate";

const MyCourseDetails = () => {
  const [selectedFilter, setSelectedFilter] = useState("module");

  const filterArray = [
    { id: generateRandomId, label: "Module", value: "module" },
    { id: generateRandomId(), label: "Class", value: "class" },
    { id: generateRandomId(), label: "Assignment", value: "assignment" },
    { id: generateRandomId(), label: "Certificate", value: "certificate" },
  ];

  return (
    <div>
      <p className="text-sm sm:text-lg  text-[#112518] flex items-center">
        My Course
        <span className="mx-3">
          <FaLongArrowAltRight />
        </span>
        <span className="font-semibold">Course Details</span>
      </p>
      <div className="flex flex-col md:flex-row gap-4 py-6 border-b border-[#E7E9E8]">
        {filterArray.map((item) => {
          return (
            <button
              onClick={() => setSelectedFilter(item.value)}
              className={`px-3 py-2 border cursor-pointer rounded-full max-sm:w-full ${
                item.value === selectedFilter
                  ? "bg-[#FFFAE9] text-[#F1BB00] border-[#F1BB00]"
                  : "bg-[#E7E9E8] text-[#9DA6A0] border-[#9DA6A0]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="pt-3">
        {selectedFilter === "module" && (
          <MyModule moduleList={singleCourseModuleList} />
        )}
        {selectedFilter === "class" && (
          <MyClassDetails classList={singleCourseClassList} />
        )}
        {selectedFilter === "assignment" && (
          <MyAssignment assignmentList={singleCourseAssignmentList} />
        )}
        {selectedFilter === "certificate" && <MyCertificate />}
      </div>
    </div>
  );
};
export default MyCourseDetails;
