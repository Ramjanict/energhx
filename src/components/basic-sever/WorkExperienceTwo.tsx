import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import {
  workExperienceTwoSchema,
  workExperienceTwoType,
} from "@/components/basic-sever/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiSquarePlus } from "react-icons/ci";
import { FaAngleDoubleRight, FaAngleLeft } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import Breadcrumbs from "@/common/Breadcrumbs";
import DashBoardHeader from "@/common/DashBoardHeader";

interface WorkExperienceTwoProps {
  formData: any;
  updateFormData: (field: string, value: string | number | File) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const WorkExperienceTwo: React.FC<WorkExperienceTwoProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<workExperienceTwoType>({
    resolver: zodResolver(workExperienceTwoSchema),
    defaultValues: { ...formData },
  });

  const [recommendationLetter, setRecommendationLetter] =
    useState<String | null>(null);

  const onSubmit = (data: workExperienceTwoType) => {
    Object.entries(data).forEach(([field, value]) => {
      updateFormData(field, value);
    });
    nextStep();
    toast.success("Form Submitted successfully");
  };

  const handlePrevious = () => {
    prevStep();
  };

  const validateFileType = (file: File, allowedTypes: string[]) => {
    return allowedTypes.includes(file.type);
  };
  return (
    <div>
      <CommonWrapper>
        <div>
          <div className="pb-10">
            <Breadcrumbs />
          </div>
          <DashBoardHeader> Work Experience</DashBoardHeader>

          <p className="mt-5 text-primary-gray">
            Provide the needed qualifications and details needed.
          </p>
          <p className="mt-5 text-primary-gray">work details</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Two Inputs */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-3 mb-3">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="workEngagementThree"
                  className="text-primary-gray text-md mb-3"
                >
                  Name of work engagement
                </label>
                <input
                  type="text"
                  id="workEngagementThree"
                  {...register("workEngagementThree")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.workEngagementThree && (
                  <p className="text-red-500">
                    {errors.workEngagementThree.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="addressOfWorkEngagement"
                  className="text-primary-gray text-md mb-3"
                >
                  Address of work engagement
                </label>
                <input
                  type="text"
                  id="addressOfWorkEngagement"
                  {...register("addressOfWorkEngagement")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.addressOfWorkEngagement && (
                  <p className="text-red-500">
                    {errors.addressOfWorkEngagement.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Title + Period */}
            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-6">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="jobStatus"
                  className="text-primary-gray text-md mb-3"
                >
                  Title or job status
                </label>
                <input
                  type="text"
                  id="jobStatus"
                  {...register("jobStatus")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.jobStatus && (
                  <p className="text-red-500">{errors.jobStatus.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[238px]">
                <label
                  htmlFor="startPeriod"
                  className="text-primary-gray text-md mb-3"
                >
                  Period
                </label>
                <input
                  type="text"
                  id="startPeriod"
                  placeholder="Start Date"
                  {...register("startPeriod")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.startPeriod && (
                  <p className="text-red-500">{errors.startPeriod.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[238px]">
                <label
                  htmlFor="stopPeriod"
                  className="text-primary-gray text-md mb-3"
                >
                  Period
                </label>
                <input
                  type="text"
                  id="stopPeriod"
                  placeholder="End Date"
                  {...register("stopPeriod")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.stopPeriod && (
                  <p className="text-red-500">{errors.stopPeriod.message}</p>
                )}
              </div>
            </div>

            <Button
              className="bg-primary-green text-white my-5 h-[48px]"
              type="button"
            >
              <CiSquarePlus />
              Add Experience
            </Button>

            <p className="my-12 text-primary-gray text-sm font-semibold">
              Publications & References
            </p>

            {/* Publisher & Title */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="publisher"
                  className="text-primary-gray text-md mb-3"
                >
                  Publisher
                </label>
                <input
                  type="text"
                  id="publisher"
                  {...register("publisher")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.publisher && (
                  <p className="text-red-500">{errors.publisher.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="titleOfPublication"
                  className="text-primary-gray text-md mb-3"
                >
                  Title of publication
                </label>
                <input
                  type="text"
                  id="titleOfPublication"
                  {...register("titleOfPublication")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.titleOfPublication && (
                  <p className="text-red-500">
                    {errors.titleOfPublication.message}
                  </p>
                )}
              </div>
            </div>

            {/* Authors */}
            <div className="flex flex-col mt-6">
              <label
                htmlFor="listOfAuthors"
                className="text-primary-gray text-md mb-3"
              >
                List of authors
              </label>
              <input
                type="text"
                id="listOfAuthors"
                {...register("listOfAuthors")}
                className="w-full h-[140px] p-2 border border-primary-gray"
              />
              {errors.listOfAuthors && (
                <p className="text-red-500">{errors.listOfAuthors.message}</p>
              )}
            </div>

            {/* Pages & Year */}
            <div className="flex flex-col md:flex-row items-start gap-6 mt-6">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="pages"
                  className="text-primary-gray text-md mb-3"
                >
                  Pages
                </label>
                <input
                  type="text"
                  id="pages"
                  {...register("pages")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.pages && (
                  <p className="text-red-500">{errors.pages.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="yearOfPublication"
                  className="text-primary-gray text-md mb-3"
                >
                  Year of Publication
                </label>
                <input
                  type="number"
                  id="yearOfPublication"
                  {...register("yearOfPublication")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.yearOfPublication && (
                  <p className="text-red-500">
                    {errors.yearOfPublication.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              className="bg-primary-green text-white my-5 h-[48px]"
              type="button"
            >
              <CiSquarePlus />
              Add Experience
            </Button>

            <p className="text-primary-gray text-sm my-10">
              References & Job recommendation
            </p>

            <div className="flex flex-col w-full md:w-[486px]">
              <label
                htmlFor="nameOfPersonOrCompany"
                className="text-primary-gray text-md mb-3"
              >
                Name of person of company
              </label>
              <input
                type="text"
                id="nameOfPersonOrCompany"
                {...register("nameOfPersonOrCompany")}
                className="w-full p-2 border border-primary-gray"
              />
              {errors.nameOfPersonOrCompany && (
                <p className="text-red-500">
                  {errors.nameOfPersonOrCompany.message}
                </p>
              )}
            </div>

            <p className="text-primary-gray text-sm my-10">
              Reference/ recommendation letter, if applicable
            </p>

            <div className="my-5">
              <label
                htmlFor="recommendationLetter"
                className="flex items-center justify-center gap-2 w-full md:w-[236px] p-2 bg-light-green text-primary-green border border-primary-green rounded cursor-pointer hover:bg-gray-100"
              >
                {recommendationLetter ? (
                  <span className="text-primary-green">
                    {recommendationLetter}
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <MdOutlineFileUpload className="text-primary-green text-2xl" />
                    <span>Upload Documents</span>
                  </div>
                )}
              </label>

              <input
                type="file"
                id="recommendationLetter"
                {...register("recommendationLetter")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (validateFileType(file, ["application/pdf"])) {
                      setValue("recommendationLetter", file);
                      setRecommendationLetter(file.name);
                    } else {
                      toast.error("Only PDF files are allowed for Document 1");
                    }
                  }
                }}
                className="hidden"
              />

              {errors.recommendationLetter && (
                <p className="text-red-500">
                  {errors.recommendationLetter.message}
                </p>
              )}
            </div>

            <Button
              className="bg-primary-green text-white my-5 w-full md:w-[204px] h-[48px]"
              type="button"
            >
              <CiSquarePlus />
              Add Experience
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-5 mb-[200px] mt-16">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="bg-light-green border-primary-green text-primary-green py-5 rounded-md w-full sm:w-auto"
              >
                <FaAngleLeft />
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-primary-green text-white py-5 rounded-md w-full sm:w-auto"
              >
                Continue <FaAngleDoubleRight />
              </Button>
            </div>
          </form>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default WorkExperienceTwo;
