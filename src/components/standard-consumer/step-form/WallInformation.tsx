import { IoMdClose } from "react-icons/io";

interface WallInformation {
  direction: string;
  length: number;
  width: number;
}
const WallInformation: React.FC<WallInformation> = ({
  direction,
  length,
  width,
}) => {
  return (
    <div className=" max-w-[420px] flex flex-col sm:flex-row items-start justify-between text-accent">
      <div>
        <h3 className=" text-lg pb-3 sm:pb-0">{direction}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" bg-[#E7E9E8] flex justify-between items-center px-6 py-2 rounded-2xl">
          <p>12m, 16m, North</p>
          <span className="text-[#394A3F] text-xl cursor-pointer">
            <IoMdClose />
          </span>
        </div>
        <div className=" bg-[#E7E9E8] rounded-2xl p-6">
          <div className="text-[#394A3F]">
            <h2 className="pb-1">Input Values</h2>
          </div>
          <div className=" space-y-1">
            <p>
              Length: <span className="text-[#394A3F]">{length}m</span>
            </p>
            <p>
              Width: <span className="text-[#394A3F]">{width}m</span>
            </p>
            <p>
              Wall type: <span className="text-[#394A3F]">{direction}</span>
            </p>
            <button className=" cursor-pointer">
              Click to edit this information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallInformation;
