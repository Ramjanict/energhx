import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleRight, FaAngleLeft } from "react-icons/fa";
import Breadcrumbs from "@/common/Breadcrumbs";
import DashBoardHeader from "@/common/DashBoardHeader";
import AddExperience from "./AddExperience";
import { AiOutlineUpload } from "react-icons/ai";

const WorkExperience = () => {
  return (
    <div>
      <CommonWrapper>
        <div>
          <div className="pb-10">
            <Breadcrumbs />
          </div>
          <DashBoardHeader> Work Experience</DashBoardHeader>

          <p className="text-primary-gray text-sm font-semibold py-4">
            Provide the needed qualifications and details needed.
          </p>
          <p className="text-primary-gray text-sm font-semibold py-2">
            Work details
          </p>

          <form className="flex flex-col gap-6">
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
                  type="text"
                  id="workEngagementThree"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="addressOfWorkEngagement"
                  className="text-primary-gray block mb-1"
                >
                  Address of work engagement
                </label>
                <input
                  type="text"
                  id="addressOfWorkEngagement"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
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
                  type="text"
                  id="jobStatus"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="startPeriod"
                  className="text-primary-gray block mb-1"
                >
                  Period
                </label>
                <input
                  type="text"
                  id="startPeriod"
                  placeholder="Start Date"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="stopPeriod"
                  className="text-primary-gray block mb-1"
                >
                  Period
                </label>
                <input
                  type="text"
                  id="stopPeriod"
                  placeholder="End Date"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
              </div>
            </div>

            <AddExperience />

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
                  type="text"
                  id="publisher"
                  className="w-full p-2 border border-primary-gray outline-none"
                />
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
                  className="w-full p-2 border border-primary-gray outline-none"
                />
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
              />
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
                />
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
                />
              </div>
            </div>

            <AddExperience />

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
              />
            </div>

            <p className="text-primary-gray text-sm">
              Reference/ recommendation letter, if applicable
            </p>

            {/* ✅ Fixed Upload Section */}
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
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>

            <AddExperience />

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 py-10">
              <Button
                variant="outline"
                className="bg-light-green hover:bg-green-200 border-primary-green text-primary-green py-5 rounded-md w-full sm:w-auto"
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

export default WorkExperience;
