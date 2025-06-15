import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface DevServerLoginProps {
  users: "Energy Consumer" | "Energy Server" | "Energy Developer";
}

const DevServerLogin = ({ users }: DevServerLoginProps) => {
  const { login, DevToken, getDevUserType } = useAdminStore();
  const { getUserType } = useConsumerStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    await login(data);
  };

  useEffect(() => {
    if (DevToken && pathname === "/login") {
      navigate("/choose-program");
    }
  }, [DevToken, pathname, navigate]);

  const handleSignUpRedirect = () => {
    switch (users) {
      case "Energy Consumer":
        navigate("/basic-consumer/form");
        getUserType("Normal Energy Users");
        break;
      case "Energy Server":
        navigate("/basic-server/form");
        getDevUserType("SERVER");
        break;
      case "Energy Developer":
      default:
        navigate("/basic-developer/form");
        getDevUserType("DEVELOPER");

        break;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-sm bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md outline-none text-primary-gray"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded-md outline-none text-primary-gray"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary text-white border border-primary-gray p-2 rounded-md transition-opacity cursor-pointer ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?
          <span
            onClick={handleSignUpRedirect}
            className="text-primary cursor-pointer pl-1 underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default DevServerLogin;
