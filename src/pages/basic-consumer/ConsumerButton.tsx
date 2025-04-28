import { Button } from "@/components/ui/button";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";

export interface TconsumerButton {
  nextStep: () => void;
  prevStep: () => void;
  className?: string;
  step?: number;
  active?: boolean;
}

const ConsumerButton: React.FC<TconsumerButton> = ({
  prevStep,
  className,
  step,
  active,
}) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <Button
        disabled={step === 1}
        onClick={prevStep}
        variant="default"
        className="bg-light-green border-primary-green text-primary-green py-5 rounded-md cursor-pointer hover:bg-green-100  di"
      >
        <FaAngleLeft />
        Previous
      </Button>
      <Button
        disabled={active}
        type="submit"
        className="bg-primary-green text-white py-5 rounded-md cursor-pointer"
      >
        Continue <FaAngleDoubleRight />
      </Button>
    </div>
  );
};

export default ConsumerButton;
