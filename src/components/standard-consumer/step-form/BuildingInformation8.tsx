import MultiTitle from "./MultiTitle";
// import ContinueButton from "@/common/ContinueButton";
import { useState } from "react";
import MobilityModal from "./MobilityModal";
import AddButton from "./AddButton";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/FormStore";

const BuildingInformation8: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const { formData } = useFormStore();

  console.log("Full form data...........", formData);

  const [mobility, setMobility] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    // if (nextStep) nextStep();
    navigate("/standard-consumer/dashboard");
  };
  return (
    <div>
      <div>
        <div>
          <MultiTitle
            heading="Building information"
            paragraph="Room Information"
          />
        </div>
        <div className="pb-6">
          <AddButton />
        </div>
        <div>
          <MultiTitle paragraph="Room Information" />
        </div>
        <AddButton />

        <div className="pt-20">
          {/* <ContinueButton nextStep={nextStep} prevStep={prevStep} /> */}
          <Button className="bg-light-green border-primary-green text-primary-green py-5 rounded-md me-5  cursor-pointer hover:bg-green-100 ">
            <FaAngleDoubleLeft /> Previous
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary-green text-white py-5 rounded-md w-full sm:w-auto"
          >
            Continue <FaAngleDoubleRight />
          </Button>
        </div>
      </div>

      {mobility && (
        <MobilityModal
          setMobility={setMobility}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default BuildingInformation8;
