// store/useFormStore.ts

import { FormDataType } from "@/types/FormData";
import { create } from "zustand";

interface FormStore {
  formData: FormDataType;
  updateFormData: (newData: Partial<FormDataType>) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {
    building_name: "",
    type: "",
    subBuilding: "",
    location: "",
    longLat: "",
    indoorTemperature: "",
    indoorRelativeHumidity: "",
    noOfPeople: "",
    country: "",
    streetNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    numberOfOccupants: "",
    commodities: [],
    floorLength: "",
    floorBreath: "",
    floorType: "",
    roofLength: "",
    roofWidth: "",
    roofType: "",
  },
  updateFormData: (newData) =>
    set((state) => ({ formData: { ...state.formData, ...newData } })),
}));
