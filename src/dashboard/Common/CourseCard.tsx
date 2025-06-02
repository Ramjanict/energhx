import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

type course = {
  id: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  programId: string;
};

type courseCardProps = {
  course: course;
  onEdit?: () => void;
};

const CourseCard: React.FC<courseCardProps> = ({ course, onEdit }) => {
  const { deleteProgram, getAllCourse, isLoading } = useAdminStore();

  const handleDelete = async () => {
    try {
      await deleteProgram(course.id);
      await getAllCourse();
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      <img
        className="w-full h-48 object-cover"
        src={course.thumbnail}
        alt={course.title || "course Thumbnail"}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600">Rating: {course.averageRating}</p>
        <div className="flex items-center justify-between pt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              course.isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {course.isCompleted ? "Completed" : "In Progress"}
          </span>
          <span className="text-xs text-gray-500">
            Created: {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-end items-center gap-2 pt-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-white border border-blue-600 rounded-lg hover:bg-blue-600 transition  cursor-pointer"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-white border border-red-600 rounded-lg hover:bg-red-600 transition  cursor-pointer"
          >
            <Trash2 size={16} />
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
