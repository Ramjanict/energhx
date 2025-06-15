import BuildingInfo from "../standard-consumer/StandardConsumerBuildingInfo";
import PaymentModal from "@/components/Appointment/PaymentModal";
import HandShake from "@/components/basic-consumer/HandShake";
import { usePaymentStore } from "@/store/PaymentStore/PaymentStore";
import { useNavigate } from "react-router-dom";

const BasicServerBuildingInfo = () => {
  const { isHandShakeOpen, handleHandShake, isPaymentModalOpen, closePayment } =
    usePaymentStore();
  const navigate = useNavigate();
  return (
    <div>
      <BuildingInfo />

      {isPaymentModalOpen && (
        <PaymentModal isOpen={isPaymentModalOpen} onClose={closePayment} />
      )}

      {isHandShakeOpen && (
        <HandShake
          handleClose={() => {
            handleHandShake(false);
            navigate("/standard-consumer");
          }}
        />
      )}
    </div>
  );
};

export default BasicServerBuildingInfo;
