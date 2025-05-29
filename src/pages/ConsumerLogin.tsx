import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const ConsumerLogin = () => {
  const { loginUser, user, token } = useConsumerStore();

  console.log("userType", user?.userType);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginUser(data);
  };

  useEffect(() => {
    if (token && pathname === "/login") {
      navigate("/");
    }
  }, [token]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-6 ">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full  p-2 border rounded-md outline-none  text-primary-gray"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-primary-gray">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded-md outline-none  text-primary-gray "
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-primary text-white  border border-primary-gray p-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default ConsumerLogin;
