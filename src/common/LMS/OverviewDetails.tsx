import OverView from "@/common/OverView";
import ractangle from "../../assets/Rectangle 1.png";
import DashBoardHeader from "@/common/DashBoardHeader";
const object = {
  subTitle: "FACILITIES",
  des: "Here is our some lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

  service: [
    "Cras egestas lectus tristique lectus mollis suscipit.",
    "Sed vestibulum nibh sed odio rutrum, id pretium risus luctus.",
    "Maecenas quis ligula sit amet ex dictum egestas.",
    "Mauris nec lorem aliquet, maximus orci at, tristique eros.",
    "Aenean a arcu eu magna interdum blandit non a arcu.",
    "Nunc ut mauris maximus, interdum lectus sit amet, venenatis turpis.",
  ],
  note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock",
};

const OverviewDetails = () => {
  return (
    <div className=" ">
      <div className=" bg-white rounded-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold">
            Overview <span className="text-green-500">→ Details</span>
          </h2>
          <button className="px-[24px] py-[12px] bg-[#E6F7FF] border-[#00ADFF] rounded-md text-[#00ADFF]">
            Pending ▼
          </button>
        </div>

        {/* Image Section */}
        <div className="my-4">
          <img src={ractangle} alt="Lamp" className="w-full rounded-lg" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
          <div className="w-full sm:w-1/2 ">
            {/* Introduction Section */}
            <div className="pb-6">
              <h3 className="text-lg font-medium">Introduction Energyhx</h3>
              <p className="text-gray-600 text-sm mt-2">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don’t look even
                slightly believable.
              </p>
            </div>

            <OverView object={object} />
          </div>
          <div className="w-full sm:w-1/2">
            {/* Consumer Details Section */}
            <DashBoardHeader>CONSUMER DETAILS</DashBoardHeader>
            <div className=" bg-[#EAF7E6] p-4 rounded-md mt-4">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm py-1 text-gray-600 border-b border-b-[#BEE6B0]">
                    First Name
                  </p>
                  <p className="font-normal py-1">Michael</p>
                </div>
                <div>
                  <p className="text-sm py-1 text-gray-600 border-b border-b-[#BEE6B0]">
                    Last Name
                  </p>
                  <p className="font-normal py-1">Reynolds</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm py-1 text-gray-600 border-b border-b-[#BEE6B0]">
                  Service Locations
                </p>
                <p className="font-normal py-1">
                  27 Maple Avenue, Los Angeles, CA 90012
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm py-1 text-gray-600 border-b border-b-[#BEE6B0]">
                  Permanent Locations
                </p>
                <p className="font-normal py-1">
                  101 Sunset Boulevard, San Francisco, CA 94110
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Note</p>
                <p className="text-gray-700 font-normal">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi.At vero eos et accusamus
                  et iusto odio dignissimos ducimus qui blanditiis praesentium
                  voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDetails;
