import React from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import carouselvideo from "/src/assets/courses/carousel-video.png";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { FaCrown } from "react-icons/fa6";

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
}

const renderStars = (rating: number) => (
  <div className="flex text-yellow-500 text-base">
    {Array.from({ length: Math.floor(rating) }, (_, i) => (
      <IoIosStar key={`filled-${i}`} />
    ))}
    {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
      <IoIosStarOutline key={`empty-${i}`} />
    ))}
  </div>
);

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
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
  console.log("course", course);
  return (
    <div className="rounded-xl shadow-[0_0_1px_2px_rgba(0,0,0,0.04)] p-4 bg-white hover:shadow-lg transition duration-300 ">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-[250px] h-[200px] object-cover rounded-lg"
        />

        <div className="f flex flex-col gap-4">
          <h2 className="font-semibold  text-xl md:text-2xl text-gray-800">
            {course.title}
          </h2>

          <div className="flex  gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <img src={carouselvideo} alt="Modules" className="w-5 h-5" />
              <span>{course._count?.modules} modules</span>
            </div>
            <div className="flex items-center">
              {renderStars(course.averageRating)}
              <span className="text-gray-500 text-sm ml-2">
                ({course._count?.reviews} Reviews)
              </span>
            </div>
          </div>

          <div className="flex  items-center gap-6 mt-2">
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
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
