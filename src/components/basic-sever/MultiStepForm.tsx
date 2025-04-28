import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import SungUp from "../../components/basic-sever/SungUp";
import WorkExperience from "../../components/basic-sever/WorkExperience";
import WorkExperienceTwo from "../../components/basic-sever/WorkExperienceTwo";
import VerifyAndSubmit from "../../components/basic-sever/VerifyAndSubmit";
import UpgradeFacilities from "../../components/basic-sever/UpgradeFacilities";
import UpgradeFacilitiesTwo from "../../components/basic-sever/UpgradeFacilitiesTwo";
import ThanksForm from "@/common/ThanksForm";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    sex: "",
    mail: "",
    phone: "",
    number: "",
    street: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
    interest: "",
    workEngagement: "",
    workEngagementTwo: "",
    workEngagementThree: "",
    passportPhotograph: "",
    countryOfResidence: "",
    addressOfWorkEngagement: "",
    jobStatus: "",
    startPeriod: "",
    stopPeriod: "",
    publisher: "",
    titleOfPublication: "",
    listOfAuthors: "",
    pages: "",
    yearOfPublication: "",
    nameOfPersonOrCompany: "",
    recommendationLetter: "",
    uploadDocOne: "",
    uploadDocTwo: "",
    uploadDocThree: "",
    verifyFirstName: "",
    verifyLastName: "",
    service: "",
    utilityName: "",
    accountNo: "",
    upgradeFacilitiesHomeTel: "",
    upgradeFacilitiesAltTel: "",
    streetAddress: "",
    suite: "",
    upgradeFacilitiesCity: "",
    upgradeFacilitiesPostalCode: "",
    upgradeFacilitiesFirstName: "",
    upgradeFacilitiesLastName: "",
    upgradeFacilitiesHomeTelTwo: "",
    upgradeFacilitiesAltTelTwo: "",
    upgradeFacilitiesMailTwo: "",
    upgradeFacilitiesCompanyName: "",
  });

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const updateFormData = (field: string, value: string | number | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <CommonWrapper>
      <div className="">
        {/* <h1 className="text-primary-green font-bold text-xl">Sign Up</h1> */}

        {step === 1 && (
          <SungUp
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <WorkExperience
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <WorkExperienceTwo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <VerifyAndSubmit
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 5 && (
          <UpgradeFacilities
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 6 && (
          <UpgradeFacilitiesTwo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmitParent={handleSubmit}
          />
        )}
        {step === 7 && <ThanksForm title=" Thank You" path="/basic-server" />}
      </div>
    </CommonWrapper>
  );
};

export default MultiStepForm;
