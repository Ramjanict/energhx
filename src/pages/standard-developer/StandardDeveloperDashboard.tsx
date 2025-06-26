import { useEffect, useState } from "react";
import {
  courseFilterArray,
  courseList,
} from "../../common/LMS/standardDeveloperData";
import StarRating from "@/components/ui/StarRating";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import { calculatePercentage } from "@/lib/utils";
import CommonHeader from "@/common/CommonHeader";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import CourseCard from "@/common/LMS/CourseCard";

const StandardDeveloperDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("enrolled");
  const navigate = useNavigate();
  const { singleProgram, getSingleProgram, DevToken, courseProgress } =
    useAdminStore();

  useEffect(() => {
    if (!DevToken) {
      navigate("/basic-developer/form");
    }
  }, [DevToken]);

  useEffect(() => {
    const programId = localStorage.getItem("selectedProgram");
    if (programId) {
      getSingleProgram(programId);
    }
  }, []);
  return (
    <div className="">
      <CommonHeader>Overview</CommonHeader>
      {/* Filter section */}
      <div className="w-full flex flex-col items-center md:flex-row md:justify-start gap-6">
        {courseFilterArray.map((item) => {
          const IconElement = item.icon;
          return (
            <div
              className={` w-full p-6 rounded-3xl border-[#9ED98A] cursor-pointer transition-all duration-300 
                ${
                  item.value === selectedFilter
                    ? "bg-primary"
                    : "bg-light-green border"
                }
                hover:scale-105
              `}
              onClick={() => setSelectedFilter(item.value)}
              key={item.id}
            >
              <div className="flex justify-center mb-3">
                <span
                  className={`text-6xl 
                    ${
                      item.value === selectedFilter
                        ? "text-white"
                        : "text-primary"
                    }
                  `}
                >
                  <IconElement />
                </span>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-extrabold font-akira 
                    ${
                      item.value === selectedFilter
                        ? "text-white"
                        : "text-[#1C9237]"
                    }
                  `}
                >
                  {item.number}
                </p>
                <p
                  className={`text-[18px] 
                    ${
                      item.value === selectedFilter
                        ? "text-white"
                        : "text-[#394A3F]"
                    }
                  `}
                >
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-10">
        {singleProgram?.courses?.length > 0 ? (
          <div className=" flex flex-col gap-6">
            {singleProgram.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                courseProgress={courseProgress}
              />
            ))}
          </div>
        ) : (
          <p className=" text-gray-500">
            No courses are currently available for this program. Please check
            back later or select a different program.
          </p>
        )}
      </div>
    </div>
  );
};

export default StandardDeveloperDashboard;
