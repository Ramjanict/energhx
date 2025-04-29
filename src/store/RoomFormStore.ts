import { RoomFormDataType } from "@/types/RoomFormData";
import { create } from "zustand";

interface RoomFormStore {
  roomFormData: RoomFormDataType;
  updateRoomFormData: (newData: Partial<RoomFormDataType>) => void;
}

export const useRoomFormStore = create<RoomFormStore>((set) => ({
  roomFormData: {
    buildingId: "",
    title: "",
    construction: "",
    "construction-subtype": "",
    "percentage-glass": "",
    "wall-type": "",
    city: "",
    month: "",
    "percentage-MDDB": "",
    LSM: 0,
    "north-wall-area": 0,
    "east-wall-area": 0,
    "south-wall-area": 0,
    "west-wall-area": 0,
    "roof-type": "",
    "roof-area": 0,
    "north-fenestration-area-shaded": 0,
    "north-fenestration-area-sunlit": 0,
    "east-fenestration-area-shaded": 0,
    "east-fenestration-area-sunlit": 0,
    "south-fenestration-area-shaded": 0,
    "south-fenestration-area-sunlit": 0,
    "west-fenestration-area-shaded": 0,
    "west-fenestration-area-sunlit": 0,
    "indoor-shading": "",
    "u-value-window": 0,
    "beam-solar-heat-gain-coefficient": 0,
    "diffuse-solar-heat-gain-coefficient": 0,
    "beam-indoor-solar-attenuation-coefficient": 0,
    "diffuse-indoor-solar-attenuation-coefficient": 0,
    "lighting-type": "",
    "number-lighting": 0,
    "lighting-rating": 0,
    "activity-type": "",
    "activity-location": "",
    "velocity-type": "",
    "occupant-capacity": 0,
    "start-hour": "",
    "end-hour": "",
    "percentage-MDHR": "",
    "infiltration-rate": 0,
    "fenestration-area": 0,
    "floor-area": 0,
  },
  updateRoomFormData: (newData: Partial<RoomFormDataType>) =>
    set((state) => ({
      roomFormData: {
        ...state.roomFormData,
        ...newData,
      },
    })),
}));
