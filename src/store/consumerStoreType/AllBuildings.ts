import { Commodity } from "./Commodity";
import { State } from "./States";

// all building
export interface UtilityState {
  id: string;
  createdAt: string;
  state_id: string;
  utility_company_id: string;
  state: State;
}

export interface UtilityCompany {
  utility_company_id: string;
  utility_company_name: string;
  country_id: string;
  states: UtilityState[];
}
export interface UserBuildingUtility {
  accountNumber: string;
  unit: string;
  acceptTermsAndConditions: boolean;
  acceptanceDate: string;
  utility: UtilityCompany;
  commodity: Commodity;
  createdAt: string;
  updatedAt: string;
}
export interface BuildingType {
  building_type_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuildingSubType {
  building_sub_type_id: string;
  name: string;
  building_type_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllBuilding {
  user_building_details_id: string;
  building_name: string;
  postalCode: string;
  city: string; // This looks like a UUID reference to a city or state object
  building_type: BuildingType;
  building_sub_type: BuildingSubType;
  streetAddress: string;
  createdAt: string;
  updatedAt: string;
  noOfOccupants: string;
  user_building_utility: UserBuildingUtility[];
}
export type allBuildingsData = AllBuilding[];
