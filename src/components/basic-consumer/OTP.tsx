import React, { useRef, useState } from "react";

import { FaUserLock } from "react-icons/fa";
const OTP_LENGTH = 6;

interface OTP {
  nextStep: () => void;
}
const OTP: React.FC<OTP> = ({ nextStep }) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste
      .split("")
      .concat(Array(OTP_LENGTH).fill(""))
      .slice(0, OTP_LENGTH);
    setOtp(newOtp);
    newOtp.forEach((_, idx) => {
      inputRefs.current[idx]?.focus();
    });
  };

  const otpValue = otp.join("");

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] justify-center items-center  ">
      <div className=" shadow min-w-lg  flex flex-col gap-6 px-5 py-10 items-center justify-center rounded-3xl">
        <span className="text-7xl text-primary">
          <FaUserLock />
        </span>
        <p className="font-extrabold text-primary font-secondary text-base sm:text-xl md:text-2xl ">
          OTP Verification
        </p>
        <div className="flex gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm">OTP Entered: {otpValue}</p>
        <button
          onClick={nextStep}
          className=" bg-primary px-6 py-2 rounded-xl w-full cursor-pointer hover:bg-green-500"
        >
          Verify COde
        </button>
      </div>
    </div>
  );
};
export default OTP;
