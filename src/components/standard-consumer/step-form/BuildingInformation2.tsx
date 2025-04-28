import MultiTitle from "./MultiTitle";
import CommonForm from "./CommonForm";
// import ContinueButton from "@/common/ContinueButton";
import { ContinueButtonType } from "@/types";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFormStore } from "@/store/FormStore";
import { basicConsumerStore } from "@/store/ConsumerStore";
const BuildingInformation2: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  const { formData, updateFormData } = useFormStore();
  const { getAllServices, allServices } = basicConsumerStore();
  const countryId = formData.country;
  const stateId = formData.city;
  const commodityId = formData.commodities[0].type;
  const [localData, setLocalData] = useState({
    units: "",
    country: countryId,
    state: stateId,
    acceptTermsAndConditions: false,
  });

  useEffect(() => {
    getAllServices(countryId, stateId, commodityId);
  }, [getAllServices, commodityId, countryId, stateId]);

  console.log(allServices, "******************");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setLocalData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // console.log("formdata maaahimmmmmmmm", formData);
    const updatedCommodities = formData.commodities.map((commodity) => ({
      ...commodity,
      utilityCompany: {
        ...commodity.utilityCompany,
        ...localData,
        acceptTermsAndConditions: localData.acceptTermsAndConditions,
      },
    }));
    updateFormData({
      ...formData,
      commodities: updatedCommodities,
    });
    // toast.success("Building Created Successfully");
    // console.log("FormData till now 444444444444", formData);

    if (nextStep) nextStep();
  };

  const formList = [
    {
      name: "id",
      label: "Utility",
      id: "first",
      type: "select",
      placeholder: "Select Utility",
      options: allServices?.map((service) => ({
        label: service.name,
        value: service.id,
      })),
    },
    {
      name: "phoneNumber",
      placeholder: "Type your phone number",
      label: "Phone Number",
      id: "second",
      type: "string",
    },
    {
      name: "accountName",
      placeholder: "Type your account name",
      label: "Account Name",
      id: "accountName",
      type: "string",
    },

    {
      name: "accountNumber",
      label: "Account Number",
      id: "Streets",
      type: "number",
      placeholder: "Type here",
    },
    {
      name: "units",
      label: "Units",
      id: "city",
      type: "number",
      placeholder: "Type here",
    },
    {
      name: "acceptTermsAndConditions",
      label: "Agree to Terms and Conditions",
      id: "terms",
      placeholder: "",
      type: "checkbox",
    },
  ];
  return (
    <>
      <div>
        <div>
          <MultiTitle
            heading="Building information"
            paragraph="Add Utility Information for Electricity"
          />
        </div>
        <div>
          <CommonForm
            formList={formList}
            formData={{
              ...localData,
              acceptTermsAndConditions:
                localData.acceptTermsAndConditions.toString(),
            }}
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
    </>
  );
};

export default BuildingInformation2;
