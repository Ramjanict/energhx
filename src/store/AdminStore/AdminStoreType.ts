import { AllCourse } from "./type/allCourse";
import { AllModule } from "./type/allModule";
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
  allModule: AllModule;

  // ------------------------------program--------------------------------------//

  createProgram: (program: Program) => Promise<void>;
  updateProgram: (programId: string, program: Program) => Promise<void>;
  deleteProgram: (programId: string) => Promise<void>;
  getAllProgram: () => void;

  // ----------------------------course-------------------------------------//

  createCourse: (course: Course) => Promise<void>;
  getAllCourse: () => Promise<void>;
  updateCourse: (courseId: string, course: Course) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;

  //----------------------- module--------------------------------------//

  createModule: (module: Module) => Promise<void>;
  getAllModule: (singleCourseId: string) => Promise<void>;
  updateModule: (updateModule: string, module: Module) => Promise<void>;
  deleteModule: (updateModule: string) => Promise<void>;

  //------------------  //Content ----------------------------------//

  createContent: (content: Module) => Promise<void>;
  getAllContent: (content: Module) => Promise<void>;
  updateContent: (content: Module) => Promise<void>;
  deleteContent: (content: Module) => Promise<void>;

  //admin  login and logout
  adminLogin: (loginUser: Login) => void;
  adminLogout: () => void;
};
