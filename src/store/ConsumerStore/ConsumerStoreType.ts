import { AllBattery } from "../consumerStoreType/AllBattery";
import { AllBatteryType } from "../consumerStoreType/AllbatteryTypes";
import { allBuildingsData } from "../consumerStoreType/AllBuildings";
import { AllServices } from "../consumerStoreType/Allservices";
import { BiomassMicroservice } from "../consumerStoreType/BiomassMicroservice";
import { BuildingsTypes } from "../consumerStoreType/BuildingTypes";
import { Commodity } from "../consumerStoreType/Commodity";
import { CreateConsumer } from "../consumerStoreType/CreateConsumer";
import { EnergyBuildingData } from "../consumerStoreType/EnergyBuildingData";
import { EneryAuditArrayData } from "../consumerStoreType/EneryAuditArrayData";
import { EVBatterySizing } from "../consumerStoreType/EVBatterySizing";
import { User } from "../consumerStoreType/LoginUser";
import { PostBiomassMicroServices } from "../consumerStoreType/PostBiomassMicroServices";
import { PostSolarMicroServices } from "../consumerStoreType/PostSolarMicroServices";
import { RoomData } from "../consumerStoreType/RoomData";
import { SolarMicroservice } from "../consumerStoreType/SolarMicroservice";
import { State } from "../consumerStoreType/States";
import { Country, UserData } from "../consumerStoreType/UserData";

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
  loginUser: (newUser: User) => Promise<void>;
  logOutUser: () => void;
};
