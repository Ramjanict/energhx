import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import pdf from "../../assets/pdf.svg";
import file from "../../assets/files.svg";
interface MyClass {
  id: string;
  title: string;
  topic: string;
  timeInMinutes: number;
  classNumber: number;
  isCompleted: boolean;
  isWatching: boolean;
  files: string[];
  image: string;
}

interface MyClassDetailsProps {
  classList: MyClass[];
}

const MyClassDetails = ({ classList }: MyClassDetailsProps) => {
  return (
    <div className="w-full flex flex-col gap-7 ">
      {classList.map((singleClass) => {
        return (
          <div className="w-full flex flex-col  justify-between items-center    gap-6 md:flex-row pb-6">
            {/* image section */}
            <div className="w-full md:w-60  ">
              <img
                src={singleClass.image}
                alt=""
                className=" w-full  rounded-2xl "
              />
            </div>

            {/* details section */}
            <div className=" flex-1  w-full flex flex-col gap-2  p-3">
              <div className="flex items-center space-x-2 text-gray-700 text-lg">
                <span className="text-[14px] text-primary">
                  Class:
                  <span className="font-normal">{singleClass.classNumber}</span>
                </span>
                <span>|</span>
                <span className="text-[394A3F] text-[14px]">
                  {singleClass.timeInMinutes} Minute
                </span>
              </div>
              <p className="text-[#394A3F] text-lg">{singleClass.title}</p>
              <p className="text-[14px] text-[#394A3F]">{singleClass.topic}</p>
              <p className="flex gap-3">
                {singleClass.files.map((item) => {
                  return (
                    <span className="text-[14px] text-[9DA6A0] cursor-pointer">
                      {item}
                    </span>
                  );
                })}
              </p>
              <div className=" flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4" src={pdf} alt="pdg" />
                  <p>information.pdf</p>
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4" src={file} alt="pdg" />
                  <p>information.pdf</p>
                </div>
              </div>
            </div>

            {/* watching information */}
            <div className=" flex flex-row md:flex-col  gap-2 text-xs lg:text-base pl-3 justify-start w-full md:w-fit">
              {singleClass.isCompleted && (
                <button className="= bg-secondary text-primary   border border-primary rounded-full  cursor-pointer flex items-center py-2 px-3">
                  <span>
                    <IoEyeOutline />
                  </span>
                  Watch again
                </button>
              )}
              {singleClass.isCompleted && (
                <button className="flex items-center justify-center gap-2 bg-[#E6F7FF] text-[#00ADFF] text-[16px] border-[1px] border-[#00ADFF] rounded-full px-3 py-2 cursor-pointer">
                  Completed
                </button>
              )}

              {!singleClass.isCompleted && (
                <button
                  className={`flex items-center justify-center gap-2 text-xs lg:text-base border-[1px] rounded-full px-3 py-2 cursor-pointer ${
                    singleClass.isWatching
                      ? "bg-secondary text-primary border-primary"
                      : "bg-[#E7E9E8] text-[#758179] border-[#758179]"
                  }`}
                >
                  <span className=" ">
                    {singleClass.isWatching ? (
                      <IoCheckmarkDoneOutline />
                    ) : (
                      <IoEyeOutline />
                    )}
                  </span>
                  Watch now
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyClassDetails;
