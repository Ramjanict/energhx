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

      {/* <div
        className={`${
          step === 2 && "hidden"
        } absolute sm:inset-0 sm:backdrop-blur-[25px] sm:bg-black/30 flex items-center justify-center z-10 px-4`}
      >
        <div className="w-full max-w-3xl p-10 rounded-lg bg-white shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] modal">
          <BlackHeader>Building Terms & Conditions</BlackHeader>
          <form className="py-10">
            <label className="flex items-start pb-4">
              <input
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                className="hidden peer"
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <div className="min-w-4 min-h-4 mt-1.5 border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></div>
              <span className="pl-1">
                I agree to the Research Ethics policy documents. See Link
              </span>
            </label>
            <label className="flex items-start">
              <input
                type="checkbox"
                name="electronicSignature"
                id="electronicSignature"
                className="hidden peer"
                onChange={(e) => setElectronicSignature(e.target.checked)}
              />
              <div className="min-w-4 min-h-4 mt-1.5 border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></div>
              <span className="pl-1">
                By clicking the “Submit” Button, you will be electronically
                signing this application effective. If Energhx approves your
                Application, the agreement between the parties will take effect
                as of that date.
              </span>
            </label>
          </form>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary-green text-white py-5 rounded-md w-full sm:w-auto"
          >
            Continue <FaAngleDoubleRight />
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Room;
