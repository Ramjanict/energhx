import MultiStepForm from "@/components/basic-sever/MultiStepForm";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BasicServerForm = () => {
  const { token } = basicConsumerStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/basic-server/dashboard");
    }
  }, [token]);

  return (
    <>
      <MultiStepForm link="/basic-server" />
    </>
  );
};

export default BasicServerForm;
