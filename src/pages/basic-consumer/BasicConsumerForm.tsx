import SignUp from "@/components/basic-consumer/SignUp";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import ThanksForm from "@/common/ThanksForm";
import OTP from "@/components/basic-consumer/OTP";
import VerifyOTP from "@/components/basic-consumer/VerifyOTP";

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
      {step === 2 && <OTP nextStep={nextStep} />}
      {step === 3 && <VerifyOTP nextStep={nextStep} />}
      {step === 4 && <Login nextStep={nextStep} />}
      {step === 5 && <ThanksForm title="Thank Yoy" path="/basic-consumer" />}
    </div>
  );
};

export default BasicConsumerForm;
