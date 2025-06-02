import React, { ReactNode } from "react";

interface AdminCommonButton {
  children: ReactNode;
  className?: string;
}
const AdminCommonButton: React.FC<AdminCommonButton> = ({
  children,
  className,
}) => {
  return (
    <div>
      <button
        type="submit"
        className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default AdminCommonButton;
