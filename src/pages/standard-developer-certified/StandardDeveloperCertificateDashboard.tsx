import DevAndServerDashboard from "@/common/LMS/DevAndServerDashboard";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StandardDeveloperCertificateDashboard = () => {
  const navigate = useNavigate();
  const { DevToken } = useAdminStore();

  useEffect(() => {
    if (!DevToken) {
      navigate("/basic-developer/form");
    }
  }, [DevToken]);
  return (
    <div>
      <DevAndServerDashboard />
    </div>
  );
};

export default StandardDeveloperCertificateDashboard;
