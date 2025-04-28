import newspaperfolding from "/src/assets/courses/newspaper-folding.png";
import carouselvideo from "/src/assets/courses/carousel-video.png";
import { calculatePercentage } from "@/lib/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import StarRating from "@/components/ui/StarRating";

// Define the Course type
export interface Course {
  id: number;
  title: string;
  description: string;
  totalModules: string;
  totalClass: number;
  assignment: number;
  rating: number;
  reviews: number;
  image: string;
  moduleNo: number;
  completedClass: number;
  completedAssignment: number;
}

// Define props type
interface CourseCardProps {
  course: Course;
}

const MySingleModuleCard: React.FC<CourseCardProps> = ({ course }) => {
  const progressPercent = calculatePercentage(
    course.completedAssignment + course.completedClass,
    course.totalClass + parseInt(course.totalModules)
  );
  return (
    <div className=" p-4 rounded-lg shadow-md max-w-76 relative">
      {/* Image Wrapper with Absolute Badge */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <span className="absolute bottom-2 left-2 bg-[#FFFAE9] text-[#F1BB00] px-2 py-1 rounded text-sm">
          Module {course.moduleNo}
        </span>
      </div>

      {/* Course Details */}
      <p className="text-sm sm:text-lg text-[#394A3F] font-medium mt-3">
        {course.title}
      </p>

      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center gap-2 mt-3 text-gray-700 text-sm">
          <span className="flex gap-1 items-center text-xs sm:text-base">
            <img className="w-4 h-4" src={carouselvideo} /> Total Classe:
            {course.totalClass}
          </span>
          <span className="flex gap-1 items-center text-xs sm:text-base">
            <img className="w-4 h-4" src={newspaperfolding} /> Assignment:
            {course.assignment}
          </span>
        </div>

        <div className="flex justify-between text-[12px] text-[#758179]">
          <p>
            {course.completedAssignment}/{course.assignment}
          </p>
          <p>{progressPercent}% Completed</p>
        </div>
        <div>
          <ProgressBar percent={progressPercent} />
        </div>

        {/* Star Ratings */}
        <div className="flex  items-center gap-3">
          <StarRating rating={course.rating} />
          <p className="text-[16px] text-[#394A3F]">{course.rating}</p>
          <p className="sm:text-base text-[#394A3F] text-xs">
            (Review {course.reviews})
          </p>
        </div>
      </div>

      <button className="bg-[#E7E9E8] text-[#758179] border border-[#758179]  w-full py-2 text-[18px] rounded-sm mt-2 cursor-pointer hover:bg-[#EAF7E6] hover:text-[#2DAD00] hover:border-[#2DAD00]">
        Start Now
      </button>
    </div>
  );
};

export default MySingleModuleCard;
