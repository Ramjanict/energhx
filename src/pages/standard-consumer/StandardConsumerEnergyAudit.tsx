import Commodity from "@/components/basic-consumer/Commodity";
import EnergyAuditMicroServiceForm from "@/components/basic-consumer/Microservice/form/EnergyAuditMicroServiceForm";
import RenewableEnergyEvaluation from "@/components/basic-consumer/Microservice/RenewableEnergyEvaluation";
import Utility from "@/components/basic-consumer/Utility";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const StandardConsumerEnergyAudit = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    if (step > 1) {
      setStep((pre) => pre - 1);
    }
  };
  console.log("step", step);
  return (
    <div>
      {step === 1 && <Utility nextStep={nextStep} prevStep={prevStep} />}

      {(step === 2 || step === 3 || step === 4) && (
        <Commodity step={step} nextStep={nextStep} prevStep={prevStep} />
      )}

      {step === 5 && <EnergyAuditMicroServiceForm nextStep={nextStep} />}
      {step === 6 && <RenewableEnergyEvaluation nextStep={nextStep} />}

      {step === 7 && <Outlet />}
    </div>
  );
};

export default StandardConsumerEnergyAudit;
