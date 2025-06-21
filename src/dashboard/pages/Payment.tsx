import { useAdminStore } from "@/store/AdminStore/AdminStore";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import PaymentCard from "../components/PaymentCard";

const Payment = () => {
  const { getAllPayment, allPayment, isLoading } = useAdminStore();

  const handleClick = async () => {
    await getAllPayment();
  };
  return (
    <div>
      <AdminCommonHeader> Show Payments</AdminCommonHeader>
      <button
        onClick={handleClick}
        className={`bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer ${isLoading}`}
      >
        {isLoading ? "Processing..." : "Show Payments"}
      </button>

      <PaymentCard allPayment={allPayment} />
    </div>
  );
};

export default Payment;
