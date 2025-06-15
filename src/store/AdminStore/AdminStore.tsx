import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminStoreType } from "./AdminStoreType";
import { defaultSingleProgramData } from "./type/singleProgram";

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
      myProgram: [],
      singleProgram: defaultSingleProgramData,
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
          toast.error("Something went wrong. Please try again.");
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
      //------------------------

      createBasicContent: async (basicContent) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.post("/basic-content", basicContent, {
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
      getAllBasicContent: async (singleCourseId) => {
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
      updateBasicContent: async (moduleId, module) => {
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
      deleteBasicContent: async (moduleId) => {
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
