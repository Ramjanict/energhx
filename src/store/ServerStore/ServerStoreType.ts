import { Register } from "react-router-dom";
import { Login } from "./type/login";
import { Country } from "./type/country";
import { State } from "../consumerStoreType/States";
import { User } from "./type/user";

export type ServerStoreType = {
  DevUser: User | null;
  userType: string;
  DevToken: string;
  isLoading: boolean;
  allCountry: Country[];
  allSates: State[];
  userRegister: (registerUser: Register) => void;
  createPassword: (userData: Login, token: string) => void;
  getUser: () => void;
  getDevUserType: (userType: string) => void;
  countries: () => void;
  states: (id: string) => void;
  login: (loginUser: Login) => void;
  logout: () => void;
};
