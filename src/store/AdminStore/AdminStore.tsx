import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminStoreType } from "./AdminStoreType";

// Secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_LMS_URL,
});

export const useAdminStore = create<AdminStoreType>()(
  persist(
    (set, get) => ({
      allSates: [],
      DevToken: "",
      DevUser: null,
      isLoading: false,
      allProgram: [],
      allCourse: [],
      allModule: [],

      // Program async function
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

      getAllProgram: async () => {
        set({ isLoading: true });
        const token = get().DevToken;
        try {
          const { data } = await axiosSecure.get(`/program`, {
            headers: { Authorization: token },
          });

          if (data) {
            set({ isLoading: false, allProgram: data.data });
            toast.success(data.message);
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

      // Course async function
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
      updateCourse: async (program) => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.patch("/program", program, {
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

      // Module async function
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
      getAllModule: async () => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get("/module", {
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
      // Content async function
      createContent: async (module) => {
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

      // login and logout async function
      adminLogin: async (loginUser) => {
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
      adminLogout: () => {
        set({ DevToken: "", DevUser: null });
        toast.success("Admin logout successfully");
      },
    }),

    {
      name: "user",
      partialize: (state) => ({
        DevToken: state.DevToken,
        user: state.DevUser,
      }),
    }
  )
);
