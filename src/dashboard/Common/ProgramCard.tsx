import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { useState } from "react";

type Program = {
  id: string;
  thumbnail: string;
  description: string;
  title: string;
  price: number;
  publishedFor: "DEVELOPER" | "SERVER";
};

type ProgramCardProps = {
  program: Program;
  onEdit?: () => void;
};

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onEdit }) => {
  const { deleteProgram, getAllProgram } = useAdminStore();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProgram(program.id);
      await getAllProgram();
    } catch (error) {
      console.error("Failed to delete program:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      <img
        className="w-full h-48 object-cover"
        src={program.thumbnail}
        alt={program.title || "Program Thumbnail"}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {program.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {program.description}
        </p>
        <div className="flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-green-600">
            ${program.price}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 uppercase">
            {program.publishedFor}
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

export default ProgramCard;
