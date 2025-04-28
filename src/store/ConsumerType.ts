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
  sam_ri: number;
  sam_k: number;
  sam_thickness: number;
  substrate_ri: number;
  substrate_thickness: number;
  electrode_ri: number;
  electrode_k: number;
  electrode_thickness: number;
  photoanode_ri: number;
  photoanode_k: number;
  photoanode_thickness: number;
  dye_ri: number;
  dye_k: number;
  dye_thickness: number;
  solar_irradiance: number;
  area: number;
  num_hours: number;
  total_plug_load: number;
  sam_type: string;
  custom_sam_ri: number;
  custom_sam_k: number;
  substrate_type: string;
  custom_substrate_ri: number;
  custom_substrate_k: number;
  electrode_type: string;
  custom_electrode_ri: number;
  custom_electrode_k: number;
  custom_photoanode_ri: number;
  custom_photoanode_k: number;
  custom_dye_ri: number;
  custom_dye_k: number;
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
  email: string;
  phoneNumber: string;
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
type CoolingLoadProfile = {
  [key: number]: number;
};
interface EnergyAudit {
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
}

// Define types for the room data
interface Room {
  id: string;
  title: string;
  "cooling load": {
    "total cooling load profile": CoolingLoadProfile;
  };
  "energy audit": EnergyAudit;
}

// Define types for the optimization parameters
interface OptimalParameters {
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
}

// Define types for the energy audit, characterization, and optimization section
interface EnergyAuditOptimization {
  "Objective-Function-Value-(EUI)": number;
  "Optimal-Parameters": OptimalParameters;
  rooms: Room[];
}

// Define the structure for the full data
interface EnergyFullData {
  "Cooling Load Calculation": CoolingLoadProfile;
  "EV-Battery Sizing": any[]; // Empty array, can be populated later
  "Energy Audit, Characterization, Optimization": EnergyAuditOptimization;
  idx: string;
  title: string;
}

// Define the array of buildings data
type EneryAuditArrayData = EnergyFullData[];

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

  postSolarMicroServices: (service: PostSolarMicroServices) => Promise<void>;
  postBiomassMicroServices: (
    biomass: PostBiomassMicroServices
  ) => Promise<void>;

  loginUser: (newUser: User) => Promise<void>;
  logOutUser: () => void;
};
