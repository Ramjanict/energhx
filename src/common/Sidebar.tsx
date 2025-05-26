import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { SidebarProps } from "@/types";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const { token, logOutUser } = useConsumerStore();

  return (
    <div className="w-fit h-screen text-[#758179] border-r border-t border-r-[#E7E9E8] border-t-[#E7E9E8]  border-gray-300 z-10 ">
      <ul>
        {menuItems.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={item.label === "Logout" ? logOutUser : undefined}
              className={({ isActive }) =>
                `flex items-center font-primary gap-1 font-light text-lg relative group  p-3 rounded-sm ${
                  isActive ? "bg-primary text-white" : "hover:bg-[#EAF7E6]"
                } ${
                  item.label === "Building Information" && !token && " hidden"
                }`
              }
            >
              {/* <span>{item.icon}</span> */}
              <item.icon size={20} />
              <div className={`hidden xl:block `}>{item.label}</div>

              <div className="absolute  translate-x-9 invisible group-hover:visible min-w-fit xl:group-hover:invisible z-20">
                <div className="w-full">
                  <div className="p-2 text-white rounded-md bg-primary text-xs ">
                    {item.label}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
