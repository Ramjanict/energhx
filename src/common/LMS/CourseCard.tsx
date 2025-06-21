import React from "react";
import { useState } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

import carouselvideo from "/src/assets/courses/carousel-video.png";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { FaCrown } from "react-icons/fa6";
import ProgressBar from "@/dashboard/components/ProgressBar";
import { WatchedContentProgress } from "@/store/AdminStore/type/allProgress";

export type CourseData = {
  id: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  programId: string;
  _count: { modules: number; reviews: number };
};

interface CourseCardProps {
  course: CourseData;
  courseProgress: WatchedContentProgress;
}

// const renderStars = (rating: number) => (
//   <div className="flex text-yellow-500 text-base">
//     {Array.from({ length: Math.floor(rating) }, (_, i) => (
//       <IoIosStar key={`filled-${i}`} />
//     ))}
//     {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
//       <IoIosStarOutline key={`empty-${i}`} />
//     ))}
//   </div>
// );

const StarRating = () => {
  const [rating, setRating] = useState(0); // Current saved rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  const handleClick = (value: number) => {
    if (rating === value) {
      setRating(0); // toggle off
    } else {
      setRating(value);
    }
  };

  const renderStar = (index: number) => {
    const effectiveRating = hoverRating || rating;

    if (effectiveRating >= index + 1) {
      return <IoIosStar key={index} />;
    } else if (effectiveRating >= index + 0.5) {
      return <IoIosStarHalf key={index} />;
    } else {
      return <IoIosStarOutline key={index} />;
    }
  };

  return (
    <div className="flex items-center text-yellow-500 text-2xl">
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
          className="cursor-pointer"
        >
          {renderStar(index)}
        </span>
      ))}
      <span className="text-sm text-gray-500 ml-2">
        ({rating > 0 ? `Rated: ${rating}` : "0 Reviews"})
      </span>
    </div>
  );
};

const CourseCard: React.FC<CourseCardProps> = ({ course, courseProgress }) => {
  const { getAllModule, payment } = useAdminStore();

  const handlePayment = async (programId: string) => {
    if (programId) {
      await payment(programId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full rounded-xl shadow-[0_0_1px_2px_rgba(0,0,0,0.04)] p-4 bg-white hover:shadow-lg transition duration-300 ">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-[250px] h-[200px] object-cover rounded-lg"
        />

        <div className="w-full flex flex-col gap-4">
          <h2 className="font-semibold  text-xl md:text-2xl text-gray-800">
            {course.title}
          </h2>

          <div className="flex  gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <img src={carouselvideo} alt="Modules" className="w-5 h-5" />
              <span>{course._count?.modules} modules</span>
            </div>
            <div className="flex items-center">
              <StarRating />
            </div>
          </div>

          <div className="flex  items-center gap-6 ">
            <button
              onClick={() => handlePayment(course.programId)}
              className="cursor-pointer px-4 py-2 rounded-lg bg-primary text-white transition hover:bg-green-500"
            >
              <div className="flex items-center gap-1 text-xs sm:text-lg">
                <span>
                  <FaCrown />
                </span>
                Upgrade
              </div>
            </button>

            <button
              onClick={() => {
                getAllModule(course.id);
                scrollToTop();
              }}
              className="cursor-pointer px-4 py-2 rounded-lg bg-primary text-white transition hover:bg-green-500"
            >
              Continue Course
            </button>
          </div>
          <ProgressBar percentage={courseProgress.percentage} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
