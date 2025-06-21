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
      isLoading: false,
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
      //------------------------
      // user async function
      //------------------------

      userRegister: async (registerUser) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.post(
            "/user/register",
            registerUser
          );

          if (data) {
            set({ isLoading: false });
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during Signup", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      createPassword: async (userData, token) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.post(
            `/user/create-password?token=${token}`,
            userData
          );

          if (data) {
            set({ isLoading: false });
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during Signup", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updatedDevPassword: async (userPassword) => {
        set({ isLoading: true });
        const DevToken = get().DevToken;
        try {
          if (DevToken) {
            const { data } = await axiosSecure.patch(
              `/auth/change-password`,
              userPassword,
              {
                headers: { Authorization: `${DevToken}` },
              }
            );

            if (data) {
              set({ DevUser: data.data });
              toast.success(data.message);
            }
          }
        } catch (error) {
          console.error("Problem during Signup", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      getDevUserType: async (user) => {
        set({ devUserType: user });
      },
      getUser: async () => {
        set({ isLoading: true });
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
        } catch (error: any) {
          console.error("Problem during getUser:", error);
        } finally {
          set({ isLoading: false });
        }
      },
      updateUser: async (newUser) => {
        set({ isLoading: true });
        const DevToken = get().DevToken;

        try {
          if (DevToken) {
            const { data } = await axiosSecure.patch(
              "user/update/me",
              newUser,
              {
                headers: { Authorization: `${DevToken}` },
              }
            );

            if (data) {
              set({ DevUser: data.data });
              toast.success(data.message);
            }
          }
        } catch (error: any) {
          console.error("Problem during getUser:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      countries: async () => {
        set({ isLoading: true });

        try {
          const { data } = await axiosSecure.get("/country");

          if (data) {
            set({ allCountry: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during  get all country", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      states: async (id) => {
        set({ isLoading: true });

        try {
          const { data } = await axiosSecure.get(`/country/${id}/states`);

          if (data) {
            set({ allSates: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during  get all country", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      addExperienceServer: async (userId, experience) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          const { data } = await axiosSecure.post(
            `/server/profile/${userId}`,
            experience,
            { headers: { Authorization: token } }
          );

          if (data) {
            set({ isLoading: false });
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during  Uploading document", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      addExperienceDeveloper: async (userId, experience) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          const { data } = await axiosSecure.post(
            `/developer/profile/${userId}`,
            experience,
            { headers: { Authorization: token } }
          );

          if (data) {
            set({ isLoading: false });
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during  Uploading document", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      //------------------------
      // Program async function
      //------------------------

      createProgram: async (program) => {
        set({ isLoading: true });
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
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllProgram: async () => {
        set({ isLoading: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`/program`, {
            headers: { Authorization: token },
          });

          if (data) {
            set({ isLoading: false, allProgram: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during getting all program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updateProgram: async (programId, program) => {
        set({ isLoading: true });
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
          console.error("Problem during creating Program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteProgram: async (programId) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(
            `/program/${programId}`,

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
          console.error("Problem during creating Program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getMyProgram: async () => {
        set({ isLoading: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`/program/my-programs/all`, {
            headers: { Authorization: token },
          });

          if (data) {
            set({ isLoading: false, myProgram: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during getting all program", error);
        } finally {
          set({ isLoading: false });
        }
      },
      getSingleProgram: async (programId) => {
        set({ isLoading: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`program/${programId}`, {
            headers: { Authorization: token },
          });

          if (data) {
            set({ isLoading: false, singleProgram: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during getting all program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      //------------------------
      // Course async function
      //------------------------

      createCourse: async (course) => {
        set({ isLoading: true });
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
          console.error("Problem during creating Program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllCourse: async () => {
        set({ isLoading: true });
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
          console.error("Problem during creating Program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updateCourse: async (courseId, course) => {
        set({ isLoading: true });
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
          console.error("Problem during creating Program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteCourse: async (courseId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating Program", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      //------------------------
      // Module async function
      //------------------------

      createModule: async (module) => {
        set({ isLoading: true });
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
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllModule: async (singleCourseId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updateModule: async (moduleId, module) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteModule: async (moduleId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      //------------------------
      // basic content for basic user async function
      // get all basic for other for admin
      //------------------------

      createBasicContent: async (basicContent) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllBasicContent: async () => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(`/basic-content/all`, {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allBasicContent: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updateBasicContent: async (moduleId, module) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch(
            `/basic-conten/${moduleId}`,
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteBasicContent: async (moduleId) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.delete(
            `/basic-conten/${moduleId}`,
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
          console.error("Problem during  delete", error);
          toast.error("Problem during  delete.");
        } finally {
          set({ isLoading: false });
        }
      },

      //------------------------
      // Content async function
      //------------------------

      createContent: async (content) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllContent: async (singleModuleId) => {
        set({ isLoading: true });
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
          console.error("Problem during getting module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getSingleContent: async (contentId) => {
        set({ isLoading: true });
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
          console.error("Problem during getting module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updateContent: async (contentId, content) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteContent: async (contentId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      //------------------------
      // quiz async function
      //------------------------

      createQuiz: async (quiz) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllQuiz: async (quizId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
        } finally {
          set({ isLoading: false });
        }
      },
      UpdateQuiz: async (quizId, quizData) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
        } finally {
          set({ isLoading: false });
        }
      },
      submitQuiz: async (answerSheet) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post(
            `quiz/submit-quiz`,
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
          set({ isLoading: false });
        }
      },

      deleteQuiz: async (contentId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
        } finally {
          set({ isLoading: false });
        }
      },

      //-----------------------------------
      // makePayment
      //-----------------------------------
      payment: async (programId) => {
        set({ isLoading: true });
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

          if (data) {
            window.location.href = data.checkoutSession;
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during making  Payment", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllPayment: async () => {
        set({ isLoading: true });
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
          console.error("Problem during making  Payment", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      //-----------------------------------
      // Add Admin
      //-----------------------------------

      addAdmin: async (admin) => {
        set({ isLoading: true });
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
          console.error("Problem during making  Payment", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      getAllAdmin: async () => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get(
            "/admin",

            {
              headers: { Authorization: token },
            }
          );

          if (data) {
            set({ allAdmin: data.data });
          } else if (data?.error) {
            toast.error(data.message || "An error occurred.");
          }
        } catch (error) {
          console.error("Problem during making  Payment", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      //-----------------------------------
      // progress async function
      //-----------------------------------

      setProgress: async (courseId, singleContentId) => {
        set({ isLoading: true });
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
          set({ isLoading: false });
        }
      },

      getProgress: async (courseId) => {
        set({ isLoading: true });
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
          console.error("Problem during creating module", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      //-----------------------------------
      // login and logout async function
      //-----------------------------------

      login: async (loginUser) => {
        set({ isLoading: true });

        try {
          const { data } = await axiosSecure.post("/auth/login", loginUser);

          if (data) {
            set({ DevToken: data.data.accessToken });
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during login", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ DevToken: "", DevUser: null });
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
