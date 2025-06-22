import React from "react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type Module = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};

type ModuleCardProps = {
  module: Module;
  onEdit?: () => void;
  selectedCourseId: string;
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onEdit,
  selectedCourseId,
}) => {
  const { isModuleDeleting, getAllModule, deleteModule } = useAdminStore();

  const handleDelete = async () => {
    try {
      await deleteModule(module.id);
      await getAllModule(selectedCourseId);
    } catch (error) {
      console.error("Failed to delete program:", error);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      <img
        className="w-full h-48 object-cover"
        src={module.thumbnail}
        alt={module.title || "Program Thumbnail"}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {module.title}
        </h2>

        <div className="flex justify-end items-center gap-2 pt-4">
          <EditButton onClick={onEdit}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>
            {isModuleDeleting ? "Deleting..." : "Delete"}
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
