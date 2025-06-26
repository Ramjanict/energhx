import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminStoreType } from "./AdminStoreType";
import { defaultSingleProgramData } from "./type/singleProgram";
import { defaultAllQuiz } from "./type/allquiz";

// Secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_LMS_URL,
});

export const useAdminStore = create<AdminStoreType>()(
  persist(
    (set, get) => ({
      DevToken: "",
      DevUser: null,
      devUserType: "",
      allCountry: [],
      allSates: [],
      allProgram: [],
      allCourse: [],
      allModule: {
        id: "",
        title: "",
        thumbnail: "",
        averageRating: 0,
        isCompleted: false,
        createdAt: "",
        updatedAt: "",
        programId: "",
        modules: [],
        basicContents: [],
      },
      allContent: {
        id: "",
        title: "",
        thumbnail: "",
        createdAt: "",
        updatedAt: "",
        courseId: "",
        contents: [],
      },
      allBasicContent: [],
      myProgram: [],
      singleProgram: defaultSingleProgramData,
      allAdmin: [],
      allQuiz: defaultAllQuiz,
      singleContent: null,
      courseProgress: {
        watchedContents: [],
        percentage: 0,
      },
      mark: null,
      allPayment: [],
      myReview: [],
      allReview: [],
      singleReview: [],
      result: [],
      calculatedMark: null,

      // ✅ Separate Loading States
      isUserRegistering: false,
      isPasswordCreating: false,
      isPasswordUpdating: false,
      isUserFetching: false,
      isUserUpdating: false,
      isCountryFetching: false,
      isStateFetching: false,
      isExperienceSubmitting: false,

      // ✅ Separate Loading States
      isProgramCreating: false,
      isProgramFetching: false,
      isProgramUpdating: false,
      isMyProgramFetching: false,
      isSingleProgramFetching: false,

      // ✅ Separate Loading States

      isCourseCreating: false,
      isCourseFetching: false,
      isCourseUpdating: false,

      // ✅ Separate Loading States

      isModuleCreating: false,
      isModuleFetching: false,
      isModuleUpdating: false,
      // ✅ Separate Loading States
      isBasicContentCreating: false,
      isBasicContentFetching: false,
      isBasicContentUpdating: false,

      // ✅ Separate Loading States
      isContentCreating: false,
      isContentFetching: false,
      isSingleContentFetching: false,
      isContentUpdating: false,
      // ✅ Separate Loading States
      isQuizCreating: false,
      isQuizFetching: false,
      isQuizUpdating: false,
      isQuizSubmitting: false,

      // ✅ Separate Loading States
      isPaymentProcessing: false,
      isPaymentFetching: false,
      // ✅ Separate Loading States
      isAdminAdding: false,
      isAdminFetchingAll: false,
      isAdminUpdating: false,
      // ✅ Separate Loading States
      isProgressSetting: false,
      isProgressFetching: false,
      isUserLoggingIn: false,
      isCertificateSubmitting: false,
      // ✅ Separate Loading States
      isReviewSubmitting: false,
      isMyReviewFetching: false,
      isMyReviewUpdate: false,
      isAllReviewFetching: false,
      isSingleReviewFetching: false,
      isResultFetching: false,
      isCalculatedMarkFetching: false,

      //------------------------
      // user async function
      //------------------------
      userRegister: async (registerUser) => {
        set({ isUserRegistering: true });
        try {
          const { data } = await axiosSecure.post(
            "/user/register",
            registerUser
          );
          if (data) {
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during Signup", error);
        } finally {
          set({ isUserRegistering: false });
        }
      },

      createPassword: async (userData, token) => {
        set({ isPasswordCreating: true });
        try {
          const { data } = await axiosSecure.post(
            `/user/create-password?token=${token}`,
            userData
          );
          if (data) {
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during Signup", error);
        } finally {
          set({ isPasswordCreating: false });
        }
      },

      updatedDevPassword: async (userPassword) => {
        set({ isPasswordUpdating: true });
        const DevToken = get().DevToken;
        try {
          if (DevToken) {
            const { data } = await axiosSecure.patch(
              `/auth/change-password`,
              userPassword,
              { headers: { Authorization: `${DevToken}` } }
            );
            if (data) {
              set({ DevUser: data.data });
              toast.success(data.message);
            }
          }
        } catch (error) {
          console.error("Problem during Signup", error);
        } finally {
          set({ isPasswordUpdating: false });
        }
      },

      getDevUserType: async (user) => {
        set({ devUserType: user });
      },

      getUser: async () => {
        set({ isUserFetching: true });
        const DevToken = get().DevToken;
        try {
          if (DevToken) {
            const { data } = await axiosSecure.get("/user/me", {
              headers: { Authorization: `${DevToken}` },
            });
            if (data) {
              set({ DevUser: data.data });
            }
          }
        } catch (error) {
          console.error("Problem during getUser:", error);
        } finally {
          set({ isUserFetching: false });
        }
      },

      updateUser: async (newUser) => {
        set({ isUserUpdating: true });
        const DevToken = get().DevToken;
        try {
          if (DevToken) {
            const { data } = await axiosSecure.patch(
              "user/update/me",
              newUser,
              { headers: { Authorization: `${DevToken}` } }
            );
            if (data) {
              set({ DevUser: data.data });
              toast.success(data.message);
            }
          }
        } catch (error) {
          console.error("Problem during updateUser:", error);
        } finally {
          set({ isUserUpdating: false });
        }
      },

      countries: async () => {
        set({ isCountryFetching: true });
        try {
          const { data } = await axiosSecure.get("/country");
          if (data) {
            set({ allCountry: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during get all country", error);
        } finally {
          set({ isCountryFetching: false });
        }
      },

      states: async (id) => {
        set({ isStateFetching: true });
        try {
          const { data } = await axiosSecure.get(`/country/${id}/states`);
          if (data) {
            set({ allSates: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during get all states", error);
        } finally {
          set({ isStateFetching: false });
        }
      },

      addExperienceServer: async (userId, experience) => {
        set({ isExperienceSubmitting: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.post(
            `/server/profile/${userId}`,
            experience,
            { headers: { Authorization: token } }
          );
          if (data) {
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during uploading document", error);
        } finally {
          set({ isExperienceSubmitting: false });
        }
      },

      addExperienceDeveloper: async (userId, experience) => {
        set({ isExperienceSubmitting: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.post(
            `/developer/profile/${userId}`,
            experience,
            { headers: { Authorization: token } }
          );
          if (data) {
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during uploading document", error);
        } finally {
          set({ isExperienceSubmitting: false });
        }
      },
      //------------------------
      // Program async function
      //------------------------

      createProgram: async (program) => {
        set({ isProgramCreating: true });
        const token = get().DevToken;
        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }
          const { data } = await axiosSecure.post("/program", program, {
            headers: { Authorization: token },
          });
          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating Program", error);
        } finally {
          set({ isProgramCreating: false });
        }
      },

      getAllProgram: async () => {
        set({ isProgramFetching: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`/program`, {
            headers: { Authorization: token },
          });
          if (data) {
            set({ allProgram: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during getting all program", error);
        } finally {
          set({ isProgramFetching: false });
        }
      },

      updateProgram: async (programId, program) => {
        set({ isProgramUpdating: true });
        const token = get().DevToken;
        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }
          const { data } = await axiosSecure.patch(
            `/program/${programId}`,
            program,
            {
              headers: { Authorization: token },
            }
          );
          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during updating Program", error);
        } finally {
          set({ isProgramUpdating: false });
        }
      },

      deleteProgram: async (programId) => {
        const token = get().DevToken;
        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }
          const { data } = await axiosSecure.delete(`/program/${programId}`, {
            headers: { Authorization: token },
          });
          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during deleting Program", error);
        } finally {
        }
      },

      getMyProgram: async () => {
        set({ isMyProgramFetching: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`/program/my-programs/all`, {
            headers: { Authorization: token },
          });
          if (data) {
            set({ myProgram: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during getting my programs", error);
        } finally {
          set({ isMyProgramFetching: false });
        }
      },

      getSingleProgram: async (programId) => {
        set({ isSingleProgramFetching: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`program/${programId}`, {
            headers: { Authorization: token },
          });
          if (data) {
            set({ singleProgram: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during getting single program", error);
        } finally {
          set({ isSingleProgramFetching: false });
        }
      },
      //------------------------
      // Course async function
      //------------------------

      createCourse: async (course) => {
        set({ isCourseCreating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post("/course", course, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating course", error);
        } finally {
          set({ isCourseCreating: false });
        }
      },

      getAllCourse: async () => {
        set({ isCourseFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get("/course", {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allCourse: data?.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching courses", error);
        } finally {
          set({ isCourseFetching: false });
        }
      },

      updateCourse: async (courseId, course) => {
        set({ isCourseUpdating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/course/${courseId}`,
            course,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during updating course", error);
        } finally {
          set({ isCourseUpdating: false });
        }
      },

      deleteCourse: async (courseId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(`/course/${courseId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during deleting course", error);
        } finally {
        }
      },

      //------------------------
      // Module async function
      //------------------------

      createModule: async (module) => {
        set({ isModuleCreating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post("/module", module, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating module", error);
        } finally {
          set({ isModuleCreating: false });
        }
      },

      // single course
      getAllModule: async (singleCourseId) => {
        set({ isModuleFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/course/${singleCourseId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allModule: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching modules", error);
        } finally {
          set({ isModuleFetching: false });
        }
      },

      updateModule: async (moduleId, module) => {
        set({ isModuleUpdating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/module/${moduleId}`,
            module,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            set({ allModule: data.data });
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during updating module", error);
        } finally {
          set({ isModuleUpdating: false });
        }
      },

      deleteModule: async (moduleId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(`/module/${moduleId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allModule: data.data });
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during deleting module", error);
        } finally {
        }
      },

      //------------------------
      // basic content for basic user async function
      // get all basic for other for admin
      //------------------------

      createBasicContent: async (basicContent) => {
        set({ isBasicContentCreating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            "/basic-content",
            basicContent,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating basic content", error);
        } finally {
          set({ isBasicContentCreating: false });
        }
      },

      getAllBasicContent: async () => {
        set({ isBasicContentFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get("/basic-content/all", {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allBasicContent: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching basic content", error);
        } finally {
          set({ isBasicContentFetching: false });
        }
      },

      updateBasicContent: async (moduleId, module) => {
        set({ isBasicContentUpdating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/basic-content/${moduleId}`,
            module,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            set({ allModule: data.data }); // ← consider updating `allBasicContent` instead?
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during updating basic content", error);
        } finally {
          set({ isBasicContentUpdating: false });
        }
      },

      deleteBasicContent: async (moduleId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(
            `/basic-content/${moduleId}`,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during deleting basic content", error);
          toast.error("Problem during delete.");
        } finally {
        }
      },

      //------------------------
      // Content async function
      //------------------------

      createContent: async (content) => {
        set({ isContentCreating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post("/content", content, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating content", error);
        } finally {
          set({ isContentCreating: false });
        }
      },

      getAllContent: async (singleModuleId) => {
        set({ isContentFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/module/${singleModuleId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allContent: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during getting all content", error);
        } finally {
          set({ isContentFetching: false });
        }
      },

      getSingleContent: async (contentId) => {
        set({ isSingleContentFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/content/${contentId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ singleContent: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during getting single content", error);
        } finally {
          set({ isSingleContentFetching: false });
        }
      },

      updateContent: async (contentId, content) => {
        set({ isContentUpdating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/content/${contentId}`,
            content,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during updating content", error);
        } finally {
          set({ isContentUpdating: false });
        }
      },

      deleteContent: async (contentId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(`/content/${contentId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during deleting content", error);
        } finally {
        }
      },

      //------------------------
      // quiz async function
      //------------------------

      createQuiz: async (quiz) => {
        set({ isQuizCreating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post("/quiz", quiz, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating quiz", error);
        } finally {
          set({ isQuizCreating: false });
        }
      },

      getAllQuiz: async (quizId) => {
        set({ isQuizFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(
            `/quiz/get-all-quizzes/${quizId}`,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            set({ allQuiz: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching quizzes", error);
        } finally {
          set({ isQuizFetching: false });
        }
      },

      UpdateQuiz: async (quizId, quizData) => {
        set({ isQuizUpdating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/quiz/${quizId}`,
            quizData,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during updating quiz", error);
        } finally {
          set({ isQuizUpdating: false });
        }
      },

      submitQuiz: async (answerSheet) => {
        set({ isQuizSubmitting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            `/quiz/submit-quiz`,
            answerSheet,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message && data?.success) {
            set({ mark: data.data });
            toast.success(data.message);
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "Something went wrong during submission.";
          toast.error(message);
          console.error("Submit quiz error:", error);
        } finally {
          set({ isQuizSubmitting: false });
        }
      },

      deleteQuiz: async (contentId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(
            `/quiz/delete-quiz/${contentId}`,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during deleting quiz", error);
        } finally {
        }
      },

      //-----------------------------------
      // makePayment
      //-----------------------------------

      payment: async (programId) => {
        set({ isPaymentProcessing: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            "/payment/checkout",
            { programId },
            {
              headers: { Authorization: token },
            }
          );

          if (data?.checkoutSession) {
            window.location.href = data.checkoutSession;
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during making Payment", error);
        } finally {
          set({ isPaymentProcessing: false });
        }
      },

      getAllPayment: async () => {
        set({ isPaymentFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get("/payment/all", {
            headers: { Authorization: token },
          });

          if (data) {
            set({ allPayment: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching payments", error);
        } finally {
          set({ isPaymentFetching: false });
        }
      },

      //-----------------------------------
      // Add Admin
      //-----------------------------------

      addAdmin: async (admin) => {
        set({ isAdminAdding: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            "/admin/add-an-admin",
            admin,
            {
              headers: { Authorization: token },
            }
          );

          if (data) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during adding admin", error);
        } finally {
          set({ isAdminAdding: false });
        }
      },

      getAllAdmin: async () => {
        set({ isAdminFetchingAll: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get("/admin", {
            headers: { Authorization: token },
          });

          if (data) {
            set({ allAdmin: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching all admins", error);
        } finally {
          set({ isAdminFetchingAll: false });
        }
      },

      updateAdmin: async (adminId, admin) => {
        set({ isAdminUpdating: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(`/admin/${adminId}`, admin, {
            headers: { Authorization: token },
          });

          if (data) {
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching update admin", error);
        } finally {
          set({ isAdminUpdating: false });
        }
      },
      deleteAdmin: async (adminId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(`/admin/${adminId}`, {
            headers: { Authorization: token },
          });

          if (data) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching delete admin", error);
        } finally {
        }
      },

      //-----------------------------------
      // progress async function
      //-----------------------------------
      setProgress: async (courseId, singleContentId) => {
        set({ isProgressSetting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            `/user/progress/${courseId}/${singleContentId}`,
            {},
            {
              headers: { Authorization: token },
            }
          );

          if (data?.success) {
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
          set({ isProgressSetting: false });
        }
      },

      getProgress: async (courseId) => {
        set({ isProgressFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/user/progress/${courseId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ courseProgress: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching progress", error);
        } finally {
          set({ isProgressFetching: false });
        }
      },

      //-----------------------------------
      // certificate async function
      //-----------------------------------
      submitCertificate: async (courseId, userId) => {
        set({ isCertificateSubmitting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            `grading/${courseId}/${userId}/certificate`,
            {},
            {
              headers: { Authorization: token },
            }
          );

          if (data?.success) {
            toast.success(data.message || "Progress saved successfully.");
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
          set({ isCertificateSubmitting: false });
        }
      },
      getResult: async (courseId, userId) => {
        set({ isCertificateSubmitting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(
            `grading/${courseId}/${userId}/results`,

            {
              headers: { Authorization: token },
            }
          );

          if (data?.success) {
            set({ result: data.data });
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
          set({ isCertificateSubmitting: false });
        }
      },
      getCalculatedMark: async (courseId, userId) => {
        set({ isCertificateSubmitting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(
            `grading/${courseId}/${userId}`,

            {
              headers: { Authorization: token },
            }
          );
          if (data?.success) {
            set({ calculatedMark: data });
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
          set({ isCertificateSubmitting: false });
        }
      },
      //-----------------------------------
      // Review async function
      //-----------------------------------
      AddReview: async (review) => {
        set({ isReviewSubmitting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(`/review`, review, {
            headers: { Authorization: token },
          });

          if (data?.success) {
            toast.success(data.message || "Progress saved successfully.");
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
          set({ isReviewSubmitting: false });
        }
      },
      getMyReview: async () => {
        set({ isMyReviewFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/review/my-reviews`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ myReview: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching review", error);
        } finally {
          set({ isMyReviewFetching: false });
        }
      },
      updateMyReview: async (reviewId, review) => {
        set({ isReviewSubmitting: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/review/${reviewId}`,
            review,
            {
              headers: { Authorization: token },
            }
          );

          if (data?.success) {
            set({ myReview: data.data });
            toast.success(data.message || "Progress saved successfully.");
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
          set({ isReviewSubmitting: false });
        }
      },
      deleteMyReview: async (reviewId) => {
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(`/review/${reviewId}`, {
            headers: { Authorization: token },
          });

          if (data?.success) {
            toast.success(data.message || "Progress saved successfully.");
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            "This content is locked. Please complete previous contents first";
          toast.error(message);
          console.error("Set progress error:", error);
        } finally {
        }
      },
      getAllReview: async () => {
        set({ isMyReviewFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/review`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allReview: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching review", error);
        } finally {
          set({ isMyReviewFetching: false });
        }
      },
      getSingleReview: async (courseId) => {
        set({ isMyReviewFetching: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/review/course/${courseId}`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ singleReview: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during fetching review", error);
        } finally {
          set({ isMyReviewFetching: false });
        }
      },

      //-----------------------------------
      // login and logout async function
      //-----------------------------------

      login: async (loginUser) => {
        set({ isUserLoggingIn: true });

        try {
          const { data } = await axiosSecure.post("/auth/login", loginUser);

          if (data?.data?.accessToken) {
            set({ DevToken: data.data.accessToken });
            toast.success(data.message || "Login successful");
          } else if (data?.error) {
            toast.error(data.message || "Invalid credentials.");
          }
        } catch (error: any) {
          console.error("Problem during login", error);
        } finally {
          set({ isUserLoggingIn: false });
        }
      },
      logout: () => {
        set({ DevToken: "", DevUser: null });
        toast.success("Logged out successfully.");
      },
    }),

    {
      name: "user",
      partialize: (state) => ({
        DevToken: state.DevToken,
        DevUser: state.DevUser,
      }),
    }
  )
);
