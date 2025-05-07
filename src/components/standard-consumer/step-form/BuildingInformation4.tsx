import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
// import ContinueButton from "@/common/ContinueButton";
// import DirectionButton from "./DirectionButton";
import { useState } from "react";
import WallModal from "./WallModal";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useFormStore } from "@/store/FormStore";
import { toast } from "react-toastify";
import axios from "axios";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const BuildingInformation4: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const { formData, updateFormData } = useFormStore();
  const { token } = basicConsumerStore();

  const [wallModal, setWallModal] = useState(false);
  const navigate = useNavigate();
  const formList = [
    {
      name: "floorLength",
      label: "Floor Length",
      id: "Length",
      type: "number",
      placeholder: "Type here",
    },
    {
      name: "floorBreath",
      label: "Floor Breath",
      id: "Breath",
      type: "number",
      placeholder: "Type here",
    },
    {
      name: "floorType",
      label: "Floor Type",
      id: "roof-type",
      type: "text",
      placeholder: "Type here",
    },
  ];

  const [localData, setLocalData] = useState({
    floorLength: "",
    floorBreath: "",
    floorType: "",
  });

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
  };

  //Payload

  const {
    building_name,
    type,
    streetAddress,
    streetNumber,
    subBuilding,
    postalCode,
    city,
    numberOfOccupants,
    indoorTemperature,
    roofLength,
    roofType,
    roofWidth,
    country,
    commodities,
  } = formData;

  const finalPayload = {
    building_name,
    type,
    streetAddress,
    streetNumber,
    subBuilding,
    postalCode,
    city,
    numberOfOccupants,
    indoorTemperature,
    roofLength,
    roofType,
    roofWidth,
    country,
    commodities: commodities?.map((commodity) => ({
      type: commodity.type,
      utilityCompany: {
        id: commodity.utilityCompany?.id,
        country: commodity.utilityCompany?.country,
        state: commodity.utilityCompany?.state,
        accountNumber: commodity.utilityCompany?.accountNumber,
        accountName: commodity.utilityCompany?.accountName,
        acceptTermsAndConditions:
          commodity.utilityCompany?.acceptTermsAndConditions,
        phoneNumber: commodity.utilityCompany?.phoneNumber,
        units: commodity.utilityCompany?.units,
      },
    })),
  };

  console.log("Token", token);

  const handleSubmit = async () => {
    updateFormData(localData);

    try {
      const response = await axiosSecure.post(
        "/users/buildings",
        finalPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(" API response:", response.data);
      toast.success("Building Created Successfully.");
      // if (nextStep) nextStep();
      navigate(`/standard-consumer/buildingInformation/allBuildings`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        toast.error(
          error.response?.data?.message || "Failed to create building"
        );
      } else {
        console.error("Unexpected Error:", error);
        toast.error("An unexpected error occurred");
      }
      toast.error(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to create building"
      );
    }
    if (nextStep) nextStep();
  };
  return (
    <div>
      <div>
        <div>
          <MultiTitle heading="Building information" />
        </div>
        {/* <div className="flex flex-col gap-4 pb-10">
          <DirectionButton handleWallModal={handleWallModal} title="North" />
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

export default BuildingInformation4;
