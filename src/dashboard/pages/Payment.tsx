import { useAdminStore } from "@/store/AdminStore/AdminStore";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import PaymentCard from "../components/PaymentCard";
import AdminCommonButton from "../Common/AdminCommonButton";

const Payment = () => {
  const { getAllPayment, allPayment, isPaymentFetching } = useAdminStore();

  const handleClick = async () => {
    await getAllPayment();
  };
  return (
    <div>
      <AdminCommonHeader> Show Payments</AdminCommonHeader>
      <AdminCommonButton onClick={handleClick} className={` !w-fit`}>
        {isPaymentFetching ? "Processing..." : "Show Payments"}
      </AdminCommonButton>

      <PaymentCard allPayment={allPayment} />
    </div>
  );
};

export default Payment;
