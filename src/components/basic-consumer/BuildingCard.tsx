import { PlusCircle, BatteryFull } from "lucide-react";
import DashBoardHeader from "@/common/DashBoardHeader";
import { Link } from "react-router-dom";
import { AllBuilding } from "@/store/ConsumerStore/type/AllBuildings";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import { useEffect } from "react";

interface BuildingsTypesProps {
  item: AllBuilding;
}
const BuildingCard: React.FC<BuildingsTypesProps> = ({ item }) => {
  const { getAllBattery, allBattery, token } = useConsumerStore();

  useEffect(() => {
    getAllBattery();
  }, [token]);

  console.log("item ----build", item);
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col justify-between h-full border border-gray-100">
      <div className="flex flex-col gap-2">
        <DashBoardHeader className="">{item.building_name}</DashBoardHeader>
        <p className="text-sm text-gray-500 capitalize">
          Type:{" "}
          <span className="font-medium text-gray-700">
            {item.building_type.name}
          </span>
        </p>
        <p className="text-sm text-gray-500 capitalize">
          Subtype:{" "}
          <span className="font-medium text-gray-700">
            {item.building_sub_type.name}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Occupants: <span className="font-medium">{item.noOfOccupants}</span>
        </p>
        <p className="text-sm text-gray-500">
          Address:{" "}
          <span className="font-medium">
            {item.streetAddress}, {item.postalCode}
          </span>
        </p>

        <div>
          <p className="text-sm  text-primary">
            Batteries: <span className="font-medium">{allBattery?.length}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/add-room/${item.user_building_details_id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 active:scale-95 transition-transform"
        >
          <PlusCircle className="w-4 h-4  hidden sm:block" />
          Add Room
        </Link>
        <Link
          to={`/ev-battery/${item.user_building_details_id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 active:scale-95 transition-transform"
        >
          <BatteryFull className="w-4 h-4 hidden sm:block" />
          Add EV
        </Link>
      </div>
    </div>
  );
};

export default BuildingCard;
