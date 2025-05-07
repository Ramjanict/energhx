import Breadcrumbs from "@/common/Breadcrumbs";
import DashBoardHeader from "@/common/DashBoardHeader";
import EnbridgeForm from "./EnbridgeForm";
import HydroForm from "./HydroForm";
import ConsumerButton, {
  TconsumerButton,
} from "@/pages/basic-consumer/ConsumerButton";
import { useState } from "react";

const Commodity: React.FC<TconsumerButton> = ({ step, prevStep, nextStep }) => {
  const [agreementOne, setAgreementOne] = useState(false);
  const [agreementTwo, setAgreementTwo] = useState(false);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
      {
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
      }

      {step === 3 && <EnbridgeForm nextStep={nextStep} />}
      {step === 4 && <HydroForm nextStep={nextStep} />}
    </>
  );
};

export default Commodity;
