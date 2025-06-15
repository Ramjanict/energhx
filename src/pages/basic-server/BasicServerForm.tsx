import SungUp from "@/components/basic-sever/SungUp";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BasicServerForm = () => {
  const { DevUser } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (DevUser?.user.userType === "SERVER") {
      navigate("/choose-program");
    }
  }, [DevUser]);

  return (
    <>
      <SungUp />
    </>
  );
};

export default BasicServerForm;
