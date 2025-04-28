import { useState } from "react";

import BuildingInformation1 from "@/components/standard-consumer/step-form/BuildingInformation1";
import BuildingInformation2 from "@/components/standard-consumer/step-form/BuildingInformation2";
import BuildingInformation3 from "@/components/standard-consumer/step-form/BuildingInformation3";
import BuildingInformation4 from "@/components/standard-consumer/step-form/BuildingInformation4";
import BuildingInformation5 from "@/components/standard-consumer/step-form/BuildingInformation5";
import BuildingInformation6 from "@/components/standard-consumer/step-form/BuildingInformation6";
import BuildingInformation7 from "@/components/standard-consumer/step-form/BuildingInformation7";
import BuildingInformation8 from "@/components/standard-consumer/step-form/BuildingInformation8";
import Room from "@/components/standard-consumer/step-form/Room";
import Building from "@/components/standard-consumer/step-form/Building";

const StandardConsumerBuildingInfo = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    setStep((pre) => pre - 1);
  };
  return (
    <>
      {(step === 1 || step === 2) && (
        <Room step={step} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 3 && <Building nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && (
        <BuildingInformation1 nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 5 && (
        <BuildingInformation2 nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 6 && (
        <BuildingInformation3 nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 7 && (
        <BuildingInformation4 nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 8 && <BuildingInformation5 setStep={setStep} />}
      {step === 9 && (
        <BuildingInformation6 nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 10 && (
        <BuildingInformation7 nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 11 && (
        <BuildingInformation8 nextStep={nextStep} prevStep={prevStep} />
      )}
    </>
  );
};

export default StandardConsumerBuildingInfo;
