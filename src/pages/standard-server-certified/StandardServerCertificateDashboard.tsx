import DevAndServerDashboard from "@/common/LMS/DevAndServerDashboard";
import { useLocation } from "react-router-dom";

const StandardServerCertificateDashboard = () => {
  const { pathname } = useLocation();
  console.log("path", pathname);
  return (
    <>
      <DevAndServerDashboard />
    </>
  );
};

export default StandardServerCertificateDashboard;
