import { useEffect, useState } from "react";
import ConsumerLogin from "./ConsumerLogin";
import DevServerLogin from "./DevServerLogin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { useNavigate } from "react-router-dom";

type UserType = "Energy Consumer" | "Energy Server" | "Energy Developer";

const Login = () => {
  const [user, setUser] = useState<UserType>("Energy Consumer");
  const navigate = useNavigate();

  const userOptions: UserType[] = [
    "Energy Consumer",
    "Energy Server",
    "Energy Developer",
  ];

  const { token } = useConsumerStore();
  const { DevToken } = useAdminStore();
  const currentToken = token || DevToken;
  useEffect(() => {
    if (currentToken) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-auto md:min-h-[calc(100vh-70px)] p-4">
      <div className="w-full max-w-md bg-white px-6 py-10 rounded-lg shadow-[0px_0px_2px_2px_rgba(0,0,0,.04)]">
        <h2 className="text-2xl font-semibold text-center pb-5">
          Please select your user type
        </h2>

        <div className="flex justify-between py-6">
          <Select
            onValueChange={(value: UserType) => setUser(value)}
            value={user}
          >
            <SelectTrigger className="outline-none">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {userOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="hover:bg-primary hover:text-white"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {user === "Energy Consumer" ? (
          <ConsumerLogin users={user} />
        ) : (
          <DevServerLogin users={user} />
        )}
      </div>
    </div>
  );
};

export default Login;
