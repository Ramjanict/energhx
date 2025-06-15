import { AllBattery } from "./type/AllBattery";
import { AllBatteryType } from "./type/AllbatteryTypes";
import { allBuildingsData } from "./type/AllBuildings";
import { AllServices } from "./type/Allservices";
import { BiomassMicroservice } from "./type/BiomassMicroservice";
import { BuildingsTypes } from "./type/BuildingTypes";
import { Commodity } from "./type/Commodity";
import { CreateConsumer } from "./type/CreateConsumer";
import { EnergyBuildingData } from "./type/EnergyBuildingData";
import { EneryAuditArrayData } from "./type/EneryAuditArrayData";
import { EVBatterySizing } from "./type/EVBatterySizing";
import { User } from "./type/LoginUser";
import { PostBiomassMicroServices } from "./type/PostBiomassMicroServices";
import { PostSolarMicroServices } from "./type/PostSolarMicroServices";
import { RoomData } from "./type/RoomData";
import { SolarMicroservice } from "./type/SolarMicroservice";
import { State } from "./type/States";
import { UpdatePassword } from "./type/UpdatedPassword";
import { Country, UserData } from "./type/UserData";

export type ConsumerStoreType = {
  user: UserData | null;

  userType: Object;
  getUserType: (user: string) => void;
  token: string;
  energyAudit: EneryAuditArrayData;
  allBuildings: allBuildingsData;
  allBuildingsTypes: BuildingsTypes[] | null;
  allCountries: Country[] | null;
  allStates: State[] | null;
  allCommodities: Commodity[] | null;
  allServices: AllServices[] | null;
  solarMicroservice: SolarMicroservice | null;
  biomassMicroservice: BiomassMicroservice | null;
  isLoading: boolean;
  allBatteryType: AllBatteryType[];
  allBattery: AllBattery[];

  createConsumer: (newConsumer: CreateConsumer) => Promise<void>;
  getBatteryTypes: () => Promise<void>;
  getAllBattery: () => Promise<void>;

  AddBattery: (battery: EVBatterySizing) => Promise<void>;
  getAllCountries: () => Promise<void>;
  //all building
  getAllBuildings: () => Promise<void>;
  getAllBuildingsTypes: () => Promise<void>;
  AddRoomWithBuilding: (room: RoomData) => Promise<void>;

  getAllStates: (id: string) => Promise<void>;
  getAllCommodities: () => Promise<void>;
  getAllServices: (
    countryId: string,
    stateId: string,
    commodityId: string
  ) => Promise<void>;

  getEnergyAudit: () => Promise<void>;
  postEnergyAudit: (energyAudit: EnergyBuildingData) => Promise<void>;

  postSolarMicroServices: (service: PostSolarMicroServices) => Promise<void>;
  postBiomassMicroServices: (
    biomass: PostBiomassMicroServices
  ) => Promise<void>;

  createPassword: (userData: User, token: string) => Promise<void>;
  updatePassword: (userData: UpdatePassword) => Promise<void>;
  loginUser: (newUser: User) => Promise<void>;
  logOutUser: () => void;
};
