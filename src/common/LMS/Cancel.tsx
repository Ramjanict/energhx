import { Link } from "react-router-dom";
import cancelImg from "../../assets/cancel.gif";

const Cancel = () => {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-96px)] bg-slate-100">
      <div className="flex flex-col items-center bg-white px-6 py-10 rounded-xl shadow-lg space-y-6">
        <img
          src={cancelImg}
          alt="Payment Cancelled"
          className="w-32 h-32 object-contain mix-blend-multiply"
        />
        <h1 className="text-2xl font-semibold text-red-600">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 text-center max-w-sm">
          Your payment was not completed. If this was a mistake, please try
          again or contact support.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
