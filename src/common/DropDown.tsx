import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { Link, useNavigate } from "react-router-dom";

const DropDown = () => {
  const { token, logOutUser } = useConsumerStore();
  const { DevToken, logout } = useAdminStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (token) {
      logOutUser();
    } else if (DevToken) {
      logout();
    }
    navigate("/login");
  };

  const isLoggedIn = Boolean(token || DevToken);

  return (
    <div className="w-48 bg-white shadow-lg rounded-lg z-50">
      <Link
        to="/admin-login"
        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer w-full"
      >
        Admin
      </Link>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="block text-left px-4 py-2 text-red-600 hover:bg-gray-100 w-full cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer w-full"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default DropDown;
