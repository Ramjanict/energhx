import { State } from "./States";

export type Country = {
  name: string;
  code: string;
  id: string;
  states: State[];
};
