import { basicConsumerStore } from "@/store/ConsumerStore";
import BuildingInfo from "../standard-consumer/StandardConsumerBuildingInfo";

const BasicConsumerBuildingInfo = () => {
  const { token } = basicConsumerStore();
  return (
    token && (
      <div>
        <BuildingInfo />
      </div>
    )
  );
};

export default BasicConsumerBuildingInfo;
