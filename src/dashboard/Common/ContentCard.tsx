import React, { useState } from "react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

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
  const { deleteContent, getAllContent } = useAdminStore();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!content?.id) return;

    try {
      setIsDeleting(true);
      await deleteContent(content.id);
      await getAllContent(content.moduleId);
    } catch (error) {
      console.error("Failed to delete content:", error);
    } finally {
      setIsDeleting(false);
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
          <EditButton onClick={onEdit}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
