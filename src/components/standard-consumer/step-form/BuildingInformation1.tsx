import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
// import ContinueButton from "@/common/ContinueButton";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFormStore } from "@/store/FormStore";
import { basicConsumerStore } from "@/store/ConsumerStore";

const BuildingInformation1: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const { updateFormData } = useFormStore();
  const {
    allCountries,
    getAllStates,
    allStates,
    allBuildings,
    allCommodities,
    getAllBuildings,
    getAllCommodities,
    token,
  } = basicConsumerStore();

  useEffect(() => {
    getAllBuildings(token);
    getAllCommodities();
  }, [getAllBuildings, token, getAllCommodities]);

  console.log("Commodities.....9999999999", allCommodities);

  const [localData, setLocalData] = useState({
    type: "",
    subBuilding: "",
    country: "",
    streetNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    numberOfOccupants: "",
    commodities: [] as {
      type: string;
      utilityCompany: {
        id: string;
        country: string;
        state: string;
        accountNumber: string;
        accountName: string;
        acceptTermsAndConditions: string;
        phoneNumber: string;
        units: string;
      };
    }[],
  });

  const selectedBuilding = allBuildings?.find(
    (building) => building.id === localData.type
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    if (name === "country") {
      getAllStates(value);
    }

    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateFormData({
      ...localData,
      commodities: localData.commodities.map((commodity) => ({
        ...commodity,
        utilityCompany: {
          ...commodity.utilityCompany,
          acceptTermsAndConditions:
            commodity.utilityCompany.acceptTermsAndConditions === "true",
        },
      })),
    });
    if (nextStep) nextStep();
  };

  // console.log(allCountries);

  const countryOptions = allCountries?.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));
  const stateOptions = allStates?.map((state) => ({
    label: state.name,
    value: state.id,
  }));

  const buildingTypeOptions = allBuildings?.map((building) => ({
    label: building?.name,
    value: building?.id,
  }));
  const subBuildingTypeOptions =
    selectedBuilding?.subBuildings?.map((subBuilding) => ({
      label: subBuilding?.name,
      value: subBuilding?.id,
    })) || [];

  // console.log("country options ......", countryOptions);

  const handleCommodityChange = (commodityId: string) => {
    setLocalData((prev) => {
      const exists = prev.commodities.find((item) => item.type === commodityId);
      let updatedCommodities;

      if (exists) {
        updatedCommodities = prev.commodities.filter(
          (item) => item.type !== commodityId
        );
      } else {
        updatedCommodities = [
          ...prev.commodities,
          {
            type: commodityId,
            utilityCompany: {
              id: "",
              country: "",
              state: "",
              accountNumber: "",
              accountName: "",
              acceptTermsAndConditions: "",
              phoneNumber: "",
              units: "",
            },
          },
        ];
      }
      return { ...prev, commodities: updatedCommodities };
    });
  };

  const formList = [
    {
      name: "type",
      label: "Building",
      id: "building",
      type: "select",
      placeholder: "Type here",
      options: buildingTypeOptions,
    },
    {
      name: "subBuilding",
      label: "Sub Building",
      id: "subBuilding",
      type: "select",
      placeholder: "Type here",
      options: subBuildingTypeOptions,
    },
    {
      name: "streetNumber",
      label: "Street Number",
      id: "street-number",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "streetAddress",
      label: "Street Address",
      id: "street-address",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "country",
      label: "Country",
      id: "country",
      type: "select",
      placeholder: "Select Country",
      options: countryOptions,
    },
    {
      name: "city",
      label: "City",
      id: "city",
      type: "select",
      placeholder: "Select State",
      options: stateOptions,
    },
    {
      name: "postalCode",
      label: "Postal Code",
      id: "postalCode",
      type: "text",
      placeholder: "Type here",
    },
    {
      name: "numberOfOccupants",
      label: "Number of Occupants",
      id: "occupant",
      type: "text",
      placeholder: "Type here",
    },
  ];

  return (
    <>
      <div>
        <div>
          <MultiTitle heading="Building information" />
        </div>
        <div>
          <CommonForm
            formList={formList}
            formData={{
              ...localData,
              commodities: localData.commodities.join(","),
            }}
            onChange={handleChange}
          />
        </div>
        <div className="pt-6">
          <label className="text-primary-gray pb-4 block ">Commodity</label>
          <div className="flex gap-7">
            {allCommodities?.map((commodity) => {
              const isChecked = localData.commodities.some(
                (c) => c.type === commodity.id
              );

              return (
                <div key={commodity.id} className="">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={commodity.id}
                      checked={isChecked}
                      onChange={() => handleCommodityChange(commodity.id)}
                      className="hidden peer"
                    />
                    <span className="w-5 h-5 inline-block border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></span>
                    <span className=" text-primary-gray ml-2">
                      {commodity.name}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
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
    </>
  );
};

export default BuildingInformation1;
