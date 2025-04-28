interface ContinueButton {
  setStep: (item: number) => void;
}
import img from "../../../assets/home2.png";
const BuildingInformation5: React.FC<ContinueButton> = ({ setStep }) => {
  return (
    <>
      <div className="pb-6">
        <p className=" text-[#112518] text-lg">All Buildings: 1</p>
      </div>
      <div
        onClick={() => {
          setStep(9);
        }}
        className=" flex items-start gap-4 bg-light-green border border-[#9ED98A] p-4 rounded-2xl cursor-pointer text-[14px] sm:text-base max-w-74"
      >
        <div className="bg-[#BEE6B0] rounded-2xl min-w-18  ">
          <img className="p-4" src={img} alt="light" />
        </div>
        <div className=" space-y-2.5">
          <p className="text-[#758179]">
            Building:
            <span className="text-[#394A3F] ">Commercial, Assemble Plants</span>
          </p>
          <p className="text-[#758179]">
            City:<span className="text-[#394A3F]">Akoka, Lagos</span>
          </p>
          <p className="text-[#758179]">
            Utilities:<span className="text-[#394A3F]">2</span>
          </p>
        </div>
      </div>
      <div className="pt-20">
        <button
          className=" bg-primary text-white px-6 py-2 rounded-md  cursor-pointer"
          onClick={() => {
            setStep(2);
          }}
        >
          Add Building
        </button>
      </div>
    </>
  );
};

export default BuildingInformation5;
