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

interface BuildingInformation6Props extends ContinueButtonType {
  selectedBuilding: {
    building_name: string;
    building_type?: { building_type_id: string };
  };
}

const BuildingInformation6: React.FC<BuildingInformation6Props> = ({
  nextStep,
  prevStep,
  selectedBuilding,
}) => {
  const [mobility, setMobility] = useState(false);
  const { updateRoomFormData } = useRoomFormStore();
  const buildingId = selectedBuilding?.building_type?.building_type_id || "";

  const [localData, setLocalData] = useState<Partial<RoomFormDataType>>({
    buildingId: buildingId || "",
    title: "Sazzad Mahim's Room",
    construction: "Light",
    "construction-subtype": "with glass",
    "percentage-glass": "55%",
    "wall-type": "Brick",
    city: "Vancouber",
    month: "Feb",
    "percentage-MDDB": "15%",
    LSM: 65,
    "north-wall-area": 4.43,
    "east-wall-area": 2.43,
    "south-wall-area": 8.43,
    "west-wall-area": 9.43,
    "roof-type": "Flat",
    "roof-area": 43,
    "north-fenestration-area-shaded": 3.53,
    "north-fenestration-area-sunlit": 3.23,
    "east-fenestration-area-shaded": 3.663,
    "east-fenestration-area-sunlit": 2.53,
    "south-fenestration-area-shaded": 3.54,
    "south-fenestration-area-sunlit": 1.563,
    "west-fenestration-area-shaded": 3.24,
    "west-fenestration-area-sunlit": 3.26,
  });
  const handleSubmit = () => {
    updateRoomFormData(localData);
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
      "LSM",
      "north-wall-area",
      "east-wall-area",
      "south-wall-area",
      "west-wall-area",
      "roof-area",
      "north-fenestration-area-shaded",
      "north-fenestration-area-sunlit",
      "east-fenestration-area-shaded",
      "east-fenestration-area-sunlit",
      "south-fenestration-area-shaded",
      "south-fenestration-area-sunlit",
      "west-fenestration-area-shaded",
      "west-fenestration-area-sunlit",
    ];
    setLocalData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const formList = [
    {
      name: "title",
      label: "Title",
      id: "title",
      type: "text",
      placeholder: "Enter room title",
      defaultValue: "Sazzad Mahim's Room",
    },
    {
      name: "construction",
      label: "Construction",
      id: "construction",
      type: "text",
      placeholder: "Enter construction type",
      defaultValue: "Light",
    },
    {
      name: "construction-subtype",
      label: "Construction Subtype",
      id: "construction-subtype",
      type: "text",
      placeholder: "Enter construction subtype",
      defaultValue: "with glass",
    },
    {
      name: "percentage-glass",
      label: "Percentage Glass",
      id: "percentage-glass",
      type: "text",
      placeholder: "Enter percentage (e.g., 30%)",
      defaultValue: "55%",
    },
    {
      name: "wall-type",
      label: "Wall Type",
      id: "wall-type",
      type: "text",
      placeholder: "Enter wall type",
      defaultValue: "Brick",
    },
    {
      name: "city",
      label: "City",
      id: "city",
      type: "text",
      placeholder: "Enter city name",
      defaultValue: "Vancouber",
    },
    {
      name: "month",
      label: "Month",
      id: "month",
      type: "text",
      placeholder: "Enter month (e.g., January)",
      defaultValue: "Feb",
    },
    {
      name: "percentage-MDDB",
      label: "Percentage MDDB",
      id: "percentage-MDDB",
      type: "text",
      placeholder: "Enter MDDB percentage",
      defaultValue: "15%",
    },
    {
      name: "LSM",
      label: "LSM",
      id: "LSM",
      type: "number",
      placeholder: "Enter LSM value",
      defaultValue: 65,
    },
    {
      name: "north-wall-area",
      label: "North Wall Area (sq ft)",
      id: "north-wall-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 4.43,
    },
    {
      name: "east-wall-area",
      label: "East Wall Area (sq ft)",
      id: "east-wall-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 2.43,
    },
    {
      name: "south-wall-area",
      label: "South Wall Area (sq ft)",
      id: "south-wall-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 8.43,
    },
    {
      name: "west-wall-area",
      label: "West Wall Area (sq ft)",
      id: "west-wall-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 9.43,
    },
    {
      name: "roof-type",
      label: "Roof Type",
      id: "roof-type",
      type: "text",
      placeholder: "Enter roof type",
      defaultValue: "Flat",
    },
    {
      name: "roof-area",
      label: "Roof Area (sq ft)",
      id: "roof-area",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 43,
    },
    {
      name: "north-fenestration-area-shaded",
      label: "North Fenestration Shaded (sq ft)",
      id: "north-fenestration-area-shaded",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 3.53,
    },
    {
      name: "north-fenestration-area-sunlit",
      label: "North Fenestration Sunlit (sq ft)",
      id: "north-fenestration-area-sunlit",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 3.23,
    },
    {
      name: "east-fenestration-area-shaded",
      label: "East Fenestration Shaded (sq ft)",
      id: "east-fenestration-area-shaded",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 3.663,
    },
    {
      name: "east-fenestration-area-sunlit",
      label: "East Fenestration Sunlit (sq ft)",
      id: "east-fenestration-area-sunlit",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 2.53,
    },
    {
      name: "south-fenestration-area-shaded",
      label: "South Fenestration Shaded (sq ft)",
      id: "south-fenestration-area-shaded",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 3.54,
    },
    {
      name: "south-fenestration-area-sunlit",
      label: "South Fenestration Sunlit (sq ft)",
      id: "south-fenestration-area-sunlit",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 1.563,
    },
    {
      name: "west-fenestration-area-shaded",
      label: "West Fenestration Shaded (sq ft)",
      id: "west-fenestration-area-shaded",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 3.24,
    },
    {
      name: "west-fenestration-area-sunlit",
      label: "West Fenestration Sunlit (sq ft)",
      id: "west-fenestration-area-sunlit",
      type: "number",
      placeholder: "Enter area",
      defaultValue: 3.26,
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

export default BuildingInformation6;
