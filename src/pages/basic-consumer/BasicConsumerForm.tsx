import Commodity from "@/components/basic-consumer/Commodity";
import SignUp from "@/components/basic-consumer/SignUp";
import Utility from "@/components/basic-consumer/Utility";
import { useState } from "react";

const BasicConsumerForm = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    if (step > 1) {
      setStep((pre) => pre - 1);
    }
  };

  return (
    <div>
      {step === 1 && (
        <SignUp nextStep={nextStep} prevStep={prevStep} step={step} />
      )}

      {step === 2 && (
        <Utility prevStep={prevStep} nextStep={nextStep} step={step} />
      )}
      {(step === 3 || step === 4 || step === 5 || step === 6 || step === 7) && (
        <Commodity step={step} prevStep={prevStep} nextStep={nextStep} />
      )}
    </div>
  );
};

export default BasicConsumerForm;
