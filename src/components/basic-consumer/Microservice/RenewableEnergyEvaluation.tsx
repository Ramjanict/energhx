"use client";

import { Leaf, Sun, Wind } from "lucide-react";
import EnergyCard from "./EnergyCard";
import DashBoardHeader from "@/common/DashBoardHeader";
import { useNavigate } from "react-router-dom";

interface RenewableEnergyEvaluation {
  nextStep: () => void;
}
const RenewableEnergyEvaluation: React.FC<RenewableEnergyEvaluation> = ({
  nextStep,
}) => {
  const navigate = useNavigate();
  const handleSolarAction = () => {
    navigate("solar");
    nextStep();
  };

  const handleWindAction = () => {};

  const handleBiomassAction = () => {
    navigate("biomass");
    nextStep();
  };

  return (
    <div className=" p-4">
      <div className="max-w-7xl mx-auto">
        <DashBoardHeader className="pb-2">
          Renewable Energy Solutions Evaluation
        </DashBoardHeader>
        <p className="text-gray-700 mb-8">
          Explore renewable energy options to meet your building's energy
          demands and reduce its carbon footprint.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solar Energy Card */}
          <EnergyCard
            title="Solar Energy"
            icon={Sun}
            shortDescription="Harness the power of the sun"
            overviewContent="Solar panels convert sunlight into electricity, providing a clean and renewable energy source for buildings."
            prosContent={[
              "Zero emissions during operation",
              "Low maintenance costs",
              "Long lifespan (25+ years)",
              "Reduces electricity bills",
              "Can be installed on rooftops",
            ]}
            consContent={[
              "High initial installation cost",
              "Weather dependent",
              "Requires significant space",
              "Less efficient in cloudy areas",
              "Energy storage adds cost",
            ]}
            actionText="Evaluate Solar Potential"
            onActionClick={handleSolarAction}
          />

          {/* Wind Energy Card */}
          <EnergyCard
            title="Wind Energy"
            icon={Wind}
            shortDescription="Capture the power of moving air"
            overviewContent="Wind turbines convert the kinetic energy of wind into electricity, offering a renewable alternative for building energy needs."
            prosContent={[
              "No fuel consumption",
              "Low operating costs",
              "Can operate 24/7",
              "Uses minimal land space",
              "Scalable technology",
            ]}
            consContent={[
              "Intermittent energy source",
              "Noise and visual impact",
              "Potential impact on wildlife",
              "Location constraints",
              "High upfront costs",
            ]}
            actionText="Assess Wind Energy Feasibility"
            onActionClick={handleWindAction}
          />

          {/* Biomass Energy Card */}
          <EnergyCard
            title="Biomass Energy"
            icon={Leaf}
            shortDescription="Utilize organic matter for power"
            overviewContent="Biomass energy systems convert organic materials into heat or electricity, providing a renewable alternative to fossil fuels."
            prosContent={[
              "Carbon neutral when managed properly",
              "Reduces waste going to landfills",
              "Reliable base load power",
              "Can use agricultural byproducts",
              "Creates rural jobs",
            ]}
            consContent={[
              "Requires continuous fuel supply",
              "Potential air quality concerns",
              "Land use competition with food crops",
              "Transportation logistics",
              "Lower energy density than fossil fuels",
            ]}
            actionText="Explore Biomass Options"
            onActionClick={handleBiomassAction}
          />
        </div>
      </div>
    </div>
  );
};
export default RenewableEnergyEvaluation;
