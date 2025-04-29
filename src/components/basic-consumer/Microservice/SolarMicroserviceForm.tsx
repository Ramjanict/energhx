import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashBoardHeader from "@/common/DashBoardHeader";
import FormSubheader from "@/common/FormSubheader";
import CommonWrapper from "@/common/CommonWrapper";
import { basicConsumerStore } from "@/store/ConsumerStore";

// Define the schema with Zod
const formSchema = z
  .object({
    wavelength: z.number().min(300).max(1100),
    sam_type: z.enum([
      "custom",
      "Alumina (Al2O3)",
      "Formic acid",
      "Gelatin",
      "Oxidized starch",
    ]),
    custom_sam_ri: z.number().min(1).max(5).optional(),
    custom_sam_k: z.number().min(0).max(5).optional(),
    sam_thickness: z.number().min(0.01).max(10),
    substrate_type: z.enum(["custom", "PI", "PET", "PEN", "PDMS"]),
    custom_substrate_ri: z.number().min(1).max(5).optional(),
    custom_substrate_k: z.number().min(0).max(5).optional(),
    substrate_thickness: z.number().min(1).max(5000),
    electrode_type: z.enum([
      "custom",
      "ITO",
      "FTO",
      "Ag mesh",
      "Graphene",
      "AgNWs",
    ]),
    custom_electrode_ri: z.number().min(1).max(5).optional(),
    custom_electrode_k: z.number().min(0).max(5).optional(),
    electrode_thickness: z.number().min(0.01).max(10),
    photoanode_thickness: z.number().min(1).max(100),
    custom_photoanode_ri: z.number().min(1).max(5).optional(),
    custom_photoanode_k: z.number().min(0).max(5).optional(),
    dye_thickness: z.number().min(0.01).max(5),
    custom_dye_ri: z.number().min(1).max(5).optional(),
    custom_dye_k: z.number().min(0).max(5).optional(),
    solar_irradiance: z.number().min(100).max(2000),
    area: z.number().min(0.1).max(100),
    num_hours: z.number().min(1).max(24),
    total_plug_load: z.number().min(0).max(10000),
  })
  .superRefine((data, ctx) => {
    // Custom validation for when 'custom' is selected
    if (
      data.sam_type === "custom" &&
      (data.custom_sam_ri === undefined || data.custom_sam_k === undefined)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Custom SAM refractive index and extinction coefficient are required when SAM type is custom",
        path: ["custom_sam_ri"],
      });
    }
    if (
      data.substrate_type === "custom" &&
      (data.custom_substrate_ri === undefined ||
        data.custom_substrate_k === undefined)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Custom substrate refractive index and extinction coefficient are required when substrate type is custom",
        path: ["custom_substrate_ri"],
      });
    }
    if (
      data.electrode_type === "custom" &&
      (data.custom_electrode_ri === undefined ||
        data.custom_electrode_k === undefined)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Custom electrode refractive index and extinction coefficient are required when electrode type is custom",
        path: ["custom_electrode_ri"],
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

export interface SolarMicroserviceForm {
  nextStep: () => void;
}
const SolarMicroserviceForm: React.FC<SolarMicroserviceForm> = ({
  nextStep,
}) => {
  const { postSolarMicroServices } = basicConsumerStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wavelength: 550,
      sam_type: "custom",
      custom_sam_ri: 1.5,
      custom_sam_k: 0.1,
      sam_thickness: 0.05,
      substrate_type: "custom",
      custom_substrate_ri: 2.0,
      custom_substrate_k: 0.2,
      substrate_thickness: 1000,
      electrode_type: "custom",
      custom_electrode_ri: 1.95,
      custom_electrode_k: 0.01,
      electrode_thickness: 0.5,
      photoanode_thickness: 10,
      custom_photoanode_ri: 2.4,
      custom_photoanode_k: 0.05,
      dye_thickness: 0.2,
      custom_dye_ri: 1.6,
      custom_dye_k: 0.05,
      solar_irradiance: 1000,
      area: 1,
      num_hours: 10,
      total_plug_load: 300,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    postSolarMicroServices(data);
    nextStep();
  };

  // Watch custom selections to conditionally show fields
  const samType = watch("sam_type");
  const substrateType = watch("substrate_type");
  const electrodeType = watch("electrode_type");

  return (
    <CommonWrapper>
      <div className="px-4">
        <DashBoardHeader className="pb-2 pt-10">
          Solar Panel Evaluation form
        </DashBoardHeader>
        <FormSubheader>
          Enter the required parameters for a detailed solar panel Evaluation
        </FormSubheader>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wavelength */}
          <div>
            <label className="text-primary-gray block mb-1">
              Wavelength (nm)
            </label>
            <input
              type="number"
              {...register("wavelength", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.wavelength && (
              <p className="mt-1 text-sm text-red-600">
                {errors.wavelength.message}
              </p>
            )}
          </div>

          {/* SAM Type */}
          <div>
            <label className="text-primary-gray block mb-1">SAM Type</label>
            <select
              {...register("sam_type")}
              className="w-full border border-primary-gray p-2 outline-none"
            >
              <option value="custom">Custom</option>
              <option value="Alumina (Al2O3)">Alumina (Al2O3)</option>
              <option value="Formic acid">Formic acid</option>
              <option value="Gelatin">Gelatin</option>
              <option value="Oxidized starch">Oxidized starch</option>
            </select>
          </div>

          {/* Custom SAM Refractive Index (conditionally shown) */}
          {samType === "custom" && (
            <div>
              <label className="text-primary-gray block mb-1">
                Custom SAM Refractive Index
              </label>
              <input
                type="number"
                step="0.01"
                {...register("custom_sam_ri", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.custom_sam_ri && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.custom_sam_ri.message}
                </p>
              )}
            </div>
          )}

          {/* Custom SAM Extinction Coefficient (conditionally shown) */}
          {samType === "custom" && (
            <div>
              <label className="text-primary-gray block mb-1">
                Custom SAM Extinction Coefficient
              </label>
              <input
                type="number"
                step="0.01"
                {...register("custom_sam_k", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.custom_sam_k && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.custom_sam_k.message}
                </p>
              )}
            </div>
          )}

          {/* SAM Thickness */}
          <div>
            <label className="text-primary-gray block mb-1">
              SAM Thickness (mm)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("sam_thickness", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.sam_thickness && (
              <p className="mt-1 text-sm text-red-600">
                {errors.sam_thickness.message}
              </p>
            )}
          </div>

          {/* Substrate Type */}
          <div>
            <label className="text-primary-gray block mb-1">
              Substrate Type
            </label>
            <select
              {...register("substrate_type")}
              className="w-full border border-primary-gray p-2 outline-none"
            >
              <option value="custom">Custom</option>
              <option value="PI">PI</option>
              <option value="PET">PET</option>
              <option value="PEN">PEN</option>
              <option value="PDMS">PDMS</option>
            </select>
          </div>

          {/* Custom Substrate Refractive Index (conditionally shown) */}
          {substrateType === "custom" && (
            <div>
              <label className="text-primary-gray block mb-1">
                Custom Substrate Refractive Index
              </label>
              <input
                type="number"
                step="0.01"
                {...register("custom_substrate_ri", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.custom_substrate_ri && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.custom_substrate_ri.message}
                </p>
              )}
            </div>
          )}

          {/* Custom Substrate Extinction Coefficient (conditionally shown) */}
          {substrateType === "custom" && (
            <div>
              <label className="text-primary-gray block mb-1">
                Custom Substrate Extinction Coefficient
              </label>
              <input
                type="number"
                step="0.01"
                {...register("custom_substrate_k", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.custom_substrate_k && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.custom_substrate_k.message}
                </p>
              )}
            </div>
          )}

          {/* Substrate Thickness */}
          <div>
            <label className="text-primary-gray block mb-1">
              Substrate Thickness (μm)
            </label>
            <input
              type="number"
              {...register("substrate_thickness", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.substrate_thickness && (
              <p className="mt-1 text-sm text-red-600">
                {errors.substrate_thickness.message}
              </p>
            )}
          </div>

          {/* Electrode Type */}
          <div>
            <label className="text-primary-gray block mb-1">
              Electrode Type
            </label>
            <select
              {...register("electrode_type")}
              className="w-full border border-primary-gray p-2 outline-none"
            >
              <option value="custom">Custom</option>
              <option value="ITO">ITO</option>
              <option value="FTO">FTO</option>
              <option value="Ag mesh">Ag mesh</option>
              <option value="Graphene">Graphene</option>
              <option value="AgNWs">AgNWs</option>
            </select>
          </div>

          {/* Custom Electrode Refractive Index (conditionally shown) */}
          {electrodeType === "custom" && (
            <div>
              <label className="text-primary-gray block mb-1">
                Custom Electrode Refractive Index
              </label>
              <input
                type="number"
                step="0.01"
                {...register("custom_electrode_ri", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.custom_electrode_ri && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.custom_electrode_ri.message}
                </p>
              )}
            </div>
          )}

          {/* Custom Electrode Extinction Coefficient (conditionally shown) */}
          {electrodeType === "custom" && (
            <div>
              <label className="text-primary-gray block mb-1">
                Custom Electrode Extinction Coefficient
              </label>
              <input
                type="number"
                step="0.01"
                {...register("custom_electrode_k", { valueAsNumber: true })}
                className="w-full border border-primary-gray p-2 outline-none"
              />
              {errors.custom_electrode_k && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.custom_electrode_k.message}
                </p>
              )}
            </div>
          )}

          {/* Electrode Thickness */}
          <div>
            <label className="text-primary-gray block mb-1">
              Electrode Thickness (mm)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("electrode_thickness", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.electrode_thickness && (
              <p className="mt-1 text-sm text-red-600">
                {errors.electrode_thickness.message}
              </p>
            )}
          </div>

          {/* Photoanode Thickness */}
          <div>
            <label className="text-primary-gray block mb-1">
              Photoanode Thickness (mm)
            </label>
            <input
              type="number"
              {...register("photoanode_thickness", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.photoanode_thickness && (
              <p className="mt-1 text-sm text-red-600">
                {errors.photoanode_thickness.message}
              </p>
            )}
          </div>

          {/* Custom Photoanode Refractive Index */}
          <div>
            <label className="text-primary-gray block mb-1">
              Custom Photoanode Refractive Index
            </label>
            <input
              type="number"
              step="0.01"
              {...register("custom_photoanode_ri", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.custom_photoanode_ri && (
              <p className="mt-1 text-sm text-red-600">
                {errors.custom_photoanode_ri.message}
              </p>
            )}
          </div>

          {/* Custom Photoanode Extinction Coefficient */}
          <div>
            <label className="text-primary-gray block mb-1">
              Custom Photoanode Extinction Coefficient
            </label>
            <input
              type="number"
              step="0.01"
              {...register("custom_photoanode_k", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.custom_photoanode_k && (
              <p className="mt-1 text-sm text-red-600">
                {errors.custom_photoanode_k.message}
              </p>
            )}
          </div>

          {/* Dye Thickness */}
          <div>
            <label className="text-primary-gray block mb-1">
              Dye Thickness (mm)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("dye_thickness", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.dye_thickness && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dye_thickness.message}
              </p>
            )}
          </div>

          {/* Custom Dye Refractive Index */}
          <div>
            <label className="text-primary-gray block mb-1">
              Custom Dye Refractive Index
            </label>
            <input
              type="number"
              step="0.01"
              {...register("custom_dye_ri", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.custom_dye_ri && (
              <p className="mt-1 text-sm text-red-600">
                {errors.custom_dye_ri.message}
              </p>
            )}
          </div>

          {/* Custom Dye Extinction Coefficient */}
          <div>
            <label className="text-primary-gray block mb-1">
              Custom Dye Extinction Coefficient
            </label>
            <input
              type="number"
              step="0.01"
              {...register("custom_dye_k", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.custom_dye_k && (
              <p className="mt-1 text-sm text-red-600">
                {errors.custom_dye_k.message}
              </p>
            )}
          </div>

          {/* Solar Irradiance */}
          <div>
            <label className="text-primary-gray block mb-1">
              Solar Irradiance (W/m²)
            </label>
            <input
              type="number"
              {...register("solar_irradiance", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.solar_irradiance && (
              <p className="mt-1 text-sm text-red-600">
                {errors.solar_irradiance.message}
              </p>
            )}
          </div>

          {/* Area */}
          <div>
            <label className="text-primary-gray block mb-1">Area (m²)</label>
            <input
              type="number"
              step="0.1"
              {...register("area", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.area && (
              <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
            )}
          </div>

          {/* Number of Hours */}
          <div>
            <label className="text-primary-gray block mb-1">
              Number of Hours of Sunlight
            </label>
            <input
              type="number"
              {...register("num_hours", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.num_hours && (
              <p className="mt-1 text-sm text-red-600">
                {errors.num_hours.message}
              </p>
            )}
          </div>

          {/* Total Plug Load */}
          <div>
            <label className="text-primary-gray block mb-1">
              Total Plug Load (W)
            </label>
            <input
              type="number"
              {...register("total_plug_load", { valueAsNumber: true })}
              className="w-full border border-primary-gray p-2 outline-none"
            />
            {errors.total_plug_load && (
              <p className="mt-1 text-sm text-red-600">
                {errors.total_plug_load.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end sm:pb-10">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 cursor-pointer"
          >
            Evaluate Solar Potential
          </button>
        </div>
      </form>
    </CommonWrapper>
  );
};

export default SolarMicroserviceForm;
