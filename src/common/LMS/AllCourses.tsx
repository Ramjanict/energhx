import { useEffect, useState } from "react";

import CommonHeader from "@/common/CommonHeader";
import CourseCard from "@/common/LMS/CourseCard";
import Loading from "@/components/basic-consumer/Loading";

import { useAdminStore } from "@/store/AdminStore/AdminStore";
import VideoInterface from "./VideoInterface";
import ModuleInterface from "./ModuleInterface";

const AllCourses = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const { singleProgram, isLoading, allModule, getSingleProgram } =
    useAdminStore();

  useEffect(() => {
    const programId = localStorage.getItem("selectedProgram");
    if (programId) {
      getSingleProgram(programId);
    }
  }, []);

  return (
    <div className="w-full">
      <CommonHeader>All Courses</CommonHeader>

      {Boolean(allModule?.basicContents?.length) && (
        <div className="flex justify-between gap-10 mb-10">
          <VideoInterface videoUrl={videoUrl} />
          <ModuleInterface
            setVideoUrl={setVideoUrl}
            module={allModule?.basicContents ?? []}
          />
        </div>
      )}

      <div className=" ">
        {!isLoading ? (
          singleProgram.courses.length > 0 ? (
            <div className=" flex flex-col gap-6">
              {singleProgram.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className=" text-gray-500">
              No courses are currently available for this program. Please check
              back later or select a different program.
            </p>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AllCourses;
