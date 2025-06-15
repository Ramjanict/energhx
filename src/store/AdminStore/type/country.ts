type State = {
  id: string;
  name: string;
  countryId: string;
};

export type Country = {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  states: State[];
};
