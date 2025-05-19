import SignUp from "@/components/basic-consumer/SignUp";
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
      <SignUp nextStep={nextStep} prevStep={prevStep} step={step} />
    </div>
  );
};

export default BasicConsumerForm;
