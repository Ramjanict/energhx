import { AllAdmin } from "./type/allAdmin";
import { AllContent } from "./type/allContent";
import { AllCourse } from "./type/allCourse";
import { AllModule, BasicContent } from "./type/allModule";
import { PaymentDataItem } from "./type/allPayment";
import { AllProgram } from "./type/allProgram";
import { WatchedContentProgress } from "./type/allProgress";
import { AllQuiz } from "./type/allquiz";
import { Country } from "./type/country";
import { Login } from "./type/login";
import { QuizSubmissionResponse } from "./type/mark";
import { Myprogram } from "./type/myProgram";
import { Quiz, QuizData } from "./type/quiz";
import { SingleContent } from "./type/singleContent";
import { SingleProgramData } from "./type/singleProgram";
import { State } from "./type/state";
import { AnswerSubmission } from "./type/SubmitQuiz";
import { UpdatePassword } from "./type/updatePassword";
import { User } from "./type/user";

export type AdminStoreType = {
  DevUser: User | null;
  DevToken: string;
  devUserType: string;
  allCountry: Country[];
  allSates: State[];
  isLoading: boolean;
  allProgram: AllProgram[];
  allCourse: AllCourse[];
  allModule: AllModule;
  allContent: AllContent;
  singleContent: SingleContent;
  allBasicContent: BasicContent[];
  myProgram: Myprogram[];
  singleProgram: SingleProgramData;
  allAdmin: AllAdmin[];
  allQuiz: AllQuiz;
  courseProgress: WatchedContentProgress;
  mark: QuizSubmissionResponse;
  allPayment: PaymentDataItem[];
  // -------------------
  // User;
  // -------------------

  userRegister: (registerUser: FormData, file?: File) => Promise<void>;
  createPassword: (userData: Login, token: string) => void;
  updatedDevPassword: (userPassword: UpdatePassword) => void;
  getDevUserType: (userType: string) => void;
  getUser: () => void;
  updateUser: (newUser: FormData, file?: File) => void;
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
  getAllBasicContent: () => Promise<void>;
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
  getSingleContent: (singleContentId: string) => Promise<void>;
  updateContent: (contentId: string, content: FormData) => Promise<void>;
  deleteContent: (contentId: string) => Promise<void>;

  // -------------------
  // Quiz;
  // -------------------

  createQuiz: (quiz: Quiz) => Promise<void>;
  getAllQuiz: (quizId: string) => Promise<void>;
  submitQuiz: (answerSheet: AnswerSubmission) => Promise<void>;
  UpdateQuiz: (quizId: string, quizData: QuizData) => Promise<void>;
  deleteQuiz: (contentId: string) => Promise<void>;

  // -------------------
  // payment
  // -------------------

  payment: (programId: string) => Promise<void>;
  getAllPayment: () => Promise<void>;

  // -------------------
  //  Add admin
  // -------------------

  addAdmin: (admin: FormData, file?: File) => Promise<void>;
  getAllAdmin: () => Promise<void>;

  // -------------------
  //  progress
  // -------------------
  setProgress: (courseId: string, singleContentId: string) => Promise<void>;
  getProgress: (courseId: string) => Promise<void>;

  // -------------------
  //  login and logout
  // -------------------

  login: (loginUser: Login) => void;
  logout: () => void;
};
