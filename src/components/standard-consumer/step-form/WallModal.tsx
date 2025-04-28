import BlackHeader from "@/common/BlackHeader";
import CommonForm from "./CommonForm";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export interface WallModal {
  nextStep?: () => void;
  setWallModal: (item: boolean) => void;
}
const WallModal: React.FC<WallModal> = ({ setWallModal, nextStep }) => {
  const formList = [
    {
      label: "Length",
      id: "Length",
      name: "length",
      type: "number",
      placeholder: "Type here",
    },
    {
      label: "Width",
      id: "Breath",
      name: "width",
      type: "number",
      placeholder: "Type here",
    },
    {
      label: "Wall Type",
      id: "first",
      name: "wallType",
      type: "text",
      placeholder: "Type here",
    },
  ];

  return (
    <div className="absolute max-sm:top-5 inset-0 backdrop-blur-[25px]  bg-black/30  z-10 px-4 flex items-center justify-center">
      <div className="">
        <div className=" bg-white shadow p-10 rounded-3xl flex flex-col gap-10">
          <BlackHeader>Wall INFORMATION</BlackHeader>
          <CommonForm
            formList={formList}
            onChange={(e) => {
              const { name, value } = e.target;
              console.log(`Field ${name} changed to ${value}`);
            }}
            formData={{ length: "", width: "", wallType: "" }}
          />
          <div className="flex gap-5">
            <Button
              onClick={() => {
                if (nextStep) {
                  nextStep();
                }
                setWallModal(false);
              }}
              variant="default"
              className="bg-light-green border-primary-green text-primary-green py-5 rounded-md hover:bg-green-200 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={nextStep}
              className="bg-primary-green text-white py-5 rounded-md  cursor-pointer"
            >
              Submit <FaAngleDoubleRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallModal;
