import { Root, Indicator } from "@radix-ui/react-checkbox";
import LightBulb from "@/assets/Vector.svg";

import Breadcrumbs from "@/common/Breadcrumbs";
import ContinueButton from "@/common/ContinueButton";
import { ContinueButtonType } from "@/types";
import DashBoardHeader from "@/common/DashBoardHeader";
import FormSubheader from "@/common/FormSubheader";

const VerifyAndSubmit: React.FC<ContinueButtonType> = ({
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      <>
        <div className=" sm:pb-10  ">
          <Breadcrumbs />
        </div>
        <div>
          <DashBoardHeader>Verify and Submit</DashBoardHeader>

          <form>
            <FormSubheader className="py-6">
              Confirm the information provided
            </FormSubheader>
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="verifyFirstName"
                  className="text-primary-gray block mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="verifyFirstName"
                  className="w-full p-2 border border-primary-gray block mb-2"
                />
              </div>

              <div>
                <label
                  htmlFor="verifyLastName"
                  className="text-primary-gray block mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="verifyLastName"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="f">
                <label
                  htmlFor="verifyFirstName"
                  className="text-primary-gray  block mb-2"
                >
                  Home Tel
                </label>
                <input
                  type="text"
                  id="homeTel"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="">
                <label
                  htmlFor="altTel"
                  className="text-primary-gray block mb-2"
                >
                  Alt Tel
                </label>
                <input
                  type="text"
                  id="altTel"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="">
                <label
                  htmlFor="verifyMail"
                  className="text-primary-gray block mb-2"
                >
                  Mail
                </label>
                <input
                  type="text"
                  id="verifyMail"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>

              <div className="">
                <label
                  htmlFor="companyName"
                  className="text-primary-gray block mb-2"
                >
                  Add your company name (Optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full p-2 border border-primary-gray"
                />
              </div>
            </div>

            {/* condition section  */}
            <div className="flex flex-col gap-6 py-6">
              <div className="flex items-start gap-2">
                <Root
                  id="terms"
                  className="peer shrink-0 h-5 w-5 rounded-sm border border-primary-gray bg-transparent 
                   data-[state=checked]:bg-primary-green 
                   data-[state=checked]:border-primary-green 
                   focus:ring-0 focus:outline-none"
                >
                  <Indicator className="hidden" />
                </Root>

                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-primary-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70"
                >
                  I agree to the Non-Disclosure Agreement (NDA).{" "}
                  <span className="text-primary-green font-semibold">
                    See link
                  </span>
                </label>
              </div>

              <div className="flex items-start gap-2">
                <Root
                  id="terms"
                  className="peer shrink-0 h-5 w-5 rounded-sm border border-primary-gray bg-transparent 
                   data-[state=checked]:bg-primary-green 
                   data-[state=checked]:border-primary-green 
                   focus:ring-0 focus:outline-none"
                >
                  <Indicator className="hidden" />
                </Root>

                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-primary-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70"
                >
                  I agree to the Research Ethics Policy documents.{" "}
                  <span className="text-primary-green font-semibold">
                    See link
                  </span>
                </label>
              </div>

              <div className="flex gap-3 items-start">
                <img
                  src={LightBulb}
                  alt="light bulb"
                  className="w-5 h-5 mt-1"
                />
                <p className="text-sm font-medium text-primary-gray leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70">
                  By clicking the "Submit" button, you will be electronically
                  signing this Application effective
                  <span className="text-primary ml-1">
                    Monday March, 07, 2022.
                  </span>
                  <br />
                  If Energhx approves your Application, the Agreement between
                  the parties will take effect as of that date.
                </p>
              </div>
            </div>

            <ContinueButton
              nextStep={nextStep}
              prevStep={prevStep}
              className="sm:pt-10 "
            />
          </form>
        </div>
      </>
    </div>
  );
};

export default VerifyAndSubmit;
