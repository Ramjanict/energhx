type Commodity = {
  name: string;
  updatedAt: string;
  id: string;
  createdAt: string;
};
type State = {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
};
export type AllServices = {
  name: string;
  updatedAt: string;
  id: string;
  commodity: Commodity[];
  termsAndConditionFilePath: string | null;
  priceComparisonFilePath: string | null;
  country_id: string;
  states: State[];
  createdAt: string;
};
