import React, { useState } from "react";
import { AllAdmin } from "@/store/AdminStore/type/allAdmin";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type AdminCardProps = {
  admin: AllAdmin;
  onEdit?: () => void;
};

const AdminCard: React.FC<AdminCardProps> = ({ admin, onEdit }) => {
  const { deleteAdmin, getAllAdmin } = useAdminStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!admin?.id) return;

    try {
      setIsDeleting(true);
      await deleteAdmin(admin.id);
      await getAllAdmin();
    } catch (error) {
      console.error("Failed to delete admin:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="relative max-w-sm w-full rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border">
      <img
        src={admin.user.profile_photo}
        alt={`${admin.user.firstName} ${admin.user.lastName}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold capitalize text-gray-800">
          {admin.user.firstName} {admin.user.lastName}
        </h2>
        <p className="text-sm text-gray-500">{admin.email}</p>
        <p className="text-sm text-gray-600">{admin.user.companyName}</p>

        <div className="flex items-center justify-between pt-3">
          <span className="text-sm text-gray-700 font-medium">
            Access: <span className="text-green-600">{admin.canAccess}</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 uppercase">
            {admin.status}
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

export default AdminCard;
