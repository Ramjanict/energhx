import { Login } from "../AdminStore/type/login";
import { User } from "../AdminStore/type/user";
import { AllProgram } from "./type/allProgram";

export type LmsStoreType = {
  DevUser: User | null;
  DevToken: string;
  isLoading: boolean;
  allProgram: AllProgram[];

  getAllProgram: () => Promise<void>;
  login: (loginUser: Login) => void;
  logout: () => void;
};
