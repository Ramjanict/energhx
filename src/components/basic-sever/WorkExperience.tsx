import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import {
  workExperienceSchema,
  workExperienceType,
} from "@/components/basic-sever/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaAngleDoubleRight, FaAngleLeft } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import DashBoardHeader from "@/common/DashBoardHeader";
import Breadcrumbs from "@/common/Breadcrumbs";

interface WorkExperienceProps {
  formData: any;
  updateFormData: (field: string, value: string | number | File) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<workExperienceType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: { ...formData },
  });

  const [uploadDocOnePreview, setUploadDocOnePreview] = useState<string | null>(
    null
  );
  const [uploadDocTwoPreview, setUploadDocTwoPreview] = useState<string | null>(
    null
  );
  const [passportPhotoPreview, setPassportPhotoPreview] = useState<
    string | null
  >(null);

  const onSubmit = (data: workExperienceType) => {
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
        <div className="">
          <div className="pb-10">
            <Breadcrumbs />
          </div>
          <DashBoardHeader> Work Experience</DashBoardHeader>
          <p className="my-6 text-primary-gray text-md font-semibold">
            Personal Information
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="workEngagement"
              className="text-primary-gray text-md"
            >
              Name of work engagement
            </label>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4 lg:gap-12 mt-3 mb-3">
              <div className="w-full lg:w-auto">
                <input
                  type="text"
                  id="workEngagement"
                  {...register("workEngagement")}
                  className="w-full lg:w-[486px] p-2 border border-primary-gray"
                />
                {errors.workEngagement && (
                  <p className="text-red-500">
                    {errors.workEngagement.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="uploadDocOne"
                  className="flex items-center justify-center gap-2 w-full lg:w-[236px] p-2 bg-light-green text-primary-green border border-primary-green rounded cursor-pointer hover:bg-gray-100"
                >
                  {uploadDocOnePreview ? (
                    <p className="text-green-500 mt-2">
                      📄 {uploadDocOnePreview}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MdOutlineFileUpload className="text-primary-green text-2xl" />
                      <span>Upload Documents</span>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  id="uploadDocOne"
                  {...register("uploadDocOne")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (validateFileType(file, ["application/pdf"])) {
                        setValue("uploadDocOne", file);
                        setUploadDocOnePreview(file.name);
                      } else {
                        toast.error(
                          "Only PDF files are allowed for Document 1"
                        );
                      }
                    }
                  }}
                  className="hidden"
                />

                {errors.uploadDocOne && (
                  <p className="text-red-500">{errors.uploadDocOne.message}</p>
                )}
              </div>
              <Button className="bg-primary-green text-white w-fit self-center">
                <span>
                  <CiSquarePlus />
                </span>
                Add
              </Button>
            </div>
            <label
              htmlFor="workEngagementTwo"
              className="text-primary-gray text-md"
            >
              Name of work engagement
            </label>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4 lg:gap-12 mt-3 mb-3">
              <div className="w-full lg:w-auto">
                <input
                  type="text"
                  id="workEngagementTwo"
                  {...register("workEngagementTwo")}
                  className="w-full lg:w-[486px] p-2 border border-primary-gray"
                />
                {errors.workEngagementTwo && (
                  <p className="text-red-500">
                    {errors.workEngagementTwo.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="uploadDocTwo"
                  className="flex items-center justify-center gap-2 w-full lg:w-[236px] p-2 bg-light-green text-primary-green border border-primary-green rounded cursor-pointer hover:bg-gray-100"
                >
                  {uploadDocTwoPreview ? (
                    <p className="text-green-500 mt-2">
                      📄 {uploadDocTwoPreview}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MdOutlineFileUpload className="text-primary-green text-2xl" />
                      <span>Upload Documents</span>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  id="uploadDocTwo"
                  {...register("uploadDocTwo")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (validateFileType(file, ["application/pdf"])) {
                        setValue("uploadDocTwo", file);
                        setUploadDocTwoPreview(file.name);
                      } else {
                        toast.error(
                          "Only PDF files are allowed for Document 2"
                        );
                      }
                    }
                  }}
                  className="hidden"
                />

                {errors.uploadDocTwo && (
                  <p className="text-red-500">{errors.uploadDocTwo.message}</p>
                )}
              </div>
              <Button className="bg-primary-green text-white w-fit self-center">
                <span>
                  <CiSquarePlus />
                </span>
                Add
              </Button>
            </div>

            {/* Second Part */}
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="workEngagementTwo"
                  className="text-primary-gray text-md"
                >
                  Passport Photograph
                </label>
              </div>
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="passportPhotograph"
                  className="flex items-center justify-center gap-2 w-full lg:w-[236px] p-2 bg-light-green text-primary-green border border-primary-green rounded cursor-pointer hover:bg-gray-100"
                >
                  {passportPhotoPreview ? (
                    <div className="mt-2">
                      <img
                        src={passportPhotoPreview}
                        alt="Passport Preview"
                        className="w-24 h-24 object-cover rounded-md border border-primary-green"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MdOutlineFileUpload className="text-primary-green text-2xl" />
                      <span>Upload Documents</span>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  id="passportPhotograph"
                  {...register("passportPhotograph")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (
                        validateFileType(file, [
                          "image/png",
                          "image/jpeg",
                          "image/jpg",
                        ])
                      ) {
                        setValue("passportPhotograph", file);
                        const imageURL = URL.createObjectURL(file);
                        setPassportPhotoPreview(imageURL);
                      } else {
                        toast.error(
                          "Only image files (PNG/JPG) are allowed for Passport Photograph"
                        );
                      }
                    }
                  }}
                  className="hidden"
                />

                {errors.passportPhotograph && (
                  <p className="text-red-500">
                    {errors.passportPhotograph.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2 w-full mt-5 mb-[50px] flex flex-col gap-2">
              <div>
                <label
                  htmlFor="workEngagementTwo"
                  className="text-primary-gray text-md"
                >
                  Province (s)/Country of Residence
                </label>
              </div>
              <div>
                <Controller
                  name="countryOfResidence"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full lg:w-[486px] rounded-none border-primary-gray">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        <SelectItem
                          value="light"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          Canada
                        </SelectItem>
                        <SelectItem
                          value="dark"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          USA
                        </SelectItem>
                        <SelectItem
                          value="system"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          Mexico
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.countryOfResidence && (
                  <p className="text-red-500">
                    {errors.countryOfResidence.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-[200px]">
              <Button
                variant="outline"
                className="bg-light-green border-primary-green text-primary-green py-5 rounded-md w-full sm:w-fit"
                onClick={handlePrevious}
              >
                <FaAngleLeft />
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-primary-green text-white py-5 rounded-md w-full sm:w-fit"
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

export default WorkExperience;
