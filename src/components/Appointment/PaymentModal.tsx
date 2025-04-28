import React, { useState } from 'react';
import { X } from 'lucide-react';
import visaCard from "../../assets/Visa.svg"
import masterCard from "../../assets/Mastercard.svg"
import discoverCard from "../../assets/Discover.svg"
import frame from "../../assets/Frame.svg"
import jcb from "../../assets/Japan Credit Bureau.svg"
import cb from "../../assets/Cartes Bancaires.svg"

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'twoOnline'>('card');

  if (!isOpen) return null;

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  // Generate year options (current year + 20 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#EAF7E6] rounded-lg w-full max-w-md relative my-4 sm:my-8">
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <div className="p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#758179] mb-4 sm:mb-6">CONFIRM PAYMENT</h2>
          
          {/* Payment Methods */}
          <div className="space-y-3 sm:space-y-4">
            {/* Credit Card Option */}
            <div className="border rounded-2xl p-2 sm:p-3 md:p-4 bg-[#EAF7E6] border-[#2DAD00]">
              <label className="flex items-start gap-2 sm:gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-sm sm:text-base md:text-lg text-[#758179]">Credit or Debit Cards</span>
                    <div className="flex gap-1 sm:gap-2">
                      <img src={visaCard} alt="Visa" className="h-4 sm:h-5 md:h-6" />
                      <img src={masterCard} alt="Mastercard" className="h-4 sm:h-5 md:h-6" />
                      <img src={discoverCard} alt="Discover" className="h-4 sm:h-5 md:h-6" />
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-sm sm:text-base md:text-lg text-[#758179]">Card Holder Name</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-[#9DA6A0] rounded-sm bg-[#FFFFFF]"
                          placeholder="Enter cardholder name"
                        />
                      </div>
                      
                      <div className='relative'>
                        <label className="text-sm text-gray-600">Card Number</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-[#9DA6A0] rounded-sm bg-[#FFFFFF] pr-10 sm:pr-12"
                          placeholder="0000 0000 0000 0000"
                        />
                        <img src={visaCard} alt="" className='absolute top-8 sm:top-9 right-2 sm:right-3 h-5 sm:h-7' />
                      </div>
                      
                      <div className="md:flex gap-2">
                        <div className="md:w-1/2 w-full">
                          <label className="text-sm sm:text-base md:text-lg text-[#758179]">End Date</label>
                          <div className="flex gap-1 sm:gap-2">
                            <select className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-[#9DA6A0] rounded-sm bg-white text-sm">
                              <option value="">MM</option>
                              {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                              ))}
                            </select>
                            <select className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border rounded-sm bg-white border-[#9DA6A0] text-sm">
                              <option value="">YYYY</option>
                              {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="md:w-[25%] w-full ">
                          <label className="text-sm sm:text-base md:text-lg text-[#758179]">CVV</label>
                          <input
                            type="text"
                            maxLength={3}
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-sm border-[#9DA6A0] bg-white text-sm"
                            placeholder="000"
                          />
                        </div>
                        <div className="w-[25%] flex items-center justify-center gap-1 sm:gap-2 pt-4">  
                          <img src={frame} alt="" className='h-3 sm:h-4' />
                          <h3 className='text-xs sm:text-sm text-[#758179]'>3 Digit</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-xs sm:text-sm text-[#758179]">
                          I have carefully read and accepted the Terms & Conditions.
                        </span>
                      </div>
                      
                      <button className="w-full bg-[#2DAD00] text-white py-2 sm:py-3 rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base">
                        Pay Now
                      </button>
                    </div>
                  )}
                </div>
              </label>
            </div>
            
            {/* Online Bank Service */}
            <div className="border rounded-lg p-3 sm:p-4 border-[#E7E9E8]">
              <label className="flex items-center gap-2 sm:gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                <div className="flex-1">
                  <h2 className="text-sm sm:text-base md:text-lg text-[#758179]">Online Bank Service</h2>
                  <h4 className='text-xs sm:text-sm text-[#9DA6A0]'>Transcription fee may apply</h4>
                </div>
                <img src={jcb} alt="JCB" className="h-4 sm:h-5 md:h-6" />
              </label>
            </div>
            
            {/* Two Online Bank */}
            <div className="border rounded-lg p-3 sm:p-4 border-[#E7E9E8]">
              <label className="flex items-center gap-2 sm:gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'twoOnline'}
                  onChange={() => setPaymentMethod('twoOnline')}
                />
                <div className="flex-1">
                  <h2 className="text-sm sm:text-base md:text-lg text-[#758179]">Two Online Bank</h2>
                  <h4 className='text-xs sm:text-sm text-[#9DA6A0]'>Transcription fee may apply</h4>
                </div>
                <img src={cb} alt="cb" className="h-4 sm:h-5 md:h-6" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;