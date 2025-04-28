// import ContinueButton from "@/common/ContinueButton";
import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
import BlackHeader from "@/common/BlackHeader";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";
import { useFormStore } from "@/store/FormStore";
const Room: React.FC<ContinueButtonType> = ({ step, nextStep, prevStep }) => {
  const { updateFormData } = useFormStore();
  const [localData, setLocalData] = useState({
    building_name: "",
    location: "",
    longLat: "",
  });

  // console.log(selectedSubBuilding?.id, "7777777777777777777777777");

  // console.log(selectedBuilding, "selectedBuilding.......");

  // console.log(localData, "local dataaaaaaaa");


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`);
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // console.log("Form submitted with these data: ", formData);
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
        <div>
          <MultiTitle
            heading="Create A Building"
            paragraph="Provide the details needed"
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

      <div
        className={`${
          step === 2 && " hidden "
        } absolute sm:inset-0 sm:backdrop-blur-[25px]  sm:bg-black/30 flex items-center justify-center z-10 px-4`}
      >
        <div className="w-full max-w-3xl p-10  rounded-lg bg-white shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]  modal">
          <BlackHeader> building Terms & Conditions</BlackHeader>
          <form className="py-10">
            <label className=" flex items-start pb-4">
              <input type="checkbox" name="" id="" className="hidden peer " />
              <div className="min-w-4 min-h-4 mt-1.5  border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></div>
              <span className="pl-1">
                I agree to the Research Ethics policy documents. See Link
              </span>
            </label>
            <label className=" flex items-start ">
              <input type="checkbox" name="" id="" className="hidden peer " />
              <div className="min-w-4 min-h-4 mt-1.5  border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></div>
              <span className="pl-1">
                By clicking the “Submit” Button, you will be electrically
                signing this application effective. If Energhx approves your
                Application. The agreement between the parties will take effect
                as of that date.
              </span>
            </label>
          </form>
          {/* <ContinueButton nextStep={nextStep} prevStep={prevStep} step={step} /> */}

          <Button
            type="submit"
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
