import { useEffect, useState } from "react";

import BuildingInformation1 from "@/components/standard-consumer/step-form/BuildingInformation1";
import BuildingInformation2 from "@/components/standard-consumer/step-form/BuildingInformation2";
import BuildingInformation3 from "@/components/standard-consumer/step-form/BuildingInformation3";
import BuildingInformation4 from "@/components/standard-consumer/step-form/BuildingInformation4";
import Room from "@/components/standard-consumer/step-form/Room";
import Building from "@/components/standard-consumer/step-form/Building";
import TermsAndCondition from "@/components/standard-consumer/step-form/TermsAndCondition";
import DashBoardHeader from "@/common/DashBoardHeader";
import BuildingCard from "@/components/basic-consumer/BuildingCard";
import { HousePlus } from "lucide-react";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const CreateBuilding = () => {
  const [step, setStep] = useState(1);
  const [showBuilding, setShowBuilding] = useState(false);
  const { token, allBuildings, getAllBuildings, getAllBattery, allBattery } =
    useConsumerStore();

  useEffect(() => {
    getAllBuildings();
    getAllBattery();
  }, [token]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const buildings = allBuildings ?? [];
  const hasBuildings = buildings.length > 0;
  const count = buildings.length ? buildings.length : 0;

  console.log("allBattery", allBattery);

  return (
    <div>
      {!showBuilding && (
        <div className="flex items-center  justify-between  py-4">
          <DashBoardHeader className="pb-5 text-xs sm:text-base font-medium">
            Your building list: <span className="px-1">{count}</span>
          </DashBoardHeader>
          <button
            onClick={() => setShowBuilding(true)}
            className="p-2 bg-primary text-white  text-xs sm:text-sm font-medium rounded-xl transition hover:bg-green-600 active:scale-95 flex items-center gap-1"
          >
            <HousePlus className="w-4 h-4 hidden md:block" />
            Create a Building
          </button>
        </div>
      )}
      {hasBuildings && !showBuilding && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
          {buildings.map((item, i) => (
            <BuildingCard key={i} item={item} />
          ))}
        </div>
      )}
      {showBuilding && (
        <>
          {step === 1 && (
            <TermsAndCondition
              step={step}
              nextStep={nextStep}
              prevStep={prevStep}
              setShowBuilding={setShowBuilding}
            />
          )}
          {step === 2 && (
            <Room step={step} nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && <Building nextStep={nextStep} prevStep={prevStep} />}
          {step === 4 && (
            <BuildingInformation1 nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 5 && (
            <BuildingInformation2 nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 6 && (
            <BuildingInformation3 nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 7 && (
            <BuildingInformation4 nextStep={nextStep} prevStep={prevStep} />
          )}
        </>
      )}
    </div>
  );
};

export default CreateBuilding;
