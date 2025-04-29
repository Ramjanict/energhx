import MultiTitle from "./MultiTitle";
// import ContinueButton from "@/common/ContinueButton";
import { useState } from "react";
import MobilityModal from "./MobilityModal";
// import AddButton from "./AddButton";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import CommonForm from "./CommonForm";
import { useRoomFormStore } from "@/store/RoomFormStore";
import { RoomFormDataType } from "@/types/RoomFormData";

interface BuildingInformation7Props extends ContinueButtonType {
  selectedBuilding: {
    building_name: string;
    building_type?: { building_type_id: string };
  };
}

const BuildingInformation7: React.FC<BuildingInformation7Props> = ({
  nextStep,
  prevStep,
}) => {
  const [mobility, setMobility] = useState(false);
  const { updateRoomFormData, roomFormData } = useRoomFormStore();

  // console.log(
  //   selectedBuilding.building_type?.building_type_id,
  //   "building_type_id"
  // );
  const [localData, setLocalData] = useState<Partial<RoomFormDataType>>({
    "indoor-shading": "True",
    "u-value-window": 3.13,
    "beam-solar-heat-gain-coefficient": 0.53,
    "diffuse-solar-heat-gain-coefficient": 0.43,
    "beam-indoor-solar-attenuation-coefficient": 0.753,
    "diffuse-indoor-solar-attenuation-coefficient": 0.79,
    "lighting-type": "non-in-celing fluorescent luminaire",
    "number-lighting": 12,
    "lighting-rating": 26,
    "activity-type": "Seated",
    "activity-location": "Apartment (matinee)",
    "velocity-type": "High Velocity",
    "occupant-capacity": 13,
    "start-hour": "11:00",
    "end-hour": "7:00",
    "percentage-MDHR": "12.53%",
    "infiltration-rate": 0.0425,
    "fenestration-area": 30.47,
    "floor-area": 12.5,
  });
  const handleSubmit = () => {
    updateRoomFormData(localData);
    console.log("All form data MAHIM ", roomFormData);
    if (nextStep) nextStep();
  };

  const handlePrev = () => {
    if (prevStep) prevStep();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "u-value-window",
      "beam-solar-heat-gain-coefficient",
      "diffuse-solar-heat-gain-coefficient",
      "beam-indoor-solar-attenuation-coefficient",
      "diffuse-indoor-solar-attenuation-coefficient",
      "number-lighting",
      "lighting-rating",
      "occupant-capacity",
      "infiltration-rate",
      "fenestration-area",
      "floor-area",
    ];
    setLocalData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const formList = [
    {
      name: "indoor-shading",
      label: "Indoor Shading",
      id: "indoor-shading",
      type: "text",
      placeholder: "Enter indoor shading details",
      defaultValue: "True",
    },
    {
      name: "u-value-window",
      label: "U-Value Window",
      id: "u-value-window",
      type: "number",
      placeholder: "Enter U-value",
      defaultValue: 3.13,
    },
    {
      name: "beam-solar-heat-gain-coefficient",
      label: "Beam Solar Heat Gain Coefficient",
      id: "beam-solar-heat-gain-coefficient",
      type: "number",
      placeholder: "Enter coefficient",
      defaultValue: 0.53,
    },
    {
      name: "diffuse-solar-heat-gain-coefficient",
      label: "Diffuse Solar Heat Gain Coefficient",
      id: "diffuse-solar-heat-gain-coefficient",
      type: "number",
      placeholder: "Enter coefficient",
      defaultValue: 0.43,
    },
    {
      name: "beam-indoor-solar-attenuation-coefficient",
      label: "Beam Indoor Solar Attenuation Coefficient",
      id: "beam-indoor-solar-attenuation-coefficient",
      type: "number",
      placeholder: "Enter coefficient",
      defaultValue: 0.753,
    },
    {
      name: "diffuse-indoor-solar-attenuation-coefficient",
      label: "Diffuse Indoor Solar Attenuation Coefficient",
      id: "diffuse-indoor-solar-attenuation-coefficient",
      type: "number",
      placeholder: "Enter coefficient",
      defaultValue: 0.79,
    },
    {
      name: "lighting-type",
      label: "Lighting Type",
      id: "lighting-type",
      type: "text",
      placeholder: "Enter lighting type",
      defaultValue: "non-in-celing fluorescent luminaire",
    },
    {
      name: "number-lighting",
      label: "Number of Lighting",
      id: "number-lighting",
      type: "number",
      placeholder: "Enter number",
      defaultValue: 12,
    },
    {
      name: "lighting-rating",
      label: "Lighting Rating",
      id: "lighting-rating",
      type: "number",
      placeholder: "Enter rating",
      defaultValue: 26,
    },
    {
      name: "activity-type",
      label: "Activity Type",
      id: "activity-type",
      type: "text",
      placeholder: "Enter activity type",
      defaultValue: "Seated",
    },
    {
      name: "activity-location",
      label: "Activity Location",
      id: "activity-location",
      type: "text",
      placeholder: "Enter location",
      defaultValue: "Apartment (matinee)",
    },
    {
      name: "velocity-type",
      label: "Velocity Type",
      id: "velocity-type",
      type: "text",
      placeholder: "Enter velocity type",
      defaultValue: "High Velocity",
    },
    {
      name: "occupant-capacity",
      label: "Occupant Capacity",
      id: "occupant-capacity",
      type: "text",
      placeholder: "Enter capacity",
      defaultValue: 13,
    },
    {
      name: "start-hour",
      label: "Start Hour",
      id: "start-hour",
      type: "text",
      placeholder: "Enter start time (e.g., 09:00)",
      defaultValue: "11:00",
    },
    {
      name: "end-hour",
      label: "End Hour",
      id: "end-hour",
      type: "text",
      placeholder: "Enter end time (e.g., 17:00)",
      defaultValue: "7:00",
    },
    {
      name: "percentage-MDHR",
      label: "Percentage MDHR",
      id: "percentage-MDHR",
      type: "text",
      placeholder: "Enter MDHR percentage",
      defaultValue: "12.53%",
    },
    {
      name: "infiltration-rate",
      label: "Infiltration Rate",
      id: "infiltration-rate",
      type: "number",
      placeholder: "Enter rate",
      defaultValue: 0.0425,
    },
    {
      name: "fenestration-area",
      label: "Fenestration Area (sq ft)",
      id: "fenestration-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 30.47,
    },
    {
      name: "floor-area",
      label: "Floor Area (sq ft)",
      id: "floor-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 12.5,
    },
  ];
  return (
    <div>
      <div>
        <div>
          <MultiTitle heading="Room information" />
        </div>
        <div className="pb-10">
          <CommonForm
            formList={formList}
            formData={Object.fromEntries(
              Object.entries(localData).map(([key, value]) => [
                key,
                String(value),
              ])
            )}
            onChange={handleChange}
          />
        </div>

        <div className="pt-20">
          {/* <ContinueButton nextStep={nextStep} prevStep={prevStep} /> */}
          <Button
            className="bg-light-green border-primary-green text-primary-green py-5 rounded-md me-5  cursor-pointer hover:bg-green-100 "
            onClick={handlePrev}
          >
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

export default BuildingInformation7;
