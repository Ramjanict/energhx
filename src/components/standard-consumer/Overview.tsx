import CommonHeader from "@/common/CommonHeader";

const serviceList = [
  { id: "01", name: "Service One", type: "Solar" },
  { id: "02", name: "Service Two", type: "Biomass" },
  { id: "03", name: "Service Three", type: "Wind" },
  { id: "04", name: "Service Four", type: "Solar" },
  { id: "05", name: "Service Five", type: "Biomass" },
];
const Overview = () => {
  return (
    <div className="w-full">
      <CommonHeader>Overview</CommonHeader>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { count: "26", title: "Energy Audit & Analysis" },
          { count: "306", title: "Solar Energy Sizing" },
          { count: "24K", title: "Wind Energy Sizing" },
          { count: "24K", title: "Biomass Energy Sizing" },
        ].map((item, index) => (
          <div
            key={index}
            className=" border border-[#9ED98A] bg-light-green hover:bg-primary transition-all group text-white p-4 sm:p-5 rounded-lg text-center min-h-[160px] sm:min-h-[180px] flex flex-col justify-center"
          >
            <p className="text-4xl sm:text-6xl font-bold text-[#1C9237] group-hover:text-white border-b border-[#BEE6B0] pb-1 sm:pb-2">
              {item.count}
            </p>
            <p className="text-[#394A3F] pt-3 text-sm sm:text-lg group-hover:text-white">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full  pt-10">
        <div className="w-full ">
          <div className="grid grid-cols-3 sm:grid-cols-4 place-items-center place-content-center  bg-primary text-white  text-xs sm:text-[16px] p-4 rounded-lg ">
            <p className="hidden sm:block place-self-start">No</p>
            <p className=" ">Service Name</p>
            <p className=" ">Service Type</p>
            <th className=" place-self-end">Action</th>
          </div>

          <div className=" flex flex-col gap-3 mt-3">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className={`odd:bg-[#E7E9E8] even:bg-[#F8F8F8] grid grid-cols-3 sm:grid-cols-4 place-items-center  bg-primary text-xs sm:text-[16px] p-4 rounded-lg 
                `}
              >
                <p className=" place-self-start  hidden sm:block">
                  {service.id}
                </p>
                <p className=" ">{service.name}</p>
                <p className=" ">{service.type}</p>
                <p className="place-self-end ">
                  <button className="bg-primary text-white px-3 py-1 rounded text-[15px]">
                    View
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
