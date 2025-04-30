import { useState } from "react";

import image from "../../assets/appointment.png";
import profile from "../../assets/Profile/profile.png";
import Star from "@/common/Star";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import badge1 from "../../assets/batch1.jpg";
import badge2 from "../../assets/batch2.jpg";

import BookingModal from "@/components/standard-consumer/BookingModal";
import HandShake from "@/components/basic-consumer/HandShake";

const StandardConsumerAssociateProfile = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const lists = Array(4).fill(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    postcode: "",
    phone: "",
  });
  const handleBooking = () => {
    setIsBookingModalOpen(true);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingModalOpen(false);
    setShowHand(true);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col items-center md:items-start md:flex-row gap-8 ">
        <div className="flex-1">
          <div>
            <h2 className="text-gray-700 font-medium text-xs lg:text-lg">
              Certified Associates
              <span className="text-black font-semibold">→ Emmanuel Nonye</span>
            </h2>
          </div>
          <div className="pt-10 grid grid-cols-1  lg:grid-cols-2 gap-6">
            {lists.map(() => (
              <div className="bg-white shadow-md rounded-xl border border-[#E7E9E8]  ">
                <img
                  src={image}
                  alt="Service"
                  className=" rounded-lg h-58 sm:h-68 "
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 ">
                    Energhx New Fan Light Fix
                  </h3>

                  <div className="flex items-center text-yellow-500">
                    <Star />
                    <span className="ml-1 text-gray-600 font-medium">4.3</span>
                    <span className="text-gray-500 text-sm ml-1">
                      (Review 22)
                    </span>
                  </div>
                </div>

                <div className="p-4 pt-0 ">
                  <button
                    onClick={() => handleBooking()}
                    className="w-full  cursor-pointer  bg-secondary text-primary py-2 rounded-md font-semibold border border-green-500 hover:bg-primary hover:text-white transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary  rounded-xl shadow-md  max-w-[300px]">
          <div className="flex flex-col items-center text-center p-4">
            <div className=" flex items-start  w-full justify-end">
              <img
                src={profile}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <span className="mt-2 px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full">
                Available
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold">EMMANUEL NONYE</h3>
            <p className="text-gray-600 font-medium">Developer</p>
            <div className="flex items-center text-yellow-500 mt-1">
              <Star />
              <span className="ml-1 text-gray-600 text-sm">4.3</span>
            </div>
            <button className="w-full mt-3 bg-primary text-white py-2 rounded-md font-semibold">
              Appointment
            </button>
            <p className="text-gray-500 text-sm mt-3">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>

          <div className=" border-t border-[#BEE6B0] p-4 text-[#394A3F] space-y-2">
            <h4 className="font-semibold  text-primary text-base pb-3">
              Contact Info
            </h4>

            <div className="flex gap-1 items-start">
              <span className=" text-primary text-xl pt-1">
                <FaPhoneVolume />
              </span>
              <p className="">888 888 8888</p>
            </div>
            <div className="flex gap-1 items-start">
              <span className=" text-primary text-xl pt-1">
                <AiOutlineMail />
              </span>
              <p className="">yourmail@mail.com</p>
            </div>
            <div className="flex gap-1 items-start">
              <span className=" text-primary text-xl pt-1">
                <IoLocationOutline />
              </span>
              <p className="">
                Here is the current Location Lorem Ipsum used since 1200
              </p>
            </div>
          </div>
          <div className=" border-t border-[#BEE6B0] p-4 text-[#394A3F] space-y-2">
            <h4 className="font-semibold  text-primary text-base pb-3">
              Certificates
            </h4>

            <div className="flex gap-3 items-start">
              <img className="w-12 h-12" src={badge1} alt="" />
              <div>
                <h2 className=" font-semibold  text-[14px]">
                  Developer Certificate 2024
                </h2>
                <p className=" text-[12px]">
                  Here is the current Location Lorem Ipsum used since 1200
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start  pt-3">
              <img className="w-12 h-12" src={badge2} alt="" />
              <div>
                <h2 className=" font-semibold text-[14px]">
                  Server Certificate 2023
                </h2>
                <p className=" text-[12px]">
                  Here is the current Location Lorem Ipsum used since 1200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          formData={formData}
          handleChange={handleChange}
          handleBookingSubmit={handleBookingSubmit}
        />
      )}

      {showHand && <HandShake setShowHand={setShowHand} />}
    </div>
  );
};

export default StandardConsumerAssociateProfile;
