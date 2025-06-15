import { ReactNode } from "react";

interface CommonButton {
  children: ReactNode;
  className?: string;
}

const CommonButton: React.FC<CommonButton> = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={`bg-primary text-white text-lg rounded-md px-6 py-2   cursor-pointer  ${className}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
