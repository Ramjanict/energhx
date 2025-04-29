import Breadcrumbs from "@/common/Breadcrumbs";
import DashBoardHeader from "@/common/DashBoardHeader";
import EnbridgeForm from "./EnbridgeForm";
import HydroForm from "./HydroForm";
import ThanksForm from "../../common/ThanksForm";
import ConsumerButton, {
  TconsumerButton,
} from "@/pages/basic-consumer/ConsumerButton";
import { useState } from "react";
import TotalOverview from "./TotalOverview";
import EnergyAuditMicroServiceForm from "./Microservice/EnergyAuditMicroServiceForm";
import SolarMicroserviceForm from "./Microservice/SolarMicroserviceForm";
import BiomassMicroServiceForm from "./Microservice/BiomassMicroServiceForm";

const Commodity: React.FC<TconsumerButton> = ({ step, prevStep, nextStep }) => {
  const [agreementOne, setAgreementOne] = useState(false);
  const [agreementTwo, setAgreementTwo] = useState(false);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
      {step !== 10 && step !== 5 && step !== 6 && step !== 7 && step !== 8 && (
        <form
          onSubmit={handleForm}
          className="py-10 px-4 flex  flex-col  h-[calc(100vh-120px)] "
        >
          <Breadcrumbs />
          <DashBoardHeader className="py-10">
            Selected COMMODITY
          </DashBoardHeader>
          <p className="text-primary-gray pb-4">Program</p>

          <div className="flex flex-col gap-2">
            <label className="flex  items-start  cursor-pointer">
              <input
                type="checkbox"
                value="male"
                className="hidden peer"
                checked={agreementOne}
                onChange={(e) => setAgreementOne(e.target.checked)}
              />
              <span className="min-w-4 min-h-4 inline-block border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green mt-1"></span>
              <span className=" text-primary ml-1">
                You have read and understood the Price Comparison sheet and the
                Disclosure Statement.
              </span>
            </label>
            <label className="flex   items-start cursor-pointer">
              <input
                type="checkbox"
                value="female"
                className="hidden peer"
                checked={agreementTwo}
                onChange={(e) => setAgreementTwo(e.target.checked)}
              />
              <span className="min-w-4 min-h-4 inline-block border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green mt-1"></span>
              <span className=" text-primary ml-1">
                You are either the account holder, or the authorized agent of
                the account holder.
              </span>
            </label>
          </div>

          <div className="mt-auto">
            <ConsumerButton
              active={!(agreementOne && agreementTwo)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </div>
        </form>
      )}

      {step === 4 && <EnbridgeForm nextStep={nextStep} step={step} />}
      {step === 5 && <HydroForm nextStep={nextStep} step={step} />}
      {step === 6 && <EnergyAuditMicroServiceForm nextStep={nextStep} />}
      {step === 7 && <SolarMicroserviceForm nextStep={nextStep} />}
      {step === 8 && <BiomassMicroServiceForm nextStep={nextStep} />}

      {step === 9 && <TotalOverview nextStep={nextStep} />}
      {step === 10 && <ThanksForm title="Thank Yoy" path="/basic-consumer" />}
    </>
  );
};

export default Commodity;
