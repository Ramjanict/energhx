import { ReactNode } from "react";

interface CommonHeader {
  children: ReactNode;
  className?: string;
}

const CommonHeader: React.FC<CommonHeader> = ({ children, className }) => {
  return (
    <h2
      className={` font-semibold text-[#112518] font-primary text-lg pb-6 ${className}`}
    >
      {children}
    </h2>
  );
};

export default CommonHeader;
