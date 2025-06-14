import Biomass from "@/components/basic-consumer/Microservice/Biomass";
import { Button } from "../ui/button";
import Solar from "@/components/basic-consumer/Microservice/Solar";
import TwoTitle from "./TwoTitle";
import RoomOverView from "./Microservice/RoomOverView";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../Appointment/PaymentModal";
import HandShake from "./HandShake";
import { usePaymentStore } from "@/store/PaymentStore/PaymentStore";

interface TotalOverview {
  nextStep?: () => void;
}

const TotalOverview: React.FC<TotalOverview> = ({ nextStep }) => {
  const navigate = useNavigate();
  const {
    isHandShakeOpen,
    handleHandShake,
    isPaymentModalOpen,
    showPayment,
    closePayment,
  } = usePaymentStore();

  const handlenext = () => {
    showPayment();
    nextStep;
  };
  return (
    <>
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center overflow-scroll  ">
        <div className="bg-white h-full rounded-xl p-10 max-w-2xl  flex flex-col gap-10 text-[#394A3F] mt-[10%] overflow-auto  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] overflow-x-hidden">
          <RoomOverView />
          <Solar />
          <Biomass />
          <TwoTitle
            blackHeader="BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
            greenHeader="CONCLUSION AND RECOMMENDATIONS"
          />
          <div onClick={handlenext}>
            <Button className="text-white cursor-pointer">
              RECOMMENDATIONS
            </Button>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default TotalOverview;
