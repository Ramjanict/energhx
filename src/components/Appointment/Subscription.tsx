import { useState } from "react";
import OrderModal from "./OrderModal";

import CommonHeader from "@/common/CommonHeader";
import DashBoardHeader from "@/common/DashBoardHeader";
import PaymentModal from "./PaymentModal";

function Subscription() {
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
  const handleSubscribe = () => {
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto">
        <div className="  ">
          <CommonHeader>Overview</CommonHeader>
          <DashBoardHeader> Upgrade Facilities</DashBoardHeader>

          <p className="max-w-2xl text-base text-[#112518] pt-2">
            Here is our some lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {/* Basic Plan */}
          <div className="border border-[#2DAD00] rounded-3xl p-6 bg-[#EAF7E6] hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <span className="text-2xl text-[#2DAD00]">$</span>
                <span className="text-[64px]  text-[#2DAD00]">20</span>
              </div>
              <div className=" text-lg text-[#2DAD00]">1 Month - Basic</div>
            </div>
            <button
              onClick={() => handleSubscribe()}
              className="mt-8 w-full bg-[#2DAD00] text-lg text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>

          {/* Business Plan */}
          <div className="border border-[#00ADFF] rounded-3xl p-6 bg-[#E6F7FF] hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <span className="text-2xl text-[#00ADFF]">$</span>
                <span className="text-[64px]  text-[#00ADFF]">110</span>
              </div>
              <div className=" text-lg text-[#00ADFF]">6 Months - Business</div>
            </div>
            <button
              onClick={() => handleSubscribe()}
              className="mt-8 w-full bg-[#00ADFF] text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>

          {/* Pro Plan */}
          <div className="border border-[#F1BB00] rounded-3xl p-6 bg-[#FFFAE9] hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <span className="text-2xl text-[#F1BB00]">$</span>
                <span className="text-[64px]  text-[#F1BB00]">220</span>
              </div>
              <div className=" text-[#F1BB00]">12 Months - Pro</div>
            </div>
            <button
              onClick={() => handleSubscribe()}
              className="mt-8 w-full bg-[#F1BB00] text-lg text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-8 text-start text-base text-[#758179]">
          <p>
            <span className="font-semibold">Note:</span> Contrary to popular
            belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock
          </p>
        </div>
      </div>
      {/* Order Modal */}

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
}

export default Subscription;
