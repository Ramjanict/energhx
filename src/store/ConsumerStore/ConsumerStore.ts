import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { ConsumerStoreType } from "./ConsumerStoreType";
// Secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const useConsumerStore = create<ConsumerStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      userType: "",
      token: "",
      energyAudit: [],
      allBuildings: [],
      allBuildingsTypes: null,
      allCountries: null,
      allStates: null,
      allCommodities: null,
      allServices: null,
      solarMicroservice: null,
      biomassMicroservice: null,
      isLoading: false,
      allBatteryType: [],
      allBattery: [],

      createConsumer: async (newConsumer) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.post("/auth", newConsumer);

          if (data) {
            set({ isLoading: false });
            toast.success("A confirmation email has been sent to your account");
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
      getUserType: async (user) => {
        set({
          userType: { userType: user, userRole: "USER" },
        });
      },

      getAllCountries: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.get("/countries");
          if (data) {
            set({ allCountries: data.data });
          }
        } catch (error) {
          console.error("Error fetching countries", error);
        } finally {
          set({ isLoading: false });
        }
      },
      getAllStates: async (id) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.get(`/countries/${id}/states`);
          if (data) {
            set({ allStates: data.data });
          }
        } catch (error) {
          console.error("Error fetching states", error);
          toast.error("Unable to fetch states.");
        } finally {
          set({ isLoading: false });
        }
      },

      getAllCommodities: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.get(`/commodities`);
          if (data) {
            set({ allCommodities: data.data });
          }
        } catch (error) {
          console.error("Error fetching commodities", error);
          toast.error("Unable to fetch commodities.");
        } finally {
          set({ isLoading: false }); // End loading
        }
      },

      getAllServices: async (countryId, stateId, commodityId) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.get(
            `/countries/${countryId}/state/${stateId}/commodities/${commodityId}/utilities`
          );
          if (data) {
            set({ allServices: data.data });
          }
        } catch (error) {
          console.error("Error fetching services", error);
          toast.error("Unable to fetch services.");
        } finally {
          set({ isLoading: false });
        }
      },

      //all users Buildings
      getAllBuildings: async () => {
        const token = get().token;
        if (!token) {
          toast.error("Token is required to fetch building types.");
          return;
        }

        set({ isLoading: true });

        try {
          const { data } = await axiosSecure.get("/users/buildings", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("building data in store", data);

          if (data && data.data) {
            set({ allBuildings: data.data });
          }
        } catch (error: any) {
          console.error("Problem fetching buildings", error);
          toast.error("Unable to fetch building types.");
        } finally {
          set({ isLoading: false });
        }
      },

      //building types
      getAllBuildingsTypes: async () => {
        const token = get().token;
        if (!token) {
          toast.error("Token is required to fetch building types.");
          return;
        }

        set({ isLoading: true });

        try {
          const { data } = await axiosSecure.get("/buildings/types", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("building data in store", data);

          if (data && data.data) {
            set({ allBuildingsTypes: data.data });
          }
        } catch (error: any) {
          console.error("Problem fetching buildings", error);
          toast.error("Unable to fetch building types.");
        } finally {
          set({ isLoading: false });
        }
      },
      AddRoomWithBuilding: async (room) => {
        const token = get().token;
        if (!token) {
          toast.error("Token is required to fetch building types.");
          return;
        }
        set({ isLoading: true });
        try {
          const { data } = await axiosSecure.post("/buildings/room", room, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data) {
            toast.success(data.message);
            set({ user: data.data, isLoading: false });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during creating Room", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      //microservices
      postEnergyAudit: async (energyAudit) => {
        set({ isLoading: true });

        try {
          const token = get().token;
          const { data } = await axiosSecure.post(
            "/analysis/v2/energy/audit",
            energyAudit,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data) {
            toast.success(data.message);
            set({ energyAudit: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during energy audit submission", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      getEnergyAudit: async () => {
        set({ isLoading: true });

        try {
          const token = get().token;
          if (!token) {
            toast.error("Token is required to fetch energy audit data.");
            return;
          }

          const { data } = await axiosSecure.post(
            "/analysis/v3/energy/audit",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data) {
            set({ energyAudit: data.data });
          } else if (data.error) {
            console.error(data.message);
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during energy audit", error);
          toast.error("Unable to fetch energy audit data.");
        } finally {
          set({ isLoading: false }); // End loading
        }
      },

      //PostSolarAnalysis
      postSolarMicroServices: async (service) => {
        set({ isLoading: true });
        try {
          const token = get().token;
          const { data } = await axiosSecure.post(
            "/analysis/solar/calculate",
            service,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data) {
            set({ solarMicroservice: data.data });
            toast.success(data.message);
          } else if (data.error) {
            console.error(data.message);
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during solar microservice request", error);
          toast.error("Failed to calculate solar analysis.");
        } finally {
          set({ isLoading: false });
        }
      },
      //PostBiomass
      postBiomassMicroServices: async (biomass) => {
        set({ isLoading: true });
        try {
          const token = get().token;
          const { data } = await axiosSecure.post(
            "/analysis/biomass/calculate",
            biomass,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data) {
            set({ biomassMicroservice: data.data });
            toast.success(data.message);
          } else if (data.error) {
            console.error(data.message);
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during biomass microservice request", error);
          toast.error("Failed to calculate biomass analysis.");
        } finally {
          set({ isLoading: false });
        }
      },

      // get battery types
      getBatteryTypes: async () => {
        set({ isLoading: true });
        try {
          const token = get().token;
          const { data } = await axiosSecure.get("/buildings/ev-types", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data) {
            set({ allBatteryType: data.data, isLoading: false });
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
      AddBattery: async (battery) => {
        set({ isLoading: true });
        try {
          const token = get().token;
          const { data } = await axiosSecure.post("/buildings/ev", battery, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data) {
            toast.success(data.message);
            set({ isLoading: false });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during  create battery", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      // get battery types
      getAllBattery: async () => {
        set({ isLoading: true });
        try {
          const token = get().token;
          const { data } = await axiosSecure.get("/buildings/ev", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data) {
            set({ allBattery: data.data, isLoading: false });
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
            "/auth/create-password",
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data) {
            set({ isLoading: false });
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during creating password", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },
      updatePassword: async (userData) => {
        const { token } = get();
        set({ isLoading: true });

        try {
          if (!token) {
            toast.error("Authentication token missing. Please log in again.");
            return;
          }

          const { data } = await axiosSecure.post(
            "/auth/reset-password",
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data?.message) {
            toast.success(data.message);
          } else if (data?.error) {
            toast.error(data.message || "Password update failed.");
          }
        } catch (error) {
          console.error("Problem during password update", error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          set({ isLoading: false });
        }
      },

      loginUser: async (newUser) => {
        set({ isLoading: true });

        try {
          const { data } = await axiosSecure.post("/auth/login", newUser);

          if (data) {
            set({ user: data.data, token: data.data.token });
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
      logOutUser: () => {
        set({ token: "", user: null });
      },
    }),

    {
      name: "user",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
