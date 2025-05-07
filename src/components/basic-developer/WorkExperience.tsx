import Breadcrumbs from "@/common/Breadcrumbs";
import ContinueButton from "@/common/ContinueButton";
import { ContinueButtonType } from "@/types";
import AddButton from "@/common/AddButton";
import UploadButton from "@/common/UploadButton";
import DashBoardHeader from "@/common/DashBoardHeader";
import FormSubheader from "@/common/FormSubheader";
import CommonDropdown from "@/common/form/CommonDropdown";

const WorkExperience: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
  step,
}) => {
  console.log("step", step);
  return (
    <form>
      <div className=" sm:pb-10  ">
        <Breadcrumbs />
      </div>
      <div className="">
        <DashBoardHeader>Work Experience</DashBoardHeader>

        <FormSubheader className="my-6">
          Provide the needed qualifications and details needed.
        </FormSubheader>
        <FormSubheader>Work details</FormSubheader>
        <form className=" flex flex-col gap-6">
          <div>
            <label
              htmlFor="workEngagement"
              className="text-primary-gray mb-2 block"
            >
              Name of work engagement
            </label>
            <div className=" w-full flex flex-col lg:flex-row gap-6 items-start ">
              <div className="">
                <input
                  type="text"
                  id="workEngagement"
                  className="w-full lg:w-[486px] p-2 border border-primary-gray"
                  placeholder="Name"
                />
              </div>

              <UploadButton title="Upload Documents" />
              <AddButton title="Add" />
            </div>
          </div>
          <div>
            <label htmlFor="work" className="text-primary-gray mb-2 block">
              Name of work engagement
            </label>
            <div className=" w-full flex flex-col lg:flex-row gap-6 items-start ">
              <div className="">
                <input
                  type="text"
                  id="work"
                  className="w-full lg:w-[486px] p-2 border border-primary-gray"
                  placeholder="Name"
                />
              </div>

              <UploadButton title="Upload Documents" />
              <AddButton title="Add" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="workEngagementTwo"
                className="text-primary-gray text-md"
              >
                Passport Photograph
              </label>
            </div>
            <UploadButton title="Upload Documents" />
          </div>
          <div className="w-full  flex flex-col ">
            <label
              htmlFor="workEngagementTwo"
              className="text-primary-gray block mb-2"
            >
              Province (s)/Country of Residence
            </label>

            <div>
              <CommonDropdown />
            </div>
          </div>
        </form>
        <ContinueButton
          nextStep={nextStep}
          prevStep={prevStep}
          className="pt-6 sm:pt-20"
        />
      </div>
    </form>
  );
};

export default WorkExperience;
