import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { ServerStoreType } from "./ServerStoreType";

// Secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_LMS_URL,
});

export const useServerStore = create<ServerStoreType>()(
  persist(
    (set, get) => ({
      DevUser: null,
      userType: "",
      DevToken: "",
      isLoading: false,
      allCountry: [],
      allSates: [],
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
        set({ userType: user });
      },
      getUser: async () => {
        set({ isLoading: true });
        const DevToken = get().DevToken;
        try {
          const { data } = await axiosSecure.get("/user/me", {
            headers: { Authorization: `${DevToken}` },
          });

          if (data) {
            set({ DevUser: data.data });
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
      partialize: (state) => ({ token: state.DevToken, user: state.DevUser }),
    }
  )
);
