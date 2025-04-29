interface ContinueButton {
  setStep: (item: number) => void;
}
import { useEffect, useState } from "react";
import img from "../../../assets/home2.png";
import axios from "axios";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { BuildingType } from "@/types/buildingType";

const baseURL = import.meta.env.VITE_BASE_URL;

interface ContinueButton {
  setStep: (item: number) => void;
  setSelectedBuilding: (building: BuildingType) => void;
}

const BuildingInformation5: React.FC<ContinueButton> = ({
  setStep,
  setSelectedBuilding,
}) => {
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const { token } = basicConsumerStore();
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/buildings/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBuildings(response?.data?.data);
      } catch (error) {
        console.error("Error fetching buildings: ", error);
      }
    };
    fetchBuildings();
  }, [token]);

  const handleSubmit = (building: BuildingType) => {
    setSelectedBuilding(building);
    setStep(9);
  };

  console.log(buildings, "buildings in my state");

  return (
    <>
      <div className="pb-6">
        <p className=" text-[#112518] text-lg">
          All Buildings: {buildings.length}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buildings.map((building, i) => (
          <div
            key={i}
            onClick={() => {
              handleSubmit(building);
            }}
            className="flex items-start gap-4 bg-light-green border border-[#9ED98A] p-4 rounded-2xl cursor-pointer text-[14px] sm:text-base max-w-74"
          >
            <div className="bg-[#BEE6B0] rounded-2xl min-w-18  ">
              <img className="p-4" src={img} alt="light" />
            </div>
            <div className=" space-y-2.5">
              <h1>Name: {building?.building_name}</h1>
              <p className="text-[#758179]">
                Building:
                <span className="text-[#394A3F] ">
                  {" "}
                  {building?.building_name || "Unnamed"},{" "}
                  {building?.building_sub_type?.name || "N/A"}
                </span>
              </p>
              {/* <p className="text-[#758179]">
                City:<span className="text-[#394A3F]">Akoka, Lagos</span>
              </p> */}
              <p className="text-[#758179]">
                Utilities:
                <span className="text-[#394A3F]">
                  {" "}
                  {building?.user_building_utility.length}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-20">
        <button
          className=" bg-primary text-white px-6 py-2 rounded-md  cursor-pointer"
          onClick={() => {
            setStep(2);
          }}
        >
          Add Building
        </button>
      </div>
    </>
  );
};

export default BuildingInformation5;
