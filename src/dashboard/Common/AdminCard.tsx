import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { AllAdmin } from "@/store/AdminStore/type/allAdmin";

type ProgramCardProps = {
  admin: AllAdmin;
  onEdit?: () => void;
};

const AdminCard: React.FC<ProgramCardProps> = ({ admin, onEdit }) => {
  const { isLoading } = useAdminStore();

  console.log("admin", admin);
  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      <img
        className="w-full h-48 object-cover"
        src={admin.thumbnail}
        alt={admin.canAccess || "Program Thumbnail"}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {admin.email}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">{admin.status}</p>
        <div className="flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-green-600">
            ${admin.canAccess}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 uppercase">
            {admin.status}
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
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-white border border-red-600 rounded-lg hover:bg-red-600 transition  cursor-pointer">
            <Trash2 size={16} />

            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
