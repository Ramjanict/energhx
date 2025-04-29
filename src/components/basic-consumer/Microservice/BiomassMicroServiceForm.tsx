import CommonWrapper from "@/common/CommonWrapper";
import DashBoardHeader from "@/common/DashBoardHeader";
import FormSubheader from "@/common/FormSubheader";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema with Zod
const FeedstockSchema = z.object({
  feedstock: z.enum([
    "animal_dung",
    "msw",
    "human_sewage",
    "energy_crops",
    "custom",
  ]),
  t: z.number().min(0, "Temperature must be positive"),
  TS: z.number().min(0).max(1, "Total Solids must be between 0 and 1"),
  VS: z.number().min(0).max(1, "Volatile Solids must be between 0 and 1"),
  FADin: z.number().min(0, "Input flow rate must be positive"),
  VADCH4: z.number().min(0, "Methane volume must be positive"),
  THTC: z.number().min(0, "Total heat transfer coefficient must be positive"),
  QAD: z.number().min(0, "Flow rate must be positive"),
  SADin: z.number().min(0, "Substrate concentration must be positive"),
  XADin: z.number().min(0, "Biomass concentration must be positive"),
  SHTC0: z.number().min(0, "Initial value must be positive").default(0),
  ZAD0: z.number().min(0, "Initial value must be positive").default(0),
  CO20: z.number().min(0, "Initial CO2 must be positive").default(0),
  H20: z.number().min(0, "Initial H2 must be positive").default(0),
  NH30: z.number().min(0, "Initial NH3 must be positive").default(0),
  μADmax: z.number().min(0, "Maximum growth rate must be positive"),
  D: z.number().min(0, "Dilution rate must be positive"),
  Kd: z.number().min(0, "Decay coefficient must be positive").default(0.02),
  Ks: z.number().min(0, "Saturation constant must be positive").default(150),
  KI: z.number().min(0, "Inhibition constant must be positive").default(0.5),
  Yx: z.number().min(0, "Yield coefficient must be positive").default(0.82),
  Ksx: z.number().min(0, "Saturation constant must be positive").default(0.983),
  Kmx: z
    .number()
    .min(0, "Maintenance coefficient must be positive")
    .default(0.4),
  Ys: z.number().min(0, "Yield coefficient must be positive").default(4.35),
  YCH4: z.number().min(0, "Methane yield must be positive"),
  YCO2: z.number().min(0, "CO2 yield must be positive").default(0.4),
  YH2: z.number().min(0, "H2 yield must be positive").default(0.03),
  YNH3: z.number().min(0, "NH3 yield must be positive"),
  Ta: z.number().min(0, "Temperature must be positive").default(473),
  A: z.number().min(0, "Area must be positive").default(1),
  αs: z.number().min(0, "Alpha must be positive").default(1),
  ρCH4: z.number().min(0, "Density must be positive"),
});

type FeedstockFormData = z.infer<typeof FeedstockSchema>;

const feedstockOptions = [
  { value: "animal_dung", label: "Animal Dung" },
  { value: "msw", label: "Municipal Solid Waste" },
  { value: "human_sewage", label: "Human Sewage" },
  { value: "energy_crops", label: "Energy Crops" },
  { value: "custom", label: "Custom" },
];

export interface BiomassMicroServiceForm {
  nextStep: () => void;
}

const BiomassMicroServiceForm: React.FC<BiomassMicroServiceForm> = ({
  nextStep,
}) => {
  const { postBiomassMicroServices } = basicConsumerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedstockFormData>({
    resolver: zodResolver(FeedstockSchema),
    defaultValues: {
      feedstock: "animal_dung",
      t: 30,
      TS: 0.3,
      VS: 0.8,
      FADin: 120,
      VADCH4: 236,
      THTC: 1073,
      QAD: 86400,
      SADin: 4,
      XADin: 2,
      SHTC0: 0,
      ZAD0: 0,
      CO20: 0,
      H20: 0,
      NH30: 0,
      μADmax: 0.35,
      D: 0.029,
      Kd: 0.02,
      Ks: 150,
      KI: 0.5,
      Yx: 0.82,
      Ksx: 0.983,
      Kmx: 0.4,
      Ys: 4.35,
      YCH4: 0.27,
      YCO2: 0.4,
      YH2: 0.03,
      YNH3: 0.01,
      Ta: 473,
      A: 1,
      αs: 1,
      ρCH4: 0.75,
    },
  });

  const onSubmit = (data: FeedstockFormData) => {
    console.log(data);
    postBiomassMicroServices(data);
    nextStep();
  };

  return (
    <CommonWrapper>
      <DashBoardHeader className="py-6">BioProduct Flow sizing</DashBoardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="feedstock" className="text-primary-gray block mb-1">
              Feedstock Type
            </label>
            <select
              id="feedstock"
              {...register("feedstock")}
              className="w-full border border-primary-gray p-2 outline-none"
            >
              {feedstockOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="t" className="text-primary-gray block mb-1">
              Temperature (°C)
            </label>
            <input
              type="number"
              id="t"
              step="0.1"
              {...register("t", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.t && (
              <p className="mt-1 text-sm text-red-600">{errors.t.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="TS" className="text-primary-gray block mb-1">
              Total Solids (TS)
            </label>
            <input
              type="number"
              id="TS"
              step="0.01"
              {...register("TS", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.TS && (
              <p className="mt-1 text-sm text-red-600">{errors.TS.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="VS" className="text-primary-gray block mb-1">
              Volatile Solids (VS)
            </label>
            <input
              type="number"
              id="VS"
              step="0.01"
              {...register("VS", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.VS && (
              <p className="mt-1 text-sm text-red-600">{errors.VS.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="FADin" className="text-primary-gray block mb-1">
              Input Flow Rate (FADin)
            </label>
            <input
              type="number"
              id="FADin"
              step="0.1"
              {...register("FADin", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.FADin && (
              <p className="mt-1 text-sm text-red-600">
                {errors.FADin.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="VADCH4" className="text-primary-gray block mb-1">
              Methane Volume (VADCH4)
            </label>
            <input
              type="number"
              id="VADCH4"
              step="0.1"
              {...register("VADCH4", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.VADCH4 && (
              <p className="mt-1 text-sm text-red-600">
                {errors.VADCH4.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="THTC" className="text-primary-gray block mb-1">
              Total Heat Transfer Coefficient (THTC)
            </label>
            <input
              type="number"
              id="THTC"
              step="0.1"
              {...register("THTC", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.THTC && (
              <p className="mt-1 text-sm text-red-600">{errors.THTC.message}</p>
            )}
          </div>
        </div>

        <div>
          <FormSubheader>Digester Parameters</FormSubheader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="QAD" className="text-primary-gray block mb-1">
                Flow Rate (QAD)
              </label>
              <input
                type="number"
                id="QAD"
                {...register("QAD", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.QAD && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.QAD.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="SADin" className="text-primary-gray block mb-1">
                Substrate Concentration (SADin)
              </label>
              <input
                type="number"
                id="SADin"
                step="0.01"
                {...register("SADin", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.SADin && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.SADin.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="XADin" className="text-primary-gray block mb-1">
                Biomass Concentration (XADin)
              </label>
              <input
                type="number"
                id="XADin"
                step="0.01"
                {...register("XADin", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.XADin && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.XADin.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <FormSubheader className="text-lg font-semibold text-gray-800">
            Kinetic Parameters
          </FormSubheader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="μADmax" className="text-primary-gray block mb-1">
                Max Growth Rate (μADmax)
              </label>
              <input
                type="number"
                id="μADmax"
                step="0.01"
                {...register("μADmax", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.μADmax && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.μADmax.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="D" className="text-primary-gray block mb-1">
                Dilution Rate (D)
              </label>
              <input
                type="number"
                id="D"
                step="0.001"
                {...register("D", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.D && (
                <p className="mt-1 text-sm text-red-600">{errors.D.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="Kd" className="text-primary-gray block mb-1">
                Decay Coefficient (Kd)
              </label>
              <input
                type="number"
                id="Kd"
                step="0.001"
                {...register("Kd", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.Kd && (
                <p className="mt-1 text-sm text-red-600">{errors.Kd.message}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <FormSubheader>Yield Coefficients</FormSubheader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="YCH4" className="text-primary-gray block mb-1">
                Methane Yield (YCH4)
              </label>
              <input
                type="number"
                id="YCH4"
                step="0.01"
                {...register("YCH4", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.YCH4 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.YCH4.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="YCO2" className="text-primary-gray block mb-1">
                CO2 Yield (YCO2)
              </label>
              <input
                type="number"
                id="YCO2"
                step="0.01"
                {...register("YCO2", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.YCO2 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.YCO2.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="YNH3" className="text-primary-gray block mb-1">
                NH3 Yield (YNH3)
              </label>
              <input
                type="number"
                id="YNH3"
                step="0.001"
                {...register("YNH3", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.YNH3 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.YNH3.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end ">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 cursor-pointer"
          >
            Calculate Flow Sizing
          </button>
        </div>
      </form>
    </CommonWrapper>
  );
};

export default BiomassMicroServiceForm;
