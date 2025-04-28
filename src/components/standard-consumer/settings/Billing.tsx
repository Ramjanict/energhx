import { useState } from "react";
import HandShake from "@/components/basic-consumer/HandShake";
import PaymentModal from "@/components/Appointment/PaymentModal";
import CommonButton from "@/common/CommonButton";

const Billing = () => {
  const [showHand, setShowHand] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleSave = () => {
    setShowPayment(true);
  };

  const formList = [
    {
      label: "First Name",
      id: "first",
      type: "text",
      placeholder: "Type here",
    },
    {
      label: "Last Name",
      id: "second",
      type: "text",
      placeholder: "Type here",
    },
    {
      label: "Email Address",
      id: "Email",
      type: "email",
      placeholder: "Your Email",
    },
    {
      label: "Country",
      id: "Country",
      type: "text",
      placeholder: "Type here",
    },
    {
      label: "State",
      id: "State",
      type: "text",
      placeholder: "Type here",
    },
    {
      label: "City",
      id: "City",
      type: "text",
      placeholder: "Type here",
    },
    {
      label: "Postcode / ZIP",
      id: "Postcode",
      type: "number",
      placeholder: "Type here",
    },
    {
      label: "Phone",
      id: "Phone",
      type: "number",
      placeholder: "Type here",
    },
  ];
  return (
    <div className="">
      <h2 className="text-lg text-[#112518]  py-6">Billing</h2>

      <div className="grid grid-cols-2 gap-6">
        {formList.map((item, index) => (
          <div
            key={item.id}
            className={`col-span-2 sm:col-span-1 ${
              index === 2 && "sm:col-span-2"
            } ${index === 3 && "sm:col-span-2"}`}
          >
            <label
              htmlFor={item.id}
              className="block text-primary-gray text-sm sm:text-lg w-fit"
            >
              {item.label}
            </label>
            <input
              id={item.id}
              type={item.type}
              placeholder={item.placeholder}
              className="w-full outline-none rounded-xs border border-[#9DA6A0] p-2"
            />
          </div>
        ))}
      </div>

      <div onClick={handleSave} className="pt-10">
        <CommonButton>Save Billing</CommonButton>
      </div>

      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false);
            setShowHand(true);
          }}
        />
      )}

      {showHand && <HandShake setShowHand={setShowHand} />}
    </div>
  );
};

export default Billing;
