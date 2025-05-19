import PaymentModal from "@/components/Appointment/PaymentModal";
import HandShake from "@/components/basic-consumer/HandShake";
import Biomass from "@/components/basic-consumer/Microservice/Biomass";
import RoomOverView from "@/components/basic-consumer/Microservice/RoomOverView";
import Solar from "@/components/basic-consumer/Microservice/Solar";
import TwoTitle from "@/components/basic-consumer/TwoTitle";
import { Button } from "@/components/ui/button";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useServerStore } from "@/store/ServerStore";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BasicConsumerAnalysis = () => {
  const { isHandShakeOpen, handleHandShake, isPaymentModalOpen, closePayment } =
    useServerStore();
  const navigate = useNavigate();
  const { allBuildings, getAllBuildings } = basicConsumerStore();
  const { pathname } = useLocation();

  console.log("pathname", pathname);

  const path =
    pathname === "/standard-consumer/analysis"
      ? "/standard-consumer/buildingInformation"
      : "/basic-consumer/buildingInformation";

  if (allBuildings?.length === 0) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No Data Available</h1>
        <p className="text-gray-500">
          Please add a building to view the analysis.
        </p>
        <Link
          to={path}
          className=" bg-primary text-white px-4 py-2 rounded mt-4"
        >
          Add Building
        </Link>
      </div>
    );
  }

  useEffect(() => {
    getAllBuildings();
  }, []);

  return (
    <div>
      <RoomOverView />
      <Solar />
      <Biomass />
      <TwoTitle
        blackHeader="BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
        greenHeader="CONCLUSION AND RECOMMENDATIONS"
      />
      <div>
        <Button className="text-white cursor-pointer">RECOMMENDATIONS</Button>
      </div>

      {isPaymentModalOpen && (
        <PaymentModal isOpen={isPaymentModalOpen} onClose={closePayment} />
      )}

      {isHandShakeOpen && (
        <HandShake
          handleClose={() => {
            handleHandShake(false);
            navigate("/standard-consumer");
          }}
        />
      )}
    </div>
  );
};

export default BasicConsumerAnalysis;
