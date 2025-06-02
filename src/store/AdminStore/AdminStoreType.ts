import { AllCourse } from "./type/allCourse";
import { allProgram } from "./type/allProgram";
import { Course } from "./type/course";
import { Login } from "./type/login";
import { Module } from "./type/module";
import { Program } from "./type/program";
import { User } from "./type/user";

export type AdminStoreType = {
  DevUser: User | null;
  DevToken: string;
  isLoading: boolean;
  allProgram: allProgram[];
  allCourse: AllCourse[];
  allModule: AllCourse[];

  // program
  createProgram: (program: Program) => Promise<void>;
  updateProgram: (programId: string, program: Program) => Promise<void>;
  deleteProgram: (programId: string) => Promise<void>;
  getAllProgram: () => void;

  // course
  createCourse: (course: Course) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  getAllCourse: () => Promise<void>;
  // module
  createModule: (module: Module) => Promise<void>;
  getAllModule: () => Promise<void>;
  //Content
  createContent: (content: Module) => Promise<void>;

  //admin  login and logout
  adminLogin: (loginUser: Login) => void;
  adminLogout: () => void;
};
