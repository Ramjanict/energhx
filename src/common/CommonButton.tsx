import { ReactNode } from "react";

interface CommonButton {
  children: ReactNode;
  className?: string;
}

const CommonButton: React.FC<CommonButton> = ({ children, className }) => {
  return (
    <button
      className={`bg-primary text-white text-lg rounded-md px-6 py-3   cursor-pointer  ${className}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
