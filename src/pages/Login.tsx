import { useState } from "react";
import ConsumerLogin from "./ConsumerLogin";
import DevServerLogin from "./DevServerLogin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  const [userType, setUserType] = useState("Energy Consumer");

  const userOptions = [
    { user: "Energy Consumer" },
    { user: "Energy Server" },
    { user: "Energy Developer" },
  ];

  return (
    <div className="flex items-center justify-center h-auto md:min-h-[calc(100vh-70px)] p-4">
      <div className="w-full max-w-md bg-white px-6 py-10 rounded-lg shadow-[0px_0px_2px_2px_rgba(0,0,0,.04)]">
        <h2 className="text-2xl font-semibold text-center pb-5">
          Please select your user type
        </h2>
        <div className="flex justify-between py-6">
          <Select
            onValueChange={(value) => {
              setUserType(value);
            }}
            value={userType}
          >
            <SelectTrigger className=" outline-none">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {userOptions.map((option, i) => (
                <SelectItem
                  key={i}
                  value={option.user}
                  className=" !hover:bg-primary hover:text-white"
                >
                  {option.user}
                </SelectItem>
              ))}
            </SelectContent>
            <div className="text-sm font-semibold ">{userType}</div>
          </Select>
        </div>

        {userType === "Energy Consumer" ? (
          <ConsumerLogin />
        ) : (
          <DevServerLogin />
        )}
      </div>
    </div>
  );
};

export default Login;
