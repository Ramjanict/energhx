type EVBatterySizing = {
  id: string;
  chargerModelId: string;
  name: string;
  power_rating: string; // string, e.g. "40"
  charging_hours: string; // string, e.g. "5"
  no_of_ev: string; // string, e.g. "3"
  user_building_details_id: string;
  title: string;
  battery_manufacturer: string;
  battery_class: string;
  battery_model: string;
  battery_length: number;
  battery_diameter: number;
  battery_height: number;
  battery_width: number;
  battery_thickness: number;
  battery_mass: number;
  battery_capacity: number;
  battery_voltage: number;
  battery_peak_C_rate: number;
  battery_continous_C_rate: number;
  average_energy_consumption: number;
  vehicle_range: number;
  nominal_voltage: number;
};

export type AllBattery = {
  data: EVBatterySizing[];
};
