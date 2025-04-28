import BlackHeader from "@/common/BlackHeader";
import lightGreen from "../../assets/Profile/lightGreen.svg";
interface EnbridgeForm {
  nextStep: () => void;
  step: number;
}
const EnbridgeForm: React.FC<EnbridgeForm> = ({ nextStep }) => {
  return (
    <>
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity flex items-center justify-center overflow-scroll ">
        <section className=" max-w-2xl  max-h-screen   mx-4 ">
          <div className="flex flex-col gap-4 text-[#394A3F] min-h-[650px]   bg-white rounded-xl p-8  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] ">
            <BlackHeader>Products for "Enbridge" Utility ramjan</BlackHeader>
            <div className="flex items-start gap-1">
              <img className="pt-1" src={lightGreen} alt="light" />
              <p>
                5 Year Demand Side Monitoring Plan at the Ontario Energy Board
                (OEB) - approved Regulated Price Plan (RPP) or Market Price,
                throughout the period of the Contract. You will also continue to
                pay the standard delivery charges, delivery charges, gas supply
                and transportation charges to your utility every month.
                <span className="text-primary cursor-pointer">
                  more details
                </span>
              </p>
            </div>

            <div className="flex items-start gap-1">
              <img className="pt-1" src={lightGreen} alt="light" />
              <p>
                You will also be responsible for a one-time
                enrolment/re-enrolment fee of $1.50 and an 80¢ per month billing
                fee. As always you will be responsible for regulated delivery,
                regulatory, debt retirement and other costs billed by your
                utility. You will also remain entitled to/bound by the Global
                Adjustment billed by your utility. The following documents are
                available to be printed or downloaded without any obligation to
                enter a contract and contain more information about the offer.
              </p>
            </div>
            <button
              onClick={nextStep}
              className="bg-primary text-white rounded-md w-fit px-4 py-2 cursor-pointer mx-auto mt-auto"
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnbridgeForm;
