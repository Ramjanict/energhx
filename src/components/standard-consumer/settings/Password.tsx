import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordFormData } from "./validationSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CommonButton from "@/common/CommonButton";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const Password = () => {
  const { updatePassword, isLoading } = useConsumerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: PasswordFormData) => {
    await updatePassword(data);
    reset();
  };

  return (
    <div>
      <h2 className="text-lg text-[#112518]">Password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-[50%] pb-10 text-primary-gray text-sm sm:text-lg"
      >
        {/* Old Password */}
        <div className="pt-6">
          <label htmlFor="oldPassword" className="block">
            Old Password
          </label>
          <div className="border border-[#9DA6A0] flex items-center">
            <input
              {...register("password")}
              id="oldPassword"
              type={showPassword.old ? "text" : "password"}
              placeholder="Type here"
              className="w-full outline-none rounded-xs p-2"
            />
            <div
              className="px-2 cursor-pointer"
              onClick={() => toggleVisibility("old")}
            >
              {showPassword.old ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="pt-6">
          <label htmlFor="confirmPassword" className="block">
            New Password
          </label>
          <div className="border border-[#9DA6A0] flex items-center">
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showPassword.new ? "text" : "password"}
              placeholder="Type here"
              className="w-full outline-none rounded-xs p-2"
            />
            <div
              className="px-2 cursor-pointer"
              onClick={() => toggleVisibility("new")}
            >
              {showPassword.new ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-8">
          <CommonButton>
            {isLoading ? "processing..." : "Save Password "}
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default Password;
