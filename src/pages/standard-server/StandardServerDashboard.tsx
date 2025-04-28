import { useState } from "react";
import StarRating from "@/components/ui/StarRating";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import { calculatePercentage } from "@/lib/utils";
import CommonHeader from "@/common/CommonHeader";
import {
  courseFilterArray,
  courseList,
} from "@/common/LMS/standardDeveloperData";

const StandardDeveloperDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("enrolled");
  return (
    <div className="">
      <CommonHeader>Overview</CommonHeader>
      {/* Filter section */}
      <div className="w-full flex flex-col items-center md:flex-row md:justify-start gap-6">
        {courseFilterArray.map((item) => {
          const IconElement = item.icon;
          return (
            <div
              className={`max-w-[282px] w-full p-6 rounded-3xl border-[#9ED98A] cursor-pointer transition-all duration-300 
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

      {/* Course list section */}
      <div className="flex flex-col gap-10 pt-10">
        {courseList.map((course) => {
          const progressPercent = calculatePercentage(
            course.completedLesson,
            course.totalLesson
          );
          return (
            <div
              key={course.id}
              className="max-w-[894px] w-full flex flex-col md:flex-row gap-6 shadow-md border border-[#E7E9E8] rounded-lg p-4 sm:p-6"
            >
              {/* Image section */}
              <div className="flex justify-center">
                <img src={course.image} alt="" className="rounded-lg w-full" />
              </div>

              {/* Course details */}
              <div className="w-full flex flex-col gap-2 md:pr-6">
                <div className="flex justify-between items-center mt-2">
                  <StarRating rating={course.rating} />
                  <StatusBadge status={course.status} />
                </div>
                <p className="text-[18px] text-[#394A3F]">{course.title}</p>
                <p>
                  <span className="text-[#758179] text-[14px]">
                    Completed lesson:
                  </span>
                  <span className="text-[#394A3F] text-[14px] ml-1">
                    {course.completedLesson} of {course.totalLesson} lessons
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                  <ProgressBar percent={progressPercent} />
                  {progressPercent < 100 ? (
                    <p className="text-[#758179] text-[12px]">
                      {progressPercent}% completed
                    </p>
                  ) : (
                    <button className="text-[#394A3F] text-[12px] border-b border-primary cursor-pointer max-sm:pt-2 max-sm:w-fit">
                      Get Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StandardDeveloperDashboard;
