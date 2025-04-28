import CommonWrapper from "@/common/CommonWrapper";
import ThanksForm from "@/common/ThanksForm";
import SignUp from "@/components/basic-developer/SignUp";
import VerifyAndSubmit from "@/components/basic-developer/VerifyAndSubmit";
import WorkExperience from "@/components/basic-developer/WorkExperience";
import WorkExperienceTwo from "@/components/basic-developer/WorkExperienceTwo";
import { useState } from "react";

const BasicDeveloperForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    setStep((pre) => pre - 1);
  };
  return (
    <div className="  lg:pt-20">
      <div>
        <CommonWrapper>
          {step === 1 && <SignUp nextStep={nextStep} prevStep={prevStep} />}
          {step === 2 && (
            <WorkExperience nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && (
            <WorkExperienceTwo nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 4 && (
            <VerifyAndSubmit nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 5 && (
            <ThanksForm title="Thank You" path="/basic-developer" />
          )}
        </CommonWrapper>
      </div>
    </div>
  );
};

export default BasicDeveloperForm;
