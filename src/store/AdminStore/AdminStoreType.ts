import { AllAdmin } from "./type/allAdmin";
import { AllContent } from "./type/allContent";
import { AllCourse } from "./type/allCourse";
import { AllModule, BasicContent } from "./type/allModule";
import { PaymentDataItem } from "./type/allPayment";
import { AllProgram } from "./type/allProgram";
import { WatchedContentProgress } from "./type/allProgress";
import { AllQuiz } from "./type/allquiz";
import {
  AveragePercentageResponse,
  CertificateContent,
} from "./type/certificated";
import { Country } from "./type/country";
import { Login } from "./type/login";
import { QuizSubmissionResponse } from "./type/mark";
import { Myprogram } from "./type/myProgram";
import { AllReview, MyReview, SingleReview } from "./type/myReview";
import { Quiz, QuizData } from "./type/quiz";
import { Review } from "./type/review";
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
  myReview: MyReview[];
  allReview: AllReview[];
  singleReview: SingleReview[];
  result: CertificateContent[];
  calculatedMark: AveragePercentageResponse | null;

  // ✅ Separate Loading States
  isUserRegistering: boolean;
  isPasswordCreating: boolean;
  isPasswordUpdating: boolean;
  isUserFetching: boolean;
  isUserUpdating: boolean;
  isCountryFetching: boolean;
  isStateFetching: boolean;
  isExperienceSubmitting: boolean;
  isProgramCreating: boolean;
  isProgramFetching: boolean;
  isProgramUpdating: boolean;
  isMyProgramFetching: boolean;
  isSingleProgramFetching: boolean;
  isCourseCreating: boolean;
  isCourseFetching: boolean;
  isCourseUpdating: boolean;
  isModuleCreating: boolean;
  isModuleFetching: boolean;
  isModuleUpdating: boolean;
  isBasicContentCreating: boolean;
  isBasicContentFetching: boolean;
  isBasicContentUpdating: boolean;
  isContentCreating: boolean;
  isContentFetching: boolean;
  isSingleContentFetching: boolean;
  isContentUpdating: boolean;
  isQuizCreating: boolean;
  isQuizFetching: boolean;
  isQuizUpdating: boolean;
  isQuizSubmitting: boolean;
  isPaymentProcessing: boolean;
  isPaymentFetching: boolean;
  isAdminAdding: boolean;
  isAdminFetchingAll: boolean;
  isAdminUpdating: boolean;
  isProgressSetting: boolean;
  isProgressFetching: boolean;
  isUserLoggingIn: boolean;
  isCertificateSubmitting: boolean;
  isReviewSubmitting: boolean;
  isMyReviewFetching: boolean;
  isMyReviewUpdate: boolean;
  isAllReviewFetching: boolean;
  isSingleReviewFetching: boolean;
  isResultFetching: boolean;
  isCalculatedMarkFetching: boolean;

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
  updateAdmin: (adminId: string, admin: FormData) => Promise<void>;
  deleteAdmin: (adminId: string) => Promise<void>;
  getAllAdmin: () => Promise<void>;

  // -------------------
  //  progress
  // -------------------
  setProgress: (courseId: string, singleContentId: string) => Promise<void>;
  getProgress: (courseId: string) => Promise<void>;

  // -------------------
  //  certificate
  // -------------------

  submitCertificate: (courseId: string, userId: string) => Promise<void>;
  getResult: (courseId: string, userId: string) => Promise<void>;
  getCalculatedMark: (courseId: string, userId: string) => Promise<void>;

  // -------------------
  //  Review
  // -------------------

  AddReview: (review: Review) => Promise<void>;
  getMyReview: () => Promise<void>;
  getAllReview: () => Promise<void>;
  getSingleReview: (courseId: string) => Promise<void>;
  updateMyReview: (reviewId: string, review: Review) => Promise<void>;
  deleteMyReview: (reviewId: string) => Promise<void>;

  // -------------------
  //  login and logout
  // -------------------

  login: (loginUser: Login) => void;
  logout: () => void;
};
