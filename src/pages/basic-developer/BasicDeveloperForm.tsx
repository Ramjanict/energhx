import SungUp from "@/components/basic-sever/SungUp";
import { useServerStore } from "@/store/ServerStore/ServerStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BasicDeveloperForm = () => {
  const { DevToken } = useServerStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (DevToken) {
      navigate("/basic-server/dashboard");
    }
  }, [DevToken]);
  return (
    <>
      <SungUp />
    </>
  );
};

export default BasicDeveloperForm;
