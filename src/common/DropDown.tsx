import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { useServerStore } from "@/store/ServerStore/ServerStore";
import { Link, useNavigate } from "react-router-dom";

const DropDown = () => {
  const { token, logOutUser } = useConsumerStore();
  const { DevToken, logout } = useServerStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (token) {
      logOutUser();
    } else if (DevToken) {
      logout();
    }
    navigate("/login");
  };

  const isLoggedIn = token || DevToken;

  return (
    <div className="w-48 bg-white shadow-lg rounded-lg z-50">
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link to="/admin-login">Admin</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link to="/settings">Settings</Link>
        </li>
        <li
          onClick={isLoggedIn ? handleLogout : undefined}
          className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
        >
          {isLoggedIn ? <span>Logout</span> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
