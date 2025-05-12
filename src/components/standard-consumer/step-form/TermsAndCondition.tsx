import BlackHeader from "@/common/BlackHeader";
import { Button } from "@/components/ui/button";
import { ContinueButtonType } from "@/types";
import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { toast } from "react-toastify";

const TermsAndCondition: React.FC<ContinueButtonType> = ({
  nextStep,
  setShowBuilding,
}) => {
  //   const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [electronicSignature, setElectronicSignature] = useState(false);

  const handleSubmit = () => {
    if (!termsAccepted || !electronicSignature) {
      toast.warning(
        "Please agree to the terms and conditions before proceeding."
      );
      return;
    }
    if (nextStep) nextStep();
  };
  return (
    <div
      className={` absolute sm:inset-0 sm:backdrop-blur-[25px] sm:bg-black/30 flex items-center justify-center z-10 px-4`}
    >
      <div className="w-full max-w-3xl p-10 rounded-lg bg-white shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] modal">
        <BlackHeader>Building Terms & Conditions</BlackHeader>
        <form className="py-10">
          <label className="flex items-start pb-4">
            <input
              type="checkbox"
              name="termsAccepted"
              id="termsAccepted"
              className="hidden peer"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <div className="min-w-4 min-h-4 mt-1.5 border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></div>
            <span className="pl-1">
              I agree to the Research Ethics policy documents. See Link
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="electronicSignature"
              id="electronicSignature"
              className="hidden peer"
              onChange={(e) => setElectronicSignature(e.target.checked)}
            />
            <div className="min-w-4 min-h-4 mt-1.5 border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></div>
            <span className="pl-1">
              By clicking the “Submit” Button, you will be electronically
              signing this application effective. If Energhx approves your
              Application, the agreement between the parties will take effect as
              of that date.
            </span>
          </label>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowBuilding?.(false);
            }}
            className="bg-light-green text-primary border border-primary px-4 py-2 cursor-pointer rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary-green text-white py-5 rounded-md w-full sm:w-auto"
          >
            Continue <FaAngleDoubleRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
