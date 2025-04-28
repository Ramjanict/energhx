import { MoveRight } from "lucide-react";
import AppointmentImg from "../../assets/appointment.png";
import appointment from "../../assets/appointment.svg";

function ViewDetails() {
  return (
    <div className="min-h-screen ">
      {/* Navigation and Actions */}
      <div className="bg-white">
        <div className=" mx-auto py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-lg gap-2 text-[#112518]">
            <span>Overview</span>
            <MoveRight className="w-4 h-4" />
            <span className="font-medium text-lg text-[#112518]">Details</span>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-[#2DAD00] text-white rounded">
              Accept
            </button>
            <button className="px-6 py-2 border bg-[#E8F4EB] border-[2DAD00] text-lg text-[#2DAD00] rounded">
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="py-4 md:py-6">
        <img
          src={AppointmentImg}
          alt=""
          className="w-full h-48 md:h-64 object-cover rounded-lg"
        />
      </div>

      <div className="mx-auto  py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column */}
          <div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg text-[#394A3F] ">Introduction Energhx</h2>
              <p className="text-[14px] text-[#758179]">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
            </div>
            <div className="flex flex-col pt-4 gap-6">
              <h2 className="text-base font-bold text-[#2DAD00]">FACILITIES</h2>
              <p className="text-[#112518] text-base">
                Here is our some lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <ul className="space-y-4">
                {[
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  "Cras egestas lectus tristique lectus mollis suscipit.",
                  "Sed vestibulum non sed odioSed vestibulum nibh sed odio rutrum, id pretium risus luctus.",
                  "Maecenas quis ligulaMaecenas quis ligula sit amet ex dictum egestas.",
                  "Mauris nec lorem aliquotMauris nec lorem aliquet, maximus orci at, tristique eros.",
                  "Aenean eu magna Aenean a arcu eu magna interdum blandit non a arcu.",
                  "Nunc ut Nunc ut mauris maximus, interdum lectus sit amet, venenatis turpis. maximus",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <img src={appointment} alt="" className="h-4 w-4" />
                    <span className="text-[#758179] text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base text-[#758179]">
                <strong>Note:</strong> Contrary to popular belief, Lorem Ipsum
                is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white flex flex-col  h-full">
            <h2 className="text-base font-bold mb-6 text-[#2DAD00]">
              CONSUMER DETAILS
            </h2>
            <div className="space-y-6 bg-[#EAF7E6] p-4 rounded-lg flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#758179] mb-2 border-b border-[#BEE6B0]">
                    First Name
                  </label>
                  <div className="text-[#394A3F] text-[18px]">Michael</div>
                </div>
                <div>
                  <label className="block text-[14px] text-[#758179] mb-2 border-b border-[#BEE6B0]">
                    Last Name
                  </label>
                  <div className="text-[#394A3F] text-[18px]">Reynolds</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-[14px] text-[#758179] mb-1 border-b border-[#BEE6B0]">
                  Service Locations
                </label>
                <span className="text-[#394A3F] text-[18px]">
                  27 Maple Avenue, Los Angeles, CA 90012
                </span>
                <label className="block text-[14px] text-[#758179] mb-1 border-b border-[#BEE6B0]">
                  Permanent Locations
                </label>
                <span className="text-[#394A3F] text-[18px]">
                  2101 Sunset Boulevard, San Francisco, CA 94110
                </span>
              </div>
              <div>
                <label className="block text-[14px] text-[#758179] mb-1 border-b border-[#BEE6B0]">
                  Note
                </label>
                <p className="text-[#394A3F] text-[18px] leading-7 md:leading-9">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
