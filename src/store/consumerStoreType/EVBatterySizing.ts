export type EVBatterySizing = {
  title: string;
  "battery-manufacturer": string;
  "battery-class": string;
  "battery-model": string;
  "battery-length": number;
  "battery-diameter": number;
  "battery-height": number;
  "battery-width": number;
  "battery-thickness": number;
  "battery-mass": number;
  "battery-capacity": number; // in Ah
  "battery-voltage": number; // in V
  "battery-peak-C-rate": number;
  "battery-continous-C-rate": number;
  "average-energy-consumption": number; // in Wh/km
  "vehicle-range": number; // in km
  "nominal-voltage": number; // in V
};
