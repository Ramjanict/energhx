// types/FormData.ts
export interface FormDataType {
  building_name: string;
  type: string;
  subBuilding: string;
  location: string;
  longLat: string;
  indoorTemperature: string;
  indoorRelativeHumidity: string;
  noOfPeople: string;
  country: string;
  streetNumber: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  numberOfOccupants: string;
  commodities: {
    type: string;
    utilityCompany: {
      id: string;
      country: string;
      state: string;
      accountNumber: string;
      accountName: string;
      acceptTermsAndConditions: boolean;
      phoneNumber: string;
      units: string;
    };
  }[];
  floorLength: string;
  floorBreath: string;
  floorType: string;
  roofLength: string;
  roofWidth: string;
  roofType: string;
}
