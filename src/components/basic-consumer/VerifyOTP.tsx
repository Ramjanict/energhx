import { IoBagCheckOutline } from "react-icons/io5";

interface VerifyOTP {
  nextStep: () => void;
}
const VerifyOTP: React.FC<VerifyOTP> = ({ nextStep }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-72px)] justify-center items-center  ">
      <div className=" shadow-[0_0_1px_2px_rgba(0,0,0,0.04)] min-w-lg  flex flex-col gap-6 px-5 py-10 items-center justify-center rounded-3xl">
        <span className="text-7xl text-primary">
          <IoBagCheckOutline />
        </span>

        <p className="font-extrabold text-primary font-secondary text-base sm:text-xl md:text-2xl ">
          Email verified <br /> successfully
        </p>
        <button
          onClick={nextStep}
          className=" bg-primary px-6 py-2 rounded-xl w-full cursor-pointer hover:bg-green-500 "
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
