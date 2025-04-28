import React from "react";
import highFive from "@/assets/high-five.png"
import { FaDribbble } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoTumblr } from "react-icons/io";
import { FaSnapchat } from "react-icons/fa6";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50  bg-gray-50/0 bg-opacity-50 z-20 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-100">
        <button className="absolute top-3 right-3 text-gray-500" onClick={onClose}>
          ✖
        </button>
        <img
          src={highFive}
          alt="Success"
          className="mx-auto mb-4 w-20"
        />
        <h2 className="text-xl font-bold text-gray-700">THANKS</h2>
        <p className="text-gray-600 mb-4">FOR YOUR BOOKING</p>
        <p className="text-gray-500 mb-2">Follow Us</p>
        <div className="border-b w-[60%] flex mx-auto"></div>
        <div className="flex justify-center space-x-4 text-gray-700 text-2xl mt-4">
          <i className="fab fa-dribbble"><FaDribbble/></i>
          <i className="fab fa-linkedin"><IoLogoLinkedin/></i>
          <i className="fab fa-tumblr"><IoLogoTumblr/></i>
          <i className="fab fa-snapchat"><FaSnapchat/></i>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
