import { useServerStore } from "@/store/ServerStore";
import Settings from "../../common/Settings";
import HandShake from "@/components/basic-consumer/HandShake";
import PaymentModal from "@/components/Appointment/PaymentModal";
import { useNavigate } from "react-router-dom";

const ServerSettings = () => {
  const navigate = useNavigate();
  const { isHandShakeOpen, handleHandShake, isPaymentModalOpen, closePayment } =
    useServerStore();

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
