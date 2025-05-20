import { create } from "zustand";
import { BuildingType } from "@/types/buildingType";

interface BuildingStore {
  buildings: BuildingType[];
  selectedBuilding: BuildingType | null;
  setBuildings: (buildings: BuildingType[]) => void;
  setSelectedBuilding: (building: BuildingType) => void;
}

export const useBuildingStore = create<BuildingStore>((set) => ({
  buildings: [],
  selectedBuilding: null,

  setBuildings: (buildings) => set({ buildings }),

  setSelectedBuilding: (building) => set({ selectedBuilding: building }),
}));
