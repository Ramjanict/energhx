import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const AdminLoginForm = () => {
  const { adminLogin, isLoading, DevToken } = useAdminStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        console.error("Email and password are required.");
        return;
      }
      await adminLogin({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Left side - Blue background with shapes */}
      <div className="hidden md:flex md:w-1/2 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 w-24 h-24 rounded-full bg-green-700"></div>
        <div className="absolute top-[25%] right-[20%] transform rotate-45 w-16 h-16 bg-green-700"></div>
        <div className="absolute top-[45%] right-[15%] transform w-0 h-0 border-l-[50px] border-l-transparent border-t-[80px] border-t-green-700 border-r-[50px] border-r-transparent"></div>
        <div className="absolute bottom-[15%] left-[15%] transform w-32 h-32 rounded-full bg-green-700"></div>
        <div className="absolute bottom-[5%] right-[10%] transform rotate-45 w-40 h-40 bg-green-700"></div>

        <div className="z-10 flex flex-col justify-center px-12 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg">
            To keep connected with us please login
            <br />
            with your personal info
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#f7fcff]">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-10 text-center text-primary">
            Admin LogIn
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-6 border rounded-md !outline-none !ring-0 !focus:outline-none !focus:ring-0 !focus:ring-offset-0"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-6 border rounded-md !outline-none !ring-0 !focus:outline-none !focus:ring-0 !focus:ring-offset-0"
                required
              />
            </div>
            {!DevToken && (
              <Button
                type="submit"
                className="w-full p-6 bg-primary hover:bg-green-500 text-white font-medium rounded-md transition-colors cursor-pointer"
              >
                {DevToken ? "Logout" : isLoading ? "Logging in..." : "Log In"}
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
