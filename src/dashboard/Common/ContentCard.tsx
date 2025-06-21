import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    contentType: "DESCRIPTION" | "VIDEO" | "QUIZ";
    video?: string | null;
    description?: string | null;
    moduleId: string;
    createdAt: string;
    updatedAt: string;
  };
  onEdit?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onEdit }) => {
  const { deleteContent, getAllContent, isLoading } = useAdminStore();

  const handleDelete = async () => {
    try {
      await deleteContent(content.id);
      await getAllContent(content.moduleId);
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      {content.contentType === "VIDEO" && content.video ? (
        <video
          src={content.video}
          controls
          className="w-full max-h-60 object-contain bg-black"
        />
      ) : content.contentType === "DESCRIPTION" && content.description ? (
        <div className="p-4">
          <p className="text-gray-700 text-sm  line-clamp-6">
            {content.description}
          </p>
        </div>
      ) : (
        <div className="p-4">
          <p className="italic text-gray-500 text-sm">Quiz content</p>
        </div>
      )}

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {content.title}
        </h2>
        <p className="text-sm text-gray-500 capitalize">
          {content.contentType.toLowerCase()}
        </p>

        <div className="flex justify-end items-center gap-2 pt-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-white border border-blue-600 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-white border border-red-600 rounded-lg hover:bg-red-600 transition cursor-pointer"
            disabled={isLoading}
          >
            <Trash2 size={16} />
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
