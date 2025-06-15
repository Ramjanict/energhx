import Settings from "../../common/Settings";
import HandShake from "@/components/basic-consumer/HandShake";
import PaymentModal from "@/components/Appointment/PaymentModal";
import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "@/store/PaymentStore/PaymentStore";

const ServerSettings = () => {
  const navigate = useNavigate();
  const { isHandShakeOpen, handleHandShake, isPaymentModalOpen, closePayment } =
    usePaymentStore();

  return (
    <div>
      <Settings />

      {isPaymentModalOpen && (
        <PaymentModal isOpen={isPaymentModalOpen} onClose={closePayment} />
      )}

      {isHandShakeOpen && (
        <HandShake
          handleClose={() => {
            handleHandShake(false);
            navigate("/standard-server");
          }}
        />
      )}
    </div>
  );
};

export default ServerSettings;
