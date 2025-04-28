import { Link } from "react-router-dom";
import Star from "./Star";
import CommonHeader from "./CommonHeader";

const Booking = () => {
  const body = [
    {
      service: "Energhx New LED Light Fix",
      time: "11:45 AM",
      date: "20 February 2024",
      price: "free",
      status: "On Going",
      option: "View",
      rating: 4.3,
    },
    {
      service: "Energhx New LED Light Fix",
      time: "12:45 PM",
      date: "February 2024",

      price: 1050,
      status: "Completed",
      option: "View",
      rating: 4.3,
    },
  ];
  const head = ["SL.", "Service name", "Date", "Price", "Status", "Option"];
  return (
    <div className="w-full">
      <CommonHeader>Booking History</CommonHeader>

      <div className="w-full border border-[#E7E9E8]    ">
        <div className=" bg-[#EAF7E6] grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 px-4 gap-2 text-accent ">
          {head.map((item, i) => (
            <h2
              className="py-4 nth-[2]:col-span-2 nth-[3]:hidden sm:nth-[3]:block  first:hidden md:first:block"
              key={i}
            >
              {item}
            </h2>
          ))}
        </div>
        <div>
          {body.map((item, i) => (
            <div className="w-full border-b border-[#E7E9E8] last:border-0 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 px-4 gap-2 ">
              <div className="w-full md:flex items-center text-sm text-accent hidden  ">
                #{i + 100}
              </div>
              <div className="w-full  flex flex-col justify-center col-span-2 text-accent">
                <h2 className="text-xs  sm:text-sm xl:text-lg">
                  {item.service}
                </h2>

                <div className="flex items-center gap-1">
                  <Star />
                  <p className="text-accent">4.3</p>
                </div>
              </div>
              <div className="w-full  sm:flex flex-col  py-4 text-xs text-accent xl:text-text-sm  hidden">
                <p>{item.time}</p>
                <p>{item.date}</p>
              </div>
              <div className="w-full  flex items-center py-4 text-xs text-accent xl:text-sm">
                {item.price}
              </div>
              <div className={`flex items-center py-4 w-full  `}>
                <button
                  className={`px-2 py-2 lg:px-4 text-[8px] lg:text-[12px]  rounded-full   ${
                    item.status === "Completed"
                      ? " bg-[#E8F4EB] border border-primary text-primary "
                      : "border border-[#F1BB00] text-[#F1BB00] "
                  }
                
                  `}
                >
                  {item.status}
                </button>
              </div>
              <Link
                to="5"
                className="flex items-center py-4 text-[10px] text-xs"
              >
                <button className="px-2 py-2 lg:px-4 text-[8px] lg:text-[12px]  rounded-full  bg-[#FFFAE9] border border-[#F1BB00] text-[#F1BB00]    cursor-pointer">
                  {item.option}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
