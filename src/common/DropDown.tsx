import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { Link, useNavigate } from "react-router-dom";

const DropDown = () => {
  const { token, logOutUser } = useConsumerStore();
  const navigate = useNavigate();
  return (
    <div className="w-48 bg-white shadow-lg rounded-lg z-50">
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li
          onClick={() => {
            logOutUser();
            navigate("/login");
          }}
          className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
        >
          {token ? <span>Logout</span> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
