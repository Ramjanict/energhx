import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { LmsStoreType } from "./LmsStoreType";

// Secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_LMS_URL,
});

export const useLmsStore = create<LmsStoreType>()(
  persist(
    (set, get) => ({
      DevUser: null,
      DevToken: "",
      isLoading: false,
      allProgram: [],

      //------------------------
      // program async function
      //------------------------

      getAllProgram: async () => {
        set({ isLoading: true });
        const token = get().DevToken;

        try {
          if (!token) {
            toast.error("Authentication token is missing.");
            return;
          }

          const { data } = await axiosSecure.get("/program/my-programs/all", {
            headers: { Authorization: token },
          });

          if (data?.message) {
            set({ allProgram: data.data });
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
