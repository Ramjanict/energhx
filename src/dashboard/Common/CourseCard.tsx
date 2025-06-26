import React, { useState } from "react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

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
  const { deleteCourse, getAllCourse } = useAdminStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!course?.id) return;
    setIsDeleting(true); // if you add local state

    try {
      await deleteCourse(course.id);
      await getAllCourse();
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      {course.thumbnail ? (
        <img
          className="w-full h-48 object-cover"
          src={course.thumbnail}
          alt={course.title}
        />
      ) : null}

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
          <EditButton onClick={onEdit}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
