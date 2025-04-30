import CommonWrapper from "@/common/CommonWrapper";
import BiomassMicroServiceForm from "@/components/basic-consumer/Microservice/BiomassMicroServiceForm";
import EnergyAuditMicroServiceForm from "@/components/basic-consumer/Microservice/EnergyAuditMicroServiceForm";
import SolarMicroserviceForm from "@/components/basic-consumer/Microservice/SolarMicroserviceForm";
import TotalOverview from "@/components/basic-consumer/TotalOverview";
import { useState } from "react";

const TestingPurpose = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((pre) => pre + 1);
  };

  return (
    <CommonWrapper>
      <div>
        {step === 1 && <EnergyAuditMicroServiceForm nextStep={nextStep} />}
        {step === 2 && <SolarMicroserviceForm nextStep={nextStep} />}
        {step === 3 && <BiomassMicroServiceForm nextStep={nextStep} />}
        {step === 4 && <TotalOverview nextStep={nextStep} />}
      </div>
    </CommonWrapper>
  );
};

export default TestingPurpose;
