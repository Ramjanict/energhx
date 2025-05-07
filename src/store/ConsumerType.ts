type State = {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
};
export type Country = {
  name: string;
  code: string;
  id: string;
  states: State[];
};

type SubBuildings = {
  name: string;
  id: string;
};

type Buildings = {
  name: string;
  id: string;
  subBuildings: SubBuildings[];
};

type User = {
  email: string;
  password: string;
};
export type PostSolarMicroServices = {
  wavelength: number;
  sam_type: string;
  custom_sam_ri?: number;
  custom_sam_k?: number;
  sam_thickness: number;
  substrate_type: string;
  custom_substrate_ri?: number;
  custom_substrate_k?: number;
  substrate_thickness: number;
  electrode_type: string;
  custom_electrode_ri?: number;
  custom_electrode_k?: number;
  electrode_thickness: number;
  photoanode_thickness: number;
  custom_photoanode_ri?: number;
  custom_photoanode_k?: number;
  dye_thickness: number;
  custom_dye_ri?: number;
  custom_dye_k?: number;
  solar_irradiance: number;
  area: number;
  num_hours: number;
  total_plug_load: number;

  sam_ri?: number;
  sam_k?: number;
  substrate_ri?: number;
  substrate_k?: number;
  electrode_ri?: number;
  electrode_k?: number;
  photoanode_ri?: number;
  photoanode_k?: number;
  dye_ri?: number;
  dye_k?: number;
};
type SolarPlot = {
  absorbance_vs_transmittance_plot: string;
  delta_dye_plot: string;
  delta_fto_plot: string;
  delta_photoanode_plot: string;
  delta_substrate_plot: string;
  number_of_cells_vs_energy_yield_plot: string;
  number_of_cells_vs_total_plug_load_plot: string;
  reflectance_vs_transmittance_plot: string;
};
type SolarMicroservice = {
  efficiency: number;
  energy_output: number;
  num_cells: number;
  plots: SolarPlot;
};

type PostBiomassMicroServices = {
  feedstock: string;
  t: number;
  TS: number;
  VS: number;
  FADin: number;
  VADCH4: number;
  THTC: number;
  QAD: number;
  SADin: number;
  XADin: number;
  SHTC0: number;
  ZAD0: number;
  CO20: number;
  H20: number;
  NH30: number;
  μADmax: number;
  D: number;
  Kd: number;
  Ks: number;
  KI: number;
  Yx: number;
  Ksx: number;
  Kmx: number;
  Ys: number;
  YCH4: number;
  YCO2: number;
  YH2: number;
  YNH3: number;
  Ta: number;
  A: number;
  αs: number;
  ρCH4: number;
};

export type BioRanges = {
  CO2: number[];
  E: number[];
  H2: number[];
  NH3: number[];
  SADout: number[];
  SHTC: number[];
  VADCH4: number[];
  XADout: number[];
  ZADCH4: number[];
  t_values: number[];
};

export type BioResults = {
  CO2: number;
  E: number;
  H2: number;
  MCO2: number;
  MH2: number;
  MNH3: number;
  MSADout: number;
  MXADout: number;
  MZADCH4: number;
  NH3: number;
  SADout: number;
  SHTCout: number;
  XADout: number;
  ZADCH4: number;
};

type BiomassMicroservice = {
  ranges: BioRanges[];
  results: BioResults[];
};

export type CreateConsumer = {
  firstname: string;
  lastname: string;
  othername: string;
  companyName?: string;
  email: string;
  streetNumber: string;
  streetName: string;
  city: string;
  countryName: string;
  provinceName: string;
  sex: string;
  postalCode: string;
  userRole?: string;
  userType?: string;
};
interface UserData {
  alternatePhoneNumber: string | null;
  userType: string;
  isVerified: boolean;
  buildings: Buildings;
  id: string;
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  phoneNumber: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
  userTypeId: string;
  userRole: string;
  profile_photo: string | null;
  country: Country;
  password: string | null;
}

type Commodity = {
  name: string;
  updatedAt: string;
  id: string;
  createdAt: string;
};
type AllServices = {
  name: string;
  updatedAt: string;
  id: string;
  commodity: Commodity[];
  termsAndConditionFilePath: string | null;
  priceComparisonFilePath: string | null;
  country_id: string;
  states: State[];
  createdAt: string;
};

// Energy Audit Data Types
type CoolingLoadProfile = Record<string, number>;

type EVBatterySizing = {
  "battery-classification": string;
  "cell-energy": number;
  "cell-volume": number;
  "cells-in-series": number;
  "energy-content-of-string": number;
  "gravitational-energy-density": number;
  manufacturer: string;
  model: string;
  "number-of-cells": number;
  "number-of-strings-in-pack": number;
  "pack-continuos-power": number;
  "pack-peak-current": number;
  "package-continous": number;
  "package-peak-power": number;
  "package-total-capacity": number;
  "package-total-energy": number;
  "package-total-mass": number;
  "package-total-volume": number;
  "string-continou-current": number;
  "string-peak-current": number;
  title: string;
  "volumetric-density": number;
};

type Room = {
  id: string;
  title: string;
  "cooling load": {
    "total cooling load profile": CoolingLoadProfile;
  };
  "energy audit": {
    "EUI total": number;
    IAC: number;
    IACD: number;
    SHGCB: number;
    SHGCD: number;
    "U-value of fenestration": number;
    "U-value of roof": number;
    "U-value of wall": number;
    "air-conditioning power density": number;
    "equipment power density": number;
    "fenestration-to-wall ratio": number;
    "floor area": number;
    "infiltration rate": number;
    "lighting power density": number;
    "occupant density": number;
    "outdoor air temperature": number;
    "outdoor humidity ratio": number;
    "space air temperature": number;
    "space humidity ratio": number;
  };
};

type OptimalParameters = {
  IAC: number;
  IACD: number;
  SHGCB: number;
  SHGCD: number;
  "U-value-of-fenestration": number;
  "U-value-of-roof": number;
  "U-value-of-wall": number;
  "equipment-power-density": number;
  "fenestration-to-wall-ratio": number;
  "infiltration-rate": number;
  "lighting-power-density": number;
  "occupant-density": number;
  "outdoor-air-temperature": number;
  "outdoor-humidity-ratio": number;
  "space-air-temperature": number;
  "space-humidity-ratio": number;
};

type EnergyAuditCharacterizationOptimization = {
  "Objective-Function-Value-(EUI)": number;
  "Optimal-Parameters": OptimalParameters;
  rooms: Room[];
};

type EnergyFullData = {
  title: string;
  idx: string;
  "Cooling Load Calculation": CoolingLoadProfile;
  "EV-Battery Sizing": EVBatterySizing[];
  "Energy Audit, Characterization, Optimization": EnergyAuditCharacterizationOptimization;
};

// Define the array of buildings data
type EneryAuditArrayData = EnergyFullData[];

// post energy audi
type EnergyBuildingData = {
  buildings: {
    title: string;
    rooms: {
      title: string;
      construction: string;
      "construction-subtype": string;
      "percentage-glass": string;
      "wall-type": string;
      city: string;
      month: string;
      "percentage-MDDB": string;
      LSM: number;
      "north-wall-area": number;
      "east-wall-area": number;
      "south-wall-area": number;
      "west-wall-area": number;
      "roof-type": string;
      "roof-area": number;
      "north-fenestration-area-shaded": number;
      "north-fenestration-area-sunlit": number;
      "east-fenestration-area-shaded": number;
      "east-fenestration-area-sunlit": number;
      "south-fenestration-area-shaded": number;
      "south-fenestration-area-sunlit": number;
      "west-fenestration-area-shaded": number;
      "west-fenestration-area-sunlit": number;
      "indoor-shading": "True" | "False";
      "u-value-window": number;
      "beam-solar-heat-gain-coefficient": number;
      "diffuse-solar-heat-gain-coefficient": number;
      "beam-indoor-solar-attenuation-coefficient": number;
      "diffuse-indoor-solar-attenuation-coefficient": number;
      "lighting-type": string;
      "number-lighting": number;
      "lighting-rating": number;
      "activity-type": string;
      "activity-location": string;
      "velocity-type": string;
      "occupant-capacity": number;
      "start-hour": string;
      "end-hour": string;
      "percentage-MDHR": string;
      "infiltration-rate": number;
      "fenestration-area": number;
      "floor-area": number;
      appliances?: any[];
      "air-conditioners"?: any[];
    }[];
    batteries?: {
      title: string;
      "battery-manufacturer": string;
      "battery-class": string;
      "battery-model": string;
      "battery-length": number;
      "battery-diameter": number;
      "battery-height"?: number;
      "battery-width"?: number;
      "battery-thickness"?: number;
      "battery-mass": number;
      "battery-capacity": number;
      "battery-voltage": number;
      "battery-peak-C-rate": number;
      "battery-continous-C-rate": number;
      "average-energy-consumption": number;
      "vehicle-range": number;
      "nominal-voltage": number;
    }[];
  }[];
};
export type ConsumerStore = {
  user: UserData | null;
  token: string;
  energyAudit: EneryAuditArrayData;
  allBuildings: Buildings[] | null;
  allCountries: Country[] | null;
  allStates: State[] | null;
  allCommodities: Commodity[] | null;
  allServices: AllServices[] | null;
  solarMicroservice: SolarMicroservice | null;
  biomassMicroservice: BiomassMicroservice | null;
  isLoading: boolean;

  createConsumer: (newConsumer: CreateConsumer) => Promise<void>;
  getAllCountries: () => Promise<void>;
  getAllBuildings: (token: string | null) => Promise<void>;

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

  loginUser: (newUser: User) => Promise<void>;
  logOutUser: () => void;
};
