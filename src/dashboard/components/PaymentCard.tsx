import { PaymentDataItem } from "@/store/AdminStore/type/allPayment";

interface PaymentCardProps {
  allPayment: PaymentDataItem[];
}
const PaymentCard: React.FC<PaymentCardProps> = ({ allPayment }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10 pt-6">
      {allPayment.map((payment) => (
        <div
          key={`${payment.userId}-${payment.programId}`}
          className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border p-4 flex flex-col space-y-4"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {payment.user.firstName}
            </h2>
            <p className="text-sm text-gray-500">{payment.user.email}</p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-700 capitalize">
              {payment.program.title}
            </p>
            <p className="text-sm text-gray-500">
              Status:
              <span
                className={
                  payment.paymentStatus === "SUCCESS"
                    ? "text-green-600 font-semibold"
                    : payment.paymentStatus === "PENDING"
                    ? "text-yellow-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {payment.paymentStatus || "Unknown"}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Program status: {payment.status.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentCard;
