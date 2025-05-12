import { useServerStore } from "@/store/ServerStore";
import BuildingInfo from "../standard-consumer/StandardConsumerBuildingInfo";
import PaymentModal from "@/components/Appointment/PaymentModal";
import HandShake from "@/components/basic-consumer/HandShake";
import { useNavigate } from "react-router-dom";

const BasicDeveloperBuildingInfo = () => {
  const { isHandShakeOpen, handleHandShake, isPaymentModalOpen, closePayment } =
    useServerStore();
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

export default BasicDeveloperBuildingInfo;
