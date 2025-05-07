import certificate from "../../assets/server-intern-assets/certificate.png";
const MyCertificate = () => {
  return (
    <div className="">
      <div className="mt-4"></div>
      <div className="bg-secondary max-w-[894px]">
        <p className="py-4 px-6 text-base sm:text-lg text-accent">
          Certificate- Energhx New LED Light Fix
        </p>
        <div className="p-[10px] relative w-full">
          <img src={certificate} alt="" />
          <p className=" p-4 md:p-10  w-[60%] text-[#F1BB00] border border-[#F1BB00] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[10px] sm:text-base">
            Upon successful completion of the course, you will be awarded this
            certificate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyCertificate;
