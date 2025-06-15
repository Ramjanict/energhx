import { AllContent } from "./type/allContent";
import { AllCourse } from "./type/allCourse";
import { AllModule } from "./type/allModule";
import { allProgram } from "./type/allProgram";
import { Country } from "./type/country";
import { Login } from "./type/login";
import { Myprogram } from "./type/myProgram";
import { Quiz } from "./type/quiz";
import { SingleProgramData } from "./type/singleProgram";
import { State } from "./type/state";
import { User } from "./type/user";

export type AdminStoreType = {
  DevUser: User | null;
  DevToken: string;
  devUserType: string;
  allCountry: Country[];
  allSates: State[];
  isLoading: boolean;
  allProgram: allProgram[];
  allCourse: AllCourse[];
  allModule: AllModule;
  allContent: AllContent;
  myProgram: Myprogram[];
  singleProgram: SingleProgramData;

  // -------------------
  // User;
  // -------------------

  userRegister: (registerUser: FormData, file?: File) => Promise<void>;
  createPassword: (userData: Login, token: string) => void;
  getDevUserType: (userType: string) => void;
  getUser: () => void;
  addExperienceServer: (userId: string, experience: FormData) => void;
  addExperienceDeveloper: (userId: string, experience: FormData) => void;
  countries: () => void;
  states: (id: string) => void;

  // -------------------
  // program;
  // -------------------

  createProgram: (program: FormData) => Promise<void>;
  updateProgram: (programId: string, program: FormData) => Promise<void>;
  deleteProgram: (programId: string) => Promise<void>;
  getAllProgram: () => void;
  getMyProgram: () => void;
  getSingleProgram: (programId: string) => void;

  // -------------------
  // course;
  // -------------------

  createCourse: (course: FormData) => Promise<void>;
  getAllCourse: () => Promise<void>;
  updateCourse: (courseId: string, course: FormData) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;

  // -------------------
  // Module;
  // -------------------

  createModule: (module: FormData) => Promise<void>;
  getAllModule: (singleCourseId: string) => Promise<void>;
  updateModule: (updateModule: string, module: FormData) => Promise<void>;
  deleteModule: (updateModule: string) => Promise<void>;

  // -------------------
  // Basic Content;
  // -------------------

  createBasicContent: (basicContent: FormData) => Promise<void>;
  getAllBasicContent: (singleCourseId: string) => Promise<void>;
  updateBasicContent: (
    basicContentId: string,
    basicContent: FormData
  ) => Promise<void>;
  deleteBasicContent: (basicContentId: string) => Promise<void>;

  // -------------------
  // Content;
  // -------------------
  createContent: (content: FormData) => Promise<void>;
  getAllContent: (singleModuleId: string) => Promise<void>;
  updateContent: (contentId: string, content: FormData) => Promise<void>;
  deleteContent: (contentId: string) => Promise<void>;

  // -------------------
  // Quiz;
  // -------------------

  createQuiz: (quiz: Quiz) => Promise<void>;

  // -------------------
  // payment
  // -------------------

  payment: (programId: string) => Promise<void>;

  // -------------------
  //  login and logout
  // -------------------

  login: (loginUser: Login) => void;
  logout: () => void;
};
