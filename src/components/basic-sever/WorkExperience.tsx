import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleRight } from "react-icons/fa";
import DashBoardHeader from "@/common/DashBoardHeader";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dataSchema, { UserExperience } from "./ValidationSchema";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const WorkExperience = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { addExperienceServer, addExperienceDeveloper, DevUser, isLoading } =
    useAdminStore();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<UserExperience>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      experiences: [
        {
          name: "MERN",
          address: "Dhaka",
          title: "Dhaka",
          startDate: "",
          endDate: "",
        },
      ],
      publications: [
        {
          publisher: "Avada",
          title: "Avada Theme",
          authorList: "ramjan",
          pages: "50-60",
          publicationYear: 2025,
        },
      ],
      reference: {
        name: "jahidul hasan",
      },
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue("file", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("file", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const userId = DevUser?.id;
  const userType = DevUser?.user?.userType;

  console.log("userType userType", userType);
  const onSubmit = async (data: UserExperience) => {
    try {
      const formData = new FormData();
      const { file, ...restData } = data;

      // Append the JSON data as a string
      formData.append("text", JSON.stringify(restData));

      // Append the file if it exists
      if (file && file instanceof File) {
        formData.append("file", file);
      }

      if (userId) {
        if (userType === "SERVER") {
          await addExperienceServer(userId, formData);
        } else if (userType === "DEVELOPER") {
          await addExperienceDeveloper(userId, formData);
        }
        navigate("/basic-server/dashboard");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div>
      <CommonWrapper>
        <div>
          <DashBoardHeader> Work Experience</DashBoardHeader>

          <p className="text-primary-gray text-sm font-semibold py-4">
            Provide the needed qualifications and details needed.
          </p>
          <p className="text-primary-gray text-sm font-semibold py-2">
            Work details
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* First Two Inputs */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-full">
                <label
                  htmlFor="workEngagementThree"
                  className="text-primary-gray block mb-1"
                >
                  Name of work engagement
                </label>
                <input
                  {...register("experiences.0.name")}
                  placeholder="Name"
                  type="text"
                  id="workEngagementThree"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
                {errors.experiences?.[0]?.name && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.experiences[0].name.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="addressOfWorkEngagement"
                  className="text-primary-gray block mb-1"
                >
                  Address of work engagement
                </label>
                <input
                  {...register("experiences.0.address")}
                  placeholder="Address"
                  type="text"
                  id="addressOfWorkEngagement"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
                {errors.experiences?.[0]?.address && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.experiences[0]?.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Title + Period */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full">
                <label
                  htmlFor="jobStatus"
                  className="text-primary-gray block mb-1"
                >
                  Title or job status
                </label>
                <input
                  {...register("experiences.0.title")}
                  type="text"
                  id="jobStatus"
                  className="w-full p-2 border border-primary-gray outline-none"
                  placeholder="Title"
                />
                {errors.experiences?.[0]?.title && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.experiences[0]?.title.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="startPeriod"
                  className="text-primary-gray block mb-1"
                >
                  Start Date
                </label>
                <input
                  {...register("experiences.0.startDate")}
                  type="date"
                  id="startPeriod"
                  placeholder="Start Date"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
                {errors.experiences?.[0]?.startDate && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.experiences[0]?.startDate.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="stopPeriod"
                  className="text-primary-gray block mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="stopPeriod"
                  {...register("experiences.0.endDate")}
                  placeholder="End Date"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
                {errors.experiences?.[0]?.endDate && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.experiences[0]?.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <p className="text-primary-gray text-sm font-semibold">
              Publications & References
            </p>

            {/* Publisher & Title */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full">
                <label
                  htmlFor="publisher"
                  className="text-primary-gray block mb-1"
                >
                  Publisher
                </label>
                <input
                  {...register("publications.0.publisher")}
                  type="text"
                  id="publisher"
                  placeholder="Publisher"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
                {errors.publications?.[0]?.publisher && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.publications?.[0]?.publisher.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="titleOfPublication"
                  className="text-primary-gray block mb-1"
                >
                  Title of publication
                </label>
                <input
                  type="text"
                  id="titleOfPublication"
                  placeholder="Publisher title"
                  className="w-full p-2 border border-primary-gray outline-none"
                  {...register("publications.0.title")}
                />
                {errors.publications?.[0]?.title && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.publications?.[0]?.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Authors */}
            <div>
              <label
                htmlFor="listOfAuthors"
                className="text-primary-gray block mb-1"
              >
                List of authors
              </label>
              <textarea
                rows={5}
                id="listOfAuthors"
                className="w-full p-2 border border-primary-gray outline-none"
                {...register("publications.0.authorList")}
              />
              {errors.publications?.[0]?.authorList && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.publications?.[0]?.authorList.message}
                </p>
              )}
            </div>

            {/* Pages & Year */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full">
                <label htmlFor="pages" className="text-primary-gray block mb-1">
                  Pages
                </label>
                <input
                  type="text"
                  id="pages"
                  className="w-full p-2 border border-primary-gray outline-none"
                  {...register("publications.0.pages")}
                />
                {errors.publications?.[0]?.pages && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.publications?.[0]?.pages.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="yearOfPublication"
                  className="text-primary-gray block mb-1"
                >
                  Year of Publication
                </label>
                <input
                  type="number"
                  id="yearOfPublication"
                  className="w-full p-2 border border-primary-gray outline-none"
                  {...register("publications.0.publicationYear", {
                    valueAsNumber: true,
                  })}
                />
                {errors.publications?.[0]?.publicationYear && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.publications?.[0]?.publicationYear.message}
                  </p>
                )}
              </div>
            </div>

            <p className="text-primary-gray text-sm font-semibold">
              References & Job recommendation
            </p>

            <div className="w-full">
              <label
                htmlFor="nameOfPersonOrCompany"
                className="text-primary-gray block mb-1"
              >
                Name of person or company
              </label>
              <input
                type="text"
                id="nameOfPersonOrCompany"
                className="w-full p-2 border border-primary-gray outline-none"
                {...register("reference.name")}
              />
              {errors.reference?.name && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.reference.name.message}
                </p>
              )}
            </div>

            <p className="text-primary-gray text-sm">
              Reference/ recommendation letter, if applicable
            </p>

            <div className="flex flex-col gap-4">
              {previewImage ? (
                <div className="relative w-full max-w-xs">
                  <div className="border border-gray-300 rounded-md p-2">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-auto max-h-40 object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-full md:w-[236px]">
                  <label
                    htmlFor="recommendationLetter"
                    className="flex items-center justify-center gap-2 w-full p-2 bg-light-green text-primary-green border border-primary-green rounded cursor-pointer hover:bg-gray-100"
                  >
                    <AiOutlineUpload />
                    <span>Upload</span>
                  </label>
                  <input
                    type="file"
                    id="recommendationLetter"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
              )}
              {errors.file && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.file.message}
                </p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="py-10">
              <Button
                type="submit"
                className="bg-primary-green text-white py-5 rounded-md w-full sm:w-auto cursor-pointer"
              >
                {isLoading ? "Processing" : "Continue"}
                <FaAngleDoubleRight />
              </Button>
            </div>
          </form>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default WorkExperience;
