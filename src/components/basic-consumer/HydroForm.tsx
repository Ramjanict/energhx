import BlackHeader from "@/common/BlackHeader";
import lightGreen from "../../assets/Profile/lightGreen.svg";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";
interface HydroForm {
  nextStep: () => void;
}
const HydroForm: React.FC<HydroForm> = ({ nextStep }) => {
  const { token, getEnergyAudit, energyAudit } = basicConsumerStore();
  console.log("energyAudit", energyAudit);
  console.log("token", token);

  useEffect(() => {
    if (token) {
      getEnergyAudit();
    }
  }, [token]);

  const handleClose = () => {
    if (!energyAudit) {
      getEnergyAudit();
    }
    nextStep();
  };

  console.log("energyAudit", energyAudit);
  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity flex items-center justify-center overflow-scroll">
      <div className=" bg-white rounded-xl p-8 max-w-2xl max-h-screen shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]  mx-4   flex flex-col gap-4 text-[#394A3F] ">
        <BlackHeader>Products for " Hydro Ottawa Limited" Utility</BlackHeader>
        <div className="flex   items-start gap-1">
          <img src={lightGreen} alt="light" />
          <p>
            5 Year Demand Side Monitoring Plan at the Ontario Energy Board (OEB)
            - approved Regulated Price Plan (RPP) or Market Price, throughout
            the period of the Contract. You will also continue to pay the
            standard delivery charges, regulatory charges, utility charges and
            debt retirement charge to your utility every month.
          </p>
        </div>

        <div className="flex  items-start gap-1">
          <img src={lightGreen} alt="light" />
          <p>
            You will also be responsible for a one-time enrolment/re-enrolment
            fee of $1.50 and an 80¢ per month billing fee. As always you will be
            responsible for regulated delivery, regulatory, debt retirement and
            other costs billed by your utility. You will also remain entitled
            to/bound by the Global Adjustment billed by your utility. The
            following documents are available to be printed or downloaded
            without any obligation to enter a contract and contain more
            information about the offer.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="bg-primary text-white rounded-md w-fit px-4 py-2 cursor-pointer mx-auto mt-40 "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HydroForm;
