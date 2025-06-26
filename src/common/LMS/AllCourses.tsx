import { useEffect, useState } from "react";
import CommonHeader from "@/common/CommonHeader";
import CourseCard from "@/common/LMS/CourseCard";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import ModuleInterface from "./ModuleInterface";
import { Link } from "react-router-dom";
import ModuleDisplay from "./ModuleDisplay";
import { BasicContent } from "@/store/AdminStore/type/allModule";
const AllCourses = () => {
  const [selectBasicContent, setSelectBasicContent] =
    useState<BasicContent | null>(null);
  const [selectModulesId, setSelectModulesId] = useState<string | null>(null);

  const {
    singleProgram,
    getSingleProgram,
    setProgress,
    getProgress,
    courseProgress,
    allModule,
  } = useAdminStore();

  useEffect(() => {
    const programId = localStorage.getItem("selectedProgram");
    if (programId) {
      getSingleProgram(programId);
    }
  }, []);

  const [isHandleProgress, setIsHandleProgress] = useState(false);

  const handleProgress = async (courseId: string, singleContentId: string) => {
    try {
      setIsHandleProgress(true);
      setSelectModulesId(singleContentId);
      await setProgress(courseId, singleContentId);
      await getProgress(courseId);
    } catch (error) {
      console.error("Error handling progress:", error);
      // Optional: show toast or UI feedback here
    } finally {
      setIsHandleProgress(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 pb-6">
        <CommonHeader className="!pb-0">All Courses</CommonHeader>
        <Link
          to="/choose-program"
          className="cursor-pointer px-4 py-1 rounded-lg bg-primary text-white transition hover:bg-green-500"
        >
          Choose program
        </Link>
      </div>

      {(!!allModule?.basicContents?.length || !!allModule?.modules?.length) && (
        <div className="flex justify-between gap-6 mb-10 w-full">
          <ModuleDisplay
            selectBasicContent={selectBasicContent}
            selectModulesId={selectModulesId}
            isHandleProgress={isHandleProgress}
          />
          <ModuleInterface
            handleProgress={handleProgress}
            setSelectBasicContent={setSelectBasicContent}
          />
        </div>
      )}

      <div>
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

export default AllCourses;
