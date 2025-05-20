import ThanksForm from "@/common/ThanksForm";
import Biomass from "@/components/basic-consumer/Microservice/Biomass";
import RoomOverView from "@/components/basic-consumer/Microservice/RoomOverView";
import Solar from "@/components/basic-consumer/Microservice/Solar";
import TwoTitle from "@/components/basic-consumer/TwoTitle";
import { Button } from "@/components/ui/button";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { useEffect, useState } from "react";

const BasicConsumerAnalysis = () => {
  const [step, setStep] = useState(1);
  const { user } = useConsumerStore();
  const { getAllBuildings, token } = useConsumerStore();

  const nextStep = () => {
    setStep((pre) => pre + 1);
  };

  useEffect(() => {
    getAllBuildings();
  }, [token]);

  return (
    <>
      {step !== 2 && (
        <>
          <RoomOverView />
          <Solar />
          <Biomass />
          <TwoTitle
            blackHeader="BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
            greenHeader="CONCLUSION AND RECOMMENDATIONS"
          />
          <div onClick={nextStep} className="  py-5">
            <Button className="text-white cursor-pointer ">
              Upgrade to Standard
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <ThanksForm
          title={`Welcome  ${user?.firstname}`}
          path="/standard-consumer/dashboard"
        />
      )}
    </>
  );
};

export default BasicConsumerAnalysis;
