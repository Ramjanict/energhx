import AddButton from "@/common/AddButton";
import Breadcrumbs from "@/common/Breadcrumbs";
import ContinueButton from "@/common/ContinueButton";
import DashBoardHeader from "@/common/DashBoardHeader";
import FormSubheader from "@/common/FormSubheader";
import UploadButton from "@/common/UploadButton";
import { ContinueButtonType } from "@/types";

const WorkExperienceTwo: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  return (
    <>
      <div className=" sm:pb-10  ">
        <Breadcrumbs />
      </div>
      <div>
        <DashBoardHeader>Work Experience</DashBoardHeader>

        <FormSubheader className="my-6">
          Provide the needed qualifications and details needed.
        </FormSubheader>

        <form>
          <div className="py-10 flex flex-col gap-6">
            <FormSubheader>Work details</FormSubheader>
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="">
                <label
                  htmlFor="workEngagementThree"
                  className="text-primary-gray block mb-2"
                >
                  Name of work engagement
                </label>
                <input
                  type="text"
                  id="workEngagementThree"
                  className="w-full p-2 border border-primary-gray"
                  placeholder="name"
                />
              </div>

              <div className="">
                <label
                  htmlFor="addressOfWorkEngagement"
                  className="text-primary-gray block mb-2"
                >
                  Address of work engagement
                </label>
                <input
                  type="text"
                  id="addressOfWorkEngagement"
                  className="w-full p-2 border border-primary-gray"
                  placeholder="address"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="">
                <label
                  htmlFor="jobStatus"
                  className="text-primary-gray block mb-2"
                >
                  Title or job status
                </label>
                <input
                  type="text"
                  id="jobStatus"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="startPeriod"
                  className="text-primary-gray block mb-2"
                >
                  Period
                </label>
                <input
                  type="text"
                  id="startPeriod"
                  placeholder="Start Date"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="">
                <label
                  htmlFor="stopPeriod"
                  className="text-primary-gray block mb-2"
                >
                  Period
                </label>
                <input
                  type="text"
                  id="stopPeriod"
                  placeholder="End Date"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>
            </div>

            <div>
              <AddButton title="Add Experience" />
            </div>
          </div>

          <div className=" flex flex-col gap-6">
            <FormSubheader>Publications & References</FormSubheader>

            <div className=" grid grid-cols-1 sm:grid-cols-2  gap-6">
              <div>
                <label
                  htmlFor="publisher"
                  className="text-primary-gray block mb-2"
                >
                  Publisher
                </label>
                <input
                  type="text"
                  id="publisher"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div>
                <label
                  htmlFor="titleOfPublication"
                  className="text-primary-gray block mb-2"
                >
                  Title of publication
                </label>
                <input
                  type="text"
                  id="titleOfPublication"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="listOfAuthors"
                  className="text-primary-gray block mb-2"
                >
                  List of authors
                </label>
                <textarea
                  id="listOfAuthors"
                  name="listOfAuthors"
                  className="w-full p-2 text-primary-gray border border-primary-gray"
                  rows={5}
                />
              </div>

              <div>
                <label htmlFor="pages" className="text-primary-gray block mb-2">
                  Pages
                </label>
                <input
                  type="text"
                  id="pages"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div>
                <label
                  htmlFor="yearOfPublication"
                  className="text-primary-gray block mb-2"
                >
                  Year of Publication
                </label>
                <input
                  type="number"
                  id="yearOfPublication"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <AddButton title="Add Experience" />
            </div>
          </div>

          <div className="py-10 flex flex-col gap-6">
            <div className=" grid gap-6">
              <FormSubheader>References & Job recommendation</FormSubheader>
              <div>
                <label
                  htmlFor="nameOfPersonOrCompany"
                  className="text-primary-gray block mb-2"
                >
                  Name of person of company
                </label>
                <input
                  type="text"
                  id="nameOfPersonOrCompany"
                  className="w-full sm:w-1/2 p-2 border border-primary-gray"
                />
              </div>
              <div>
                <FormSubheader>
                  Reference/ recommendation letter, if applicable
                </FormSubheader>

                <UploadButton title="Upload Documents" />
              </div>

              <AddButton title="Add Experience" />
            </div>
          </div>
        </form>
      </div>

      <ContinueButton
        nextStep={nextStep}
        prevStep={prevStep}
        className="sm:pt-20 pb-6"
      />
    </>
  );
};

export default WorkExperienceTwo;
