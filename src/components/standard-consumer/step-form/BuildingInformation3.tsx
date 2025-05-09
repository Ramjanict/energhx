import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
// import ContinueButton from "@/common/ContinueButton";
// import DirectionButton from "./DirectionButton";
import { useState } from "react";
import WallModal from "./WallModal";
// import WallInformation from "./WallInformation";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useFormStore } from "@/store/FormStore";
import { buildingInformation3Schema } from "./BuildingFormValidation";
import { z } from "zod";

const BuildingInformation3: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const { updateFormData } = useFormStore();
  const [wallModal, setWallModal] = useState(false);
  const [localData, setLocalData] = useState({
    roofLength: "",
    roofWidth: "",
    roofType: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // const handleWallModal = () => {
  //   setWallModal(true);
  // };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    try {
      const parsed = buildingInformation3Schema.safeParse(localData);
      if (!parsed.success) {
        // Extract validation errors and update the errors state
        const fieldErrors = parsed.error.flatten().fieldErrors;
        console.error("Validation Errors:", fieldErrors);

        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [
              key,
              value?.[0] || "",
            ])
          )
        );
        return;
      }
      updateFormData(localData);
      if (nextStep) nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation Error:", error.flatten().fieldErrors);
        setErrors(
          Object.fromEntries(
            Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
              key,
              value?.[0] || "",
            ])
          )
        );
      }
    }
  };

  const formList = [
    {
      name: "roofLength",
      label: "Roof Length",
      id: "Length",
      type: "number",
      placeholder: "Type here",
    },
    {
      name: "roofWidth",
      label: "Roof Width",
      id: "roof-width",
      type: "number",
      placeholder: "Type here",
    },
    {
      name: "roofType",
      label: "Roof Type",
      id: "first",
      type: "text",
      placeholder: "Type here",
    },
  ];
  return (
    <div>
      <div>
        <div>
          <MultiTitle heading="Building information" />
        </div>
        {/* <div className="flex flex-col gap-4 pb-10">
          <WallInformation direction="North" length={12} width={16} />
          <DirectionButton handleWallModal={handleWallModal} title="East" />
          <DirectionButton handleWallModal={handleWallModal} title="West" />
          <DirectionButton handleWallModal={handleWallModal} title="South" />
        </div> */}
        <div className="pb-6">
          <p className=" text-[#758179] text-base">Roof information</p>
        </div>
        <div>
          <CommonForm
            formList={formList}
            formData={localData}
            onChange={handleChange}
            errors={errors}
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

      {wallModal && (
        <WallModal nextStep={nextStep} setWallModal={setWallModal} />
      )}
    </div>
  );
};

export default BuildingInformation3;
