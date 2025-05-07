import CommonHeader from "@/common/CommonHeader";
import CourseCard from "@/common/LMS/CourseCard";
import { useLocation } from "react-router-dom";
import { courseData } from "../../common/LMS/standardDeveloperData";

const AllCourses = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-full">
      <CommonHeader>All Courses</CommonHeader>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3">
        {courseData.map((course, i) => (
          <CourseCard key={i} course={course} pathname={pathname} />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
