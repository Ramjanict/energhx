import ThanksForm from "@/common/ThanksForm";
import EnbridgeForm from "@/components/basic-consumer/EnbridgeForm";
import HydroForm from "@/components/basic-consumer/HydroForm";
import Biomass from "@/components/basic-consumer/Microservice/Biomass";
import RoomOverView from "@/components/basic-consumer/Microservice/RoomOverView";
import Solar from "@/components/basic-consumer/Microservice/Solar";
import TwoTitle from "@/components/basic-consumer/TwoTitle";
import { Button } from "@/components/ui/button";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useState } from "react";

const BasicConsumeranalysis = () => {
  const [step, setStep] = useState(1);
  const { user } = basicConsumerStore();

  console.log("user");
  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    if (step > 1) {
      setStep((pre) => pre - 1);
    }
  };
  console.log("step", prevStep);
  return (
    <>
      {step !== 4 && (
        <>
          <RoomOverView />
          <Solar />
          <Biomass />
          <TwoTitle
            blackHeader="BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
            greenHeader="CONCLUSION AND RECOMMENDATIONS"
          />
          <div onClick={nextStep} className="  py-5">
            <Button className="text-white cursor-pointer ">Upgrade</Button>
          </div>
        </>
      )}

      {step === 2 && <EnbridgeForm nextStep={nextStep} />}
      {step === 3 && <HydroForm nextStep={nextStep} />}
      {step === 4 && (
        <ThanksForm
          title={`Welcome  ${user?.firstname}`}
          path="/standard-consumer/dashboard"
        />
      )}
    </>
  );
};

export default BasicConsumeranalysis;
