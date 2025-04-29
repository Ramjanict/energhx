// types/buildings.ts
export interface BuildingType {
  building_name: string;
  building_type?: { building_type_id: string; name?: string };
  building_sub_type?: { name: string };
  user_building_utility: { utility_name: string; utility_type: string }[];
}
