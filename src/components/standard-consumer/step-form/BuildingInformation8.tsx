import MultiTitle from "./MultiTitle";
// import ContinueButton from "@/common/ContinueButton";
import { useState } from "react";
import MobilityModal from "./MobilityModal";
// import AddButton from "./AddButton";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRoomFormStore } from "@/store/RoomFormStore";
import { toast } from "react-toastify";
import axios from "axios";
import { basicConsumerStore } from "@/store/ConsumerStore";

const baseURL = import.meta.env.VITE_BASE_URL;

const BuildingInformation8: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const { roomFormData } = useRoomFormStore();
  const { token } = basicConsumerStore();
  console.log(token, "token in building");

  const [mobility, setMobility] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // if (nextStep) nextStep();
    console.log("All form full and finalllllllllll", roomFormData);
    try {
      if (token) {
        const response = await axios.post(
          `${baseURL}/buildings/room`,
          roomFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response from server: ", response.data);
      }

      toast.success("Room information submitted successfully!");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
    navigate("/standard-consumer/dashboard");
  };

  const handlePrev = () => {
    if (prevStep) prevStep();
  };
  return (
    <div>
      <div>
        <div>
          <MultiTitle
            heading="Room information"
            paragraph="Are you going to add room? Click on submit button to add room."
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
            Submit Room Information <FaAngleDoubleRight />
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

export default BuildingInformation8;
