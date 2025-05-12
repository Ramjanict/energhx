// import ContinueButton from "@/common/ContinueButton";
import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";
import { useFormStore } from "@/store/FormStore";
import { RoomSchema } from "./BuildingFormValidation";

const Room: React.FC<ContinueButtonType> = ({ nextStep, prevStep }) => {
  const { updateFormData } = useFormStore();
  const [localData, setLocalData] = useState({
    building_name: "",
    location: "",
    longLat: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const result = RoomSchema.safeParse(localData);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    updateFormData(localData);
    if (nextStep) nextStep();
  };

  const formList = [
    {
      name: "building_name",
      label: "Building Name",
      id: "first",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "location",
      label: "Location",
      id: "fourth",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "longLat",
      label: "Longitude & Latitude",
      id: "fifth",
      type: "text",
      placeholder: "Type here",
    },
  ];

  return (
    <div>
      <div>
        <MultiTitle
          heading="Create A Building"
          paragraph="Provide the details needed"
          subtitle="Building Information"
        />
        <CommonForm
          formList={formList}
          formData={localData}
          onChange={handleChange}
          errors={errors}
        />
        <div className="pt-20">
          <Button
            onClick={prevStep}
            className="bg-light-green border-primary-green text-primary-green py-5 rounded-md me-5 cursor-pointer hover:bg-green-100"
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
    </div>
  );
};

export default Room;
