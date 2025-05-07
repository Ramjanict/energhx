import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface Login {
  nextStep?: () => void;
}

const Login: React.FC<Login> = ({ nextStep }) => {
  const { loginUser } = basicConsumerStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token, user } = basicConsumerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginUser(data);
    nextStep?.();
  };

  useEffect(() => {
    if (token && pathname === "/login") {
      navigate("/");
    }
  }, [token]);

  console.log("user", user);
  return (
    <div className="flex items-center justify-center h-auto md:min-h-[calc(100vh-70px)] p-4">
      <div className="w-full max-w-md bg-white px-6 py-10 rounded-lg shadow-[0px_0px_2px_2px_rgba(0,0,0,.04)]">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-6 "
        >
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
    </div>
  );
};

export default Login;
