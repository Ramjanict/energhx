import CommonHeader from "@/common/CommonHeader";
import DropdownInfo from "@/components/standard-consumer/DropdownInfo";
import { Star } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const associates = [
  { id: "01", name: "Emmnauel Nonye", role: "Developer", rating: 4.3 },
  { id: "02", name: "Emmnauel Nonye", role: "Server", rating: 4.3 },
  { id: "03", name: "Emmnauel Nonye", role: "Developer", rating: 4.3 },
  { id: "04", name: "Emmnauel Nonye", role: "Server", rating: 4.3 },
];

const StandardConsumerAssociates = () => {
  return (
    <div className="">
      <CommonHeader>Certified Associates</CommonHeader>

      <DropdownInfo />
      <div className=" flex flex-col gap-3 ">
        {associates.map((associate) => (
          <div
            key={associate.id}
            className="flex w-full items-center  justify-between gap-2 sm:gap-6 bg-[#F5F5F5] rounded-xl py-3 px-3"
          >
            <div className="sm:flex items-center hidden  ">
              <span className="text-accent text-sm">{associate.id}</span>
            </div>

            <div className="flex flex-col">
              <h3 className="text-primary text-xs md:text-lg font-semibold line-clamp-1">
                {associate.name}
              </h3>
              <div className="flex items-center text-yellow-500">
                {[...Array(Math.floor(associate.rating))].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
                {[...Array(5 - Math.floor(associate.rating))].map((_, i) => (
                  <Star
                    key={i + 4}
                    className="w-4 h-4 fill-none text-yellow-500"
                  />
                ))}
                <span className="ml-1 text-accent text-sm">
                  {associate.rating}
                </span>
              </div>
            </div>

            <div>
              <p className="text-accent font-semibold text-xs sm:text-base">
                {associate.role}
              </p>
            </div>
            <div className=" hidden sm:block">
              <p className="text-gray-500 text-sm line-clamp-1">
                Here is the current Location Lorem Ipsum used since the 1500
              </p>
            </div>

            <div className="min-w-24">
              <Link
                to="certified-associate-profile"
                className="bg-primary  text-white rounded-sm p-2 lg:px-6 lg:py-3 shadow-md text-xs lg:text-lg cursor-pointer"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default StandardConsumerAssociates;
