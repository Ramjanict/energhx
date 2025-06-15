import { Link } from "react-router-dom";
import successImg from "../../assets/success.gif";

const Success = () => {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-96px)] bg-slate-100">
      <div className="flex flex-col items-center bg-white px-6 py-10 rounded-xl shadow-lg space-y-6">
        <img
          src={successImg}
          alt="Payment Success"
          className="w-32 h-32 object-contain mix-blend-multiply"
        />
        <h1 className="text-2xl font-semibold text-green-600">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-center max-w-sm">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Success;
