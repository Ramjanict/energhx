import CommonHeader from "@/common/CommonHeader";

interface Request {
  order: string;
  service: string;
  consumerName: string;
  location: string;
}
interface RequestListProps {
  onViewRequest: (order: string) => void;
}

function RequestList({ onViewRequest }: RequestListProps) {
  const requests: Request[] = [
    {
      order: "01",
      service: "Service A",
      consumerName: "Sophia Bennett",
      location: "15 Greenway Street, New York, NY 10001",
    },
    {
      order: "02",
      service: "Service B",
      consumerName: "Daniel Foster",
      location: "27 Maple Avenue, Los Angeles, CA 90012",
    },
    {
      order: "03",
      service: "Service C",
      consumerName: "Michael Reynolds",
      location: "89 River Road, Miami, FL 33101",
    },
    {
      order: "04",
      service: "Service D",
      consumerName: "Emma Collins",
      location: "101 Sunset Boulevard, San Francisco, CA 94110",
    },
    {
      order: "05",
      service: "Service E",
      consumerName: "John Carter",
      location: "36 Hilltop Drive, Chicago, IL 60614",
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto">
        <CommonHeader>Request List</CommonHeader>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-[#2DAD00] text-white px-6 py-6 grid grid-cols-12 gap-4 rounded-lg font-primary font-normal">
              <div className="col-span-1">Order</div>
              <div className="col-span-2">Service</div>
              <div className="col-span-3">Consumer Name</div>
              <div className="col-span-4">Location</div>
              <div className="col-span-2">Action</div>
            </div>

            {/* Request Rows */}
            {requests.map((request, index) => (
              <div
                key={request.order}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center my-[12px] rounded-lg font-primary ${
                  index % 2 === 0 ? "bg-[#E7E9E8]" : "bg-[#EAF7E6]"
                }`}
              >
                <div className="col-span-1 text-base font-normal">
                  {request.order}
                </div>
                <div className="col-span-2 text-lg font-normal">
                  {request.service}
                </div>
                <div className="col-span-3 text-lg font-normal">
                  {request.consumerName}
                </div>
                <div className="col-span-4 text-lg font-normal">
                  {request.location}
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => onViewRequest(request.order)}
                    className="bg-[#2DAD00] cursor-pointer text-white px-9 py-3 rounded-sm hover:bg-[#259A00] transition-colors "
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {requests.map((request, index) => (
            <div
              key={request.order}
              className={`p-4 rounded-lg ${
                index % 2 === 0 ? "bg-[#E7E9E8]" : "bg-[#EAF7E6]"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-sm ">Order</div>
                <div className="text-base font-normal">{request.order}</div>

                <div className="text-sm ">Service</div>
                <div className="text-base font-normal">{request.service}</div>

                <div className="text-sm ">Consumer Name</div>
                <div className="text-base font-normal">
                  {request.consumerName}
                </div>

                <div className="text-sm ">Location</div>
                <div className="text-base">{request.location}</div>
              </div>

              <button
                onClick={() => onViewRequest(request.order)}
                className="w-full bg-[#2DAD00] text-white py-2 rounded-sm cursor-pointer hover:bg-[#259A00] transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RequestList;
