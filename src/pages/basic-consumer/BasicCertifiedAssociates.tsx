import CommonHeader from "@/common/CommonHeader";
import DropdownInfo from "@/components/standard-consumer/DropdownInfo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const associates = [
  { id: "01", name: "Emmnauel Nonye", role: "Developer", rating: 4.3 },
  { id: "02", name: "Emmnauel Nonye", role: "Server", rating: 4.3 },
  { id: "03", name: "Emmnauel Nonye", role: "Developer", rating: 4.3 },
  { id: "04", name: "Emmnauel Nonye", role: "Server", rating: 4.3 },
];

const BasicCertifiedAssociates = () => {
  return (
    <div className="">
      <CommonHeader>Certified Associates</CommonHeader>
      <DropdownInfo />
      <div className="space-y-4">
        {associates.map((associate) => (
          <Card
            key={associate.id}
            className="flex items-center p-4 shadow-sm rounded-[12px] bg-[#F5F5F5]"
          >
            <div className="flex items-center gap-x-14">
              <span className="text-accent text-sm">{associate.id}</span>

              <div className="flex flex-col">
                <h3 className="text-primary text-[18px] font-semibold">
                  {associate.name}
                </h3>
                <div className="flex items-center text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                  <Star className="w-4 h-4 fill-none text-yellow-500" />
                  <span className="ml-1 text-accent text-sm">
                    {associate.rating}
                  </span>
                </div>
              </div>

              <p className="text-accent font-semibold text-base">
                {associate.role}
              </p>
              <p className="text-gray-500 text-sm">
                Here is the current Location Lorem Ipsum used since the 1500
              </p>

              <Link to={"certified-associate-profile"}>
                <Button className="bg-primary flex justify-center text-white rounded-[4px] px-8 py-7 shadow-md text-[18px] cursor-pointer">
                  View Profile
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default BasicCertifiedAssociates;
