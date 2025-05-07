import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import SungUp from "../../components/basic-sever/SungUp";
import WorkExperience from "../../components/basic-sever/WorkExperience";
import WorkExperienceTwo from "../../components/basic-sever/WorkExperienceTwo";
import ThanksForm from "@/common/ThanksForm";

interface MultiStepForm {
  link: string;
}

const MultiStepForm: React.FC<MultiStepForm> = ({ link }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    sex: "",
    mail: "",
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

  return (
    <CommonWrapper>
      <div className="">
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
        {step === 4 && <ThanksForm title=" Thank You" path={`${link}`} />}
      </div>
    </CommonWrapper>
  );
};

export default MultiStepForm;
