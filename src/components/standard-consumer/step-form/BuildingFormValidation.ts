import { z } from "zod";

export const RoomSchema = z.object({
  building_name: z.string().min(1, "Building Name is required"),
  location: z.string().min(1, "Location is required"),
  longLat: z.string().min(1, "Longitude & Latitude is required"),
});

export const BuildingSchema = z.object({
  indoorTemperature: z.string().min(1, "Indoor temperature is required"),
  indoorRelativeHumidity: z
    .string()
    .min(1, "Indoor Relative Humidity is required"),
  noOfPeople: z.string().min(1, "No of People is required"),
});

export const buildingInformation1Schema = z.object({
  type: z.string().nonempty("Building type is required"),
  subBuilding: z.string().nonempty("Sub Building type is required"),
  country: z.string().nonempty("Country is required"),
  streetNumber: z.string().nonempty("Street Number is required"),
  streetAddress: z.string().nonempty("Street Address is required"),
  city: z.string().nonempty("City/State is required"),
  postalCode: z.string().nonempty("Postal Code is required"),
  numberOfOccupants: z
    .string()
    .nonempty("Number of Occupants is required")
    .regex(/^\d+$/, "Must be a valid number"),
  commodities: z
    .array(
      z.object({
        type: z.string().nonempty("Commodity type is required"),
        utilityCompany: z.object({
          id: z.string(),
          country: z.string(),
          state: z.string(),
          accountNumber: z.string(),
          accountName: z.string(),
          acceptTermsAndConditions: z.boolean(),
          phoneNumber: z.string(),
          units: z.string(),
        }),
      })
    )
    .optional(),
});

export const buildingInformation2Schema = z.object({
  id: z.string().nonempty("Utility selection is required"),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^[0-9+()\s-]{7,15}$/, "Invalid phone number format"),
  accountName: z.string().nonempty("Account name is required"),
  accountNumber: z
    .string()
    .nonempty("Account number is required")
    .regex(/^\d+$/, "Account number must be numeric"),
  units: z
    .string()
    .nonempty("Units are required")
    .regex(/^\d+$/, "Units must be a number"),
  acceptTermsAndConditions: z.literal(true).refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const buildingInformation3Schema = z.object({
  roofLength: z
    .string()
    .nonempty("Roof length is required")
    .regex(/^\d+$/, "Roof length must be a number"),
  roofWidth: z
    .string()
    .nonempty("Roof width is required")
    .regex(/^\d+$/, "Roof width must be a number"),
  roofType: z.string().nonempty("Roof type is required"),
});

export const buildingInformation4Schema = z.object({
  floorLength: z
    .string()
    .nonempty("Floor length is required")
    .regex(/^\d+$/, "Floor length must be a number"),
  floorBreath: z
    .string()
    .nonempty("Floor breath is required")
    .regex(/^\d+$/, "Floor breath must be a number"),
  floorType: z.string().nonempty("Floor type is required"),
});
