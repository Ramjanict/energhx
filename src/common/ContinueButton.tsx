import { Button } from "@/components/ui/button";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { ContinueButtonType } from "@/types";

const ContinueButton: React.FC<ContinueButtonType> = ({
  prevStep,
  className,
  step,
}) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <Button
        onClick={prevStep}
        variant="default"
        className="bg-light-green border-primary-green text-primary-green py-5 rounded-md   cursor-pointer hover:bg-green-100 "
      >
        {!(step == 1) && <FaAngleLeft />}
        {step == 1 ? "Cancel" : "Previous"}
      </Button>
      <Button
        type="submit"
        className="bg-primary-green text-white py-5 rounded-md cursor-pointer"
      >
        Continue <FaAngleDoubleRight />
      </Button>
    </div>
  );
};

export default ContinueButton;
