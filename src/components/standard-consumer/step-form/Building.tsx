// import ContinueButton from "@/common/ContinueButton";
import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";
import { useFormStore } from "@/store/FormStore";
// import { basicConsumerStore } from "@/store/ConsumerStore";

export interface Building {
  building_name: string;
  building_type?: { building_type_id: string; name?: string };
  building_sub_type?: { name: string };
  user_building_utility: { utility_name: string; utility_type: string }[];
}

const Building: React.FC<ContinueButtonType> = ({ nextStep, prevStep }) => {
  const { updateFormData } = useFormStore();
  const [localData, setLocalData] = useState({
    indoorTemperature: "",
    indoorRelativeHumidity: "",
    noOfPeople: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateFormData(localData);
    if (nextStep) nextStep();
  };

  const formList = [
    {
      name: "indoorTemperature",
      label: "Indoor temperature",
      id: "first",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "indoorRelativeHumidity",
      label: "Indoor Relative Humidity",
      id: "second",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "noOfPeople",
      label: "No of People",
      id: "third",
      type: "text",
      placeholder: "Type here",
    },
  ];
  return (
    <div>
      <div>
        <MultiTitle
          heading="Room information"
          paragraph="Provide the details needed."
          subtitle="Building Information"
        />
      </div>
      <div>
        <CommonForm
          formList={formList}
          formData={localData}
          onChange={handleChange}
        />
      </div>
      <div className="pt-20">
        {/* <ContinueButton nextStep={nextStep} prevStep={prevStep} /> */}
        <Button
          onClick={prevStep}
          className="bg-light-green border-primary-green text-primary-green py-5 rounded-md me-5  cursor-pointer hover:bg-green-100 "
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
  );
};

export default Building;
