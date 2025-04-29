import Commodity from "@/components/basic-consumer/Commodity";
import SignUp from "@/components/basic-consumer/SignUp";
import Utility from "@/components/basic-consumer/Utility";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BasicConsumerForm = () => {
  const { token } = basicConsumerStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    if (step > 1) {
      setStep((pre) => pre - 1);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/basic-consumer/dashboard");
    }
  }, [token]);
  return (
    <div>
      {step === 1 && (
        <SignUp nextStep={nextStep} prevStep={prevStep} step={step} />
      )}

      {step === 2 && (
        <Utility prevStep={prevStep} nextStep={nextStep} step={step} />
      )}
      {(step === 3 ||
        step === 4 ||
        step === 5 ||
        step === 6 ||
        step === 7 ||
        step === 8 ||
        step === 9 ||
        step === 10) && (
        <Commodity step={step} prevStep={prevStep} nextStep={nextStep} />
      )}
    </div>
  );
};

export default BasicConsumerForm;
