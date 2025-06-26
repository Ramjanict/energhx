import DevAndServerDashboard from "@/common/LMS/DevAndServerDashboard";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StandardServerCertificateDashboard = () => {
  const { DevToken } = useAdminStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!DevToken) {
      navigate("/basic-server/form");
    }
  }, [DevToken]);
  return (
    <>
      <DevAndServerDashboard />
    </>
  );
};

export default StandardServerCertificateDashboard;
