import banner from "@/assets/courses/banner.png";
import newspaperfolding from "../../assets/courses/newspaper-folding.png";
import carouselvideo from "../../assets/courses/carousel-video.png";
import videoFile from "@/assets/courses/videoFile.png";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import CommonHeader from "@/common/CommonHeader";
import OrderModal from "@/components/Appointment/OrderModal";
import { useState } from "react";
import PaymentModal from "@/components/Appointment/PaymentModal";
import OverView from "@/common/OverView";
const object = {
  subTitle: "Course Details",
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
const renderStars = (rating: number) => {
  return (
    <div className="flex text-yellow-500 text-lg">
      {/* Filled Stars */}
      {Array.from({ length: Math.floor(rating) }, (_, i) => (
        <IoIosStar key={`filled-${i}`} />
      ))}
      {/* Empty Stars */}
      {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
        <IoIosStarOutline key={`empty-${i}`} />
      ))}
    </div>
  );
};

const CourseDetails = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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
  const [showPayment, setShowPayment] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
    setIsOrderModalOpen(false);
  };
  const handleNextOrder = () => {
    setShowPayment(true);
  };
  return (
    <div className=" bg-white rounded-lg">
      {/* Service Details Header */}

      <CommonHeader>Service Details</CommonHeader>

      {/* Course Banner */}
      <div className="">
        <img
          src={banner}
          alt="Course Banner"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Course Info */}
      <div className="mt-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            Introduction EnergHx
          </h3>
          <button
            onClick={() => {
              setIsOrderModalOpen(true);
            }}
            className="bg-[#2DAD00] text-white px-6 py-3 rounded cursor-pointer"
          >
            Book Now
          </button>
        </div>
        <div className="flex flex-col sm:flex-row  text-gray-600 text-sm mt-4 gap-4 mb-5 ">
          <span className="flex gap-2 ">
            <img className="w-4 h-4" src={carouselvideo} /> Total Class: 24
          </span>
          <span className="flex gap-2 ">
            <img className="w-4 h-4" src={newspaperfolding} /> Assignment: 14
          </span>
          <span className="flex gap-2 ">
            <img className="w-4 h-4" src={videoFile} /> Module: 06
          </span>
        </div>

        <p className="mt-3 text-[#758179]">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words.
        </p>

        {/* Ratings */}
        <div className="flex items-center mt-4">{renderStars(5)}</div>
      </div>

      {/* Course List */}
      <div className="mt-8 space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-4 sm:flex-row sm:items-center "
          >
            <img className="w-60 h-40 " src={banner} />
            <div className=" flex-1 sm:p-4">
              <h4 className="text-green-700 font-bold">Class: 0 | 45 Minute</h4>
              <p className="text-gray-700">Orientation Class</p>
              <p className="text-gray-500 text-sm">
                Topic: Light Fitting, Fan Servicing, Fan Installation, etc.
              </p>
            </div>

            <div className=" flex flex-row sm:flex-col  sm:p-4 gap-4 w-fit">
              <button className="px-4 py-2 text-sm  bg-light-green text-primary rounded-full">
                Watch Again
              </button>
              <button className="px-4 py-2 text-sm bg-[#E7E9E8]  ring-1 text-[#758179] rounded-full">
                Watch Now
              </button>
            </div>
          </div>
        ))}

        {/* Enrollment Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-700">
            Enroll in this course to gain full access to all videos.
          </p>
          <button
            onClick={() => {
              setIsOrderModalOpen(true);
            }}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        <OverView object={object} />
      </div>

      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          formData={formData}
          handleChange={handleChange}
          handleOrderSubmit={handleOrderSubmit}
          handleNextOrder={handleNextOrder}
        />
      )}

      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

export default CourseDetails;
