import MultiStepForm from "@/components/basic-sever/MultiStepForm";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BasicDeveloperForm = () => {
  const { token } = useConsumerStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/basic-developer/dashboard");
    }
  }, [token]);
  return (
    <>
      <MultiStepForm link="/basic-developer" />
    </>
  );
};

export default BasicDeveloperForm;
