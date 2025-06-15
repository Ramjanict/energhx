type SubBuildings = {
  name: string;
  id: string;
};

export type BuildingsTypes = {
  name: string;
  id: string;
  subBuildings: SubBuildings[];
};
