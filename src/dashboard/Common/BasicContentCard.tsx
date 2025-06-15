import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

type BasicContent = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};

type BasicContentProps = {
  basicContent: BasicContent;
  onEdit?: () => void;
  selectedCourseId: string;
};

const BasicContentCard: React.FC<BasicContentProps> = ({
  basicContent,
  onEdit,
  selectedCourseId,
}) => {
  const { isLoading, getAllModule, deleteModule } = useAdminStore();

  const handleDelete = async () => {
    try {
      await deleteModule(basicContent.id);
      await getAllModule(selectedCourseId);
    } catch (error) {
      console.error("Failed to delete program:", error);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      <img
        className="w-full h-48 object-cover"
        src={basicContent.thumbnail}
        alt={basicContent.title || "Program Thumbnail"}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {basicContent.title}
        </h2>
        module
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

export default BasicContentCard;
