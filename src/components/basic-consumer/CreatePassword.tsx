import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { basicConsumerStore } from "@/store/ConsumerStore";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

const CreatePassword = () => {
  const { createPassword, isLoading, user } = basicConsumerStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [emailFetched, setEmailFetched] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        if (decoded.email) {
          setEmailFetched(decoded.email);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  console.log("user", user);

  const onSubmit = async (data: FormData) => {
    if (token) {
      await createPassword(data, token);
      navigate("/login");
    }
    console.log("userData", data);
  };

  console.log("emailFetched", emailFetched);
  console.log("token", token);
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Password</h2>

        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={!!emailFetched}
            defaultValue={emailFetched}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700">New Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
        >
          {isSubmitting || isLoading ? "Submitting..." : "Create Password"}
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;
