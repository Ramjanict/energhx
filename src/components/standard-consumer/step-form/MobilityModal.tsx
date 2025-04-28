import BlackHeader from "@/common/BlackHeader";
import CommonForm from "./CommonForm";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";

export interface MobilityModal {
  nextStep?: () => void;
  prevStep: () => void;
  setMobility: (item: boolean) => void;
}
const MobilityModal: React.FC<MobilityModal> = ({ setMobility, nextStep }) => {
  const formList = [
    {
      label: "EV Charger",
      id: "Length",
      name: "evCharger",
      type: "number",
      placeholder: "Type here",
    },
    {
      label: "Power rating of EV Charger",
      id: "Breath",
      name: "powerRating",
      type: "number",
      placeholder: "Type here",
    },
    {
      label: "No of EV",
      id: "first",
      name: "noOfEv",
      type: "text",
      placeholder: "Type here",
    },
    {
      label: "Charging",
      id: "Charging",
      name: "charging",
      type: "text",
      placeholder: "Type here",
    },
  ];

  return (
    <div className="  absolute inset-0 flex justify-center items-center z-20 w-full h-screen  backdrop-blur-md  bg-black/30 ">
      <div className="bg-white shadow rounded-3xl">
        <div
          onClick={() => {
            setMobility(false);
          }}
          className=" w-fit ml-auto p-5 text-2xl cursor-pointer"
        >
          <IoMdClose />
        </div>
        <div className="  flex flex-col gap-10 p-10">
          <BlackHeader>Electric Mobility/Vehicle</BlackHeader>
          <CommonForm
            formList={formList}
            onChange={(e) => {
              const { name, value } = e.target;
              console.log(`Field ${name} changed to ${value}`);
            }}
            formData={{}}
          />
          <div className="flex  justify-center cursor-pointer">
            <Button
              onClick={nextStep}
              className="bg-primary-green text-white py-5 rounded-md "
            >
              Submit <FaAngleDoubleRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilityModal;
