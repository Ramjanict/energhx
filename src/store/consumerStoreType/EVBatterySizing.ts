export interface EVBatterySizing {
  buildingId: string;
  chargerModel: string;
  powerRating: string;
  noOfEvs: string;
  chargingHours: string;
  name: string;
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
  "battery-capacity": number;
  "battery-voltage": number;
  "battery-peak-C-rate": number;
  "battery-continous-C-rate": number;
  "average-energy-consumption": number;
  "vehicle-range": number;
  "nominal-voltage": number;
}
