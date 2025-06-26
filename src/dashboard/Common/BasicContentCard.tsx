import React, { useState } from "react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export type BasicContent = {
  id: string;
  title: string;
  video: File;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};

type BasicContentProps = {
  basicContent?: BasicContent; // Make it optional
  onEdit?: () => void;
  selectedCourseId: string;
};

const BasicContentCard: React.FC<BasicContentProps> = ({
  basicContent,
  onEdit,
  selectedCourseId,
}) => {
  const { getAllModule, deleteBasicContent } = useAdminStore();
  const [isDeleting, setIsDeleting] = useState(false);

  // If no data, don't render anything
  if (!basicContent) return null;

  const handleDelete = async () => {
    if (!basicContent?.id) return;

    try {
      setIsDeleting(true);
      await deleteBasicContent(basicContent.id);
      await getAllModule(selectedCourseId);
    } catch (error) {
      console.error("Failed to delete basic content:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      {basicContent.video && (
        <video
          src={
            basicContent.video instanceof File
              ? URL.createObjectURL(basicContent.video)
              : basicContent.video
          }
          controls
          className="w-full max-h-60 object-contain bg-black"
        />
      )}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {basicContent.title}
        </h2>

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

export default BasicContentCard;
