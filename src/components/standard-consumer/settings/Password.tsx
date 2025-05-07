import CommonButton from "@/common/CommonButton";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formList = [
  {
    label: "Old Password",
    id: "first",
    type: "password",
    placeholder: "Type here",
  },
  {
    label: "New Password",
    id: "second",
    type: "password",
    placeholder: "Type here",
  },
  {
    label: "Re-type New Password",
    id: "third",
    type: "password",
    placeholder: "Type here",
  },
];
const Password = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      <h2 className="text-lg text-[#112518] ">Password</h2>
      <div className="w-full sm:w-[50%] pb-10">
        {formList.map((item) => (
          <form key={item.id} className="text-primary-gray text-sm sm:text-lg ">
            <div className="pt-6">
              <label htmlFor={item.id} className="block">
                {item.label}
              </label>
              <div className="border border-[#9DA6A0] flex items-center">
                <input
                  className="w-full outline-none rounded-xs p-2"
                  type={showPassword ? "text" : "password"}
                  placeholder={item.placeholder}
                  id={item.id}
                />
                <div className="px-2 cursor-pointer">
                  {showPassword ? (
                    <span onClick={() => setShowPassword(false)}>
                      <FaEye />
                    </span>
                  ) : (
                    <span onClick={() => setShowPassword(true)}>
                      <FaEyeSlash />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        ))}
      </div>
      <CommonButton>Save Password</CommonButton>
    </div>
  );
};

export default Password;
