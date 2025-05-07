
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useState } from "react";

import { useParams } from "react-router-dom";
import BuildingInformation6 from "./BuildingInformation6";
import { useBuildingStore } from "@/store/BuildingStore";
import BuildingInformation7 from "./BuildingInformation7";
import BuildingInformation8 from "./BuildingInformation8";

const SingleBuilding = () => {
  const { buildingId } = useParams();
  console.log("Building ID: ", buildingId);

  const { token } = basicConsumerStore();
  const { selectedBuilding } = useBuildingStore();
  console.log("Selected Building: ", selectedBuilding);
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((pre) => pre + 1);
  };
  const prevStep = () => {
    setStep((pre) => pre - 1);
  };

  return (
    token && (
      <>
        {step === 1 && selectedBuilding && (
          <BuildingInformation6
            nextStep={nextStep}
            prevStep={prevStep}
            selectedBuilding={selectedBuilding}
          />
        )}
        {step === 2 && selectedBuilding && (
          <BuildingInformation7
            nextStep={nextStep}
            prevStep={prevStep}
            selectedBuilding={selectedBuilding}
          />
        )}
        {step === 3 && selectedBuilding && (
          <BuildingInformation8 nextStep={nextStep} prevStep={prevStep} />
        )}
      </>
    )
  );
};

export default SingleBuilding;
