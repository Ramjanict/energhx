import MultiTitle from "./MultiTitle";
// import ContinueButton from "@/common/ContinueButton";
import { useState } from "react";
import MobilityModal from "./MobilityModal";
import MobilityInformation from "./MobilityInformation";
import AddButton from "./AddButton";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const buildingInfo = [
  { id: 1, title: "Building", value: ": Summit Tower" },
  { id: 2, title: "Sub Building", value: ": North Wing" },
  { id: 3, title: "Country", value: ": United States" },
  { id: 4, title: "Street Number", value: ": 102" },
  { id: 5, title: "Address", value: ": Maple Street" },
  { id: 6, title: "City", value: ": New York" },
  { id: 7, title: "Postal Code", value: ": 10001" },
  { id: 8, title: "Number of Occupant", value: ": 250" },
];
const BuildingInformation7: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const [mobility, setMobility] = useState(false);

  const handleSubmit = () => {
    if (nextStep) nextStep();
  };
  return (
    <div>
      <div>
        <div>
          <MultiTitle heading="Building information" />
        </div>

        <div className=" max-w-xl pb-10 text-[14px] sm:text-lg">
          {buildingInfo.map((item) => (
            <div className=" grid grid-cols-2">
              <div>
                <p className="text-[#758179]">{item.title}</p>
              </div>
              <div>
                <p className="text-[#394A3F]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <MultiTitle heading="Indoor Temperature" />
        </div>
        <div className="pb-10">
          <label htmlFor="Indoor" className="block pb-1 text-lg text-[#758179]">
            Indoor (room) temperature*
          </label>
          <input
            className=" max-w-72 outline-none  rounded-xs border border-[#9DA6A0] p-2 "
            type="text"
            placeholder="Type here"
            id="Indoor"
          />
        </div>
        <div>
          <MultiTitle heading="Electric Mobility/Vehicle" />
        </div>
        <div className="pb-8">
          {<MobilityInformation direction="West" length={15} width={25} />}
        </div>
        <div
          onClick={() => {
            setMobility(true);
          }}
        >
          <AddButton />
        </div>

        <div className="pt-20">
          {/* <ContinueButton nextStep={nextStep} prevStep={prevStep} /> */}
          <Button className="bg-light-green border-primary-green text-primary-green py-5 rounded-md me-5  cursor-pointer hover:bg-green-100 ">
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
