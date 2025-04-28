import React from "react";
import { X } from "lucide-react";
import { OrderModalProps } from "@/types";

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleOrderSubmit,
  handleNextOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] max-w-lg w-full rounded-2xl">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#758179] mb-4">Package</h3>
            <div className="flex justify-between items-center pb-4 border-b border-[#9DA6A0]">
              <span className="text-[#394A3F]">1 Month - Basic </span>

              <div className="flex justify-center items-center font-bold">
                <h3 className="text-2xl  text-[#2DAD00]">$</h3>
                <p className="text-[64px] md:text-5xl  text-[#2DAD00]"> 20</p>
              </div>
            </div>
            <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4">
              <h3 className="text-xl font-bold text-[#758179]">Order Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-[#758179]  mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Consumer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-[#758179]  mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Demo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#758179]  mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourmail@mail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm text-[#758179]  mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Your Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm text-[#758179] mb-1"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm text-[#758179]  mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="postcode"
                    className="block text-sm text-[#758179] mb-1"
                  >
                    Postcode / ZIP
                  </label>
                  <input
                    type="number"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="1200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-[#758179]  mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="000 000 000 00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <button
                onClick={handleNextOrder}
                type="submit"
                className="w-full bg-[#2DAD00] text-white py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
