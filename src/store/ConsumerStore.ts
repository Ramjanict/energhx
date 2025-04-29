import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { ConsumerStore } from "./ConsumerType";
// Secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const basicConsumerStore = create<ConsumerStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      energyAudit: [],
      allBuildings: null,
      allCountries: null,
      allStates: null,
      allCommodities: null,
      allServices: null,
      solarMicroservice: null,
      biomassMicroservice: null,

      createConsumer: async (newConsumer) => {
        try {
          const { data } = await axiosSecure.post("/auth", newConsumer);

          if (data) {
            toast.success(data.message);
            set({ user: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during Signup", error);
          toast.error("Something went wrong. Please try again.");
        }
      },
      getAllCountries: async () => {
        const { data } = await axiosSecure.get("/countries", {});

        if (data) {
          set({ allCountries: data.data });
        }
      },
      getAllStates: async (id) => {
        const { data } = await axiosSecure.get(`/countries/${id}/states`, {});

        if (data) {
          set({ allStates: data.data });
        }
      },
      getAllCommodities: async () => {
        const { data } = await axiosSecure.get(`/commodities`, {});

        if (data) {
          set({ allCommodities: data.data });
        }
      },
      getAllServices: async (countryId, stateId, commodityId) => {
        const { data } = await axiosSecure.get(
          `/countries/${countryId}/state/${stateId}/commodities/${commodityId}/utilities`,
          {}
        );

        if (data) {
          set({ allServices: data.data });
        }
      },

      //building type
      getAllBuildings: async (token: string | null) => {
        try {
          if (!token) {
            toast.error("Token is required to fetch building types.");
            return;
          }
          const { data } = await axiosSecure.get("/buildings", {
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
        }
      },

      //microservices
      postEnergyAudit: async (energyAudit) => {
        try {
          const token = get().token;
          const { data } = await axiosSecure.post(
            "/analysis/v2/energy/audit",
            energyAudit,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data) {
            toast.success(data.message);
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during Signup", error);
          toast.error("Something went wrong. Please try again.");
        }
      },
      getEnergyAudit: async () => {
        try {
          const token = get().token;
          if (token) {
            const { data } = await axiosSecure.post(
              "/analysis/v3/energy/audit",
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data) {
              set({ energyAudit: data.data });
            } else if (data.error) {
              console.log(data.message);
            }
          }
        } catch (error: any) {
          console.error("Problem during energy audit", error);
        }
      },
      //PostSolarAnalysis
      postSolarMicroServices: async (service) => {
        try {
          const token = get().token;
          const { data } = await axiosSecure.post(
            "/analysis/solar/calculate",
            service,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data) {
            set({ solarMicroservice: data.data });
          } else if (data.error) {
            console.log(data.message);
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during post service", error);
        }
      },
      //PostBiomass
      postBiomassMicroServices: async (biomass) => {
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
            console.log(data.message);
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Problem during post service", error);
        }
      },
      loginUser: async (newUser) => {
        try {
          const { data } = await axiosSecure.post("/auth/login", newUser);

          if (data) {
            toast.success(data.message);
            set({ token: data.data.token });
            set({ user: data.data });
          } else if (data.error) {
            toast.error(data.message);
          }
        } catch (error: any) {
          console.error("Problem during Signup", error);
          toast.error("Something went wrong. Please try again.");
        }
      },

      logOutUser: () => {
        set({ token: "", user: null });
      },
    }),
    { name: "user" }
  )
);
