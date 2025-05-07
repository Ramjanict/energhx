import React from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import newspaperfolding from "/src/assets/courses/newspaper-folding.png";
import carouselvideo from "/src/assets/courses/carousel-video.png";
import { Link } from "react-router-dom";

// Define the Course type
interface Course {
  id: number;
  title: string;
  description: string;
  totalModules: string;
  totalClass: number;
  assignment: number;
  rating: number;
  reviews: number;
  image: string;
}

// Define props type
interface CourseCardProps {
  course: Course;
  pathname?: string;
}

// Function to generate star ratings
const renderStars = (rating: number) => {
  return (
    <div className="flex text-yellow-500 text-lg">
      {/* Filled Stars */}
      {Array.from({ length: Math.floor(rating) }, (_, i) => (
        <IoIosStar key={`filled-${i}`} />
      ))}
      {/* Empty Stars */}
      {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
        <IoIosStarOutline key={`empty-${i}`} />
      ))}
    </div>
  );
};

const CourseCard: React.FC<CourseCardProps> = ({ course, pathname }) => {
  return (
    <div className=" rounded-lg shadow-md  relative p-4">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <span className="absolute bottom-2 left-2 bg-[#FFFAE9] text-[#F1BB00] px-2 py-1 rounded text-sm">
          Total Modules {course.totalModules}
        </span>
      </div>

      {/* Course Details */}
      <h2 className="font-bold text-lg mt-3">{course.title}</h2>
      <p className=" text-[#758179] mt-2">{course.description}</p>
      <div className="flex justify-between items-center mt-3 text-gray-700 text-sm">
        <span className="flex gap-2">
          <img src={carouselvideo} /> {course.totalClass} Classes
        </span>
        <span className="flex gap-2">
          <img src={newspaperfolding} /> {course.assignment} Assignments
        </span>
      </div>

      {/* Star Ratings */}
      <div className="flex items-center mt-4">
        {renderStars(course.rating)}
        <span className="text-gray-500 text-sm ml-2">
          (Review {course.reviews})
        </span>
      </div>

      {pathname && (
        <Link to={`${pathname}/${course.id}`}>
          <button className="bg-[#EAF7E6] text-[#2DAD00] w-full py-2 mt-6 rounded-lg cursor-pointer hover:bg-[#2DAD00] hover:text-white">
            Book Now
          </button>
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
