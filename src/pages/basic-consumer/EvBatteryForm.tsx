import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import { useNavigate } from "react-router-dom";
import { basicConsumerStore } from "@/store/ConsumerStore";
import Loading from "@/components/basic-consumer/Loading";

const batterySchema = z.object({
  title: z.string().min(1, "Title is required"),
  "battery-manufacturer": z.string().min(1, "Manufacturer is required"),
  "battery-class": z.string().min(1, "Class is required"),
  "battery-model": z.string().min(1, "Model is required"),
  "battery-length": z.number().positive("Length must be positive"),
  "battery-diameter": z.number().positive("Diameter must be positive"),
  "battery-height": z.number().nonnegative(),
  "battery-width": z.number().nonnegative(),
  "battery-thickness": z.number().nonnegative(),
  "battery-mass": z.number().positive("Mass must be positive"),
  "battery-capacity": z.number().positive("Capacity must be positive"),
  "battery-voltage": z.number().positive("Voltage must be positive"),
  "battery-peak-C-rate": z.number().positive("Peak C-rate must be positive"),
  "battery-continous-C-rate": z
    .number()
    .positive("Continuous C-rate must be positive"),
  "average-energy-consumption": z
    .number()
    .positive("Consumption must be positive"),
  "vehicle-range": z.number().positive("Range must be positive"),
  "nominal-voltage": z.number().positive("Nominal voltage must be positive"),
});

type BatteryFormValues = z.infer<typeof batterySchema>;

const EvBatteryForm: React.FC = () => {
  const { AddBattery, isLoading } = basicConsumerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BatteryFormValues>({
    resolver: zodResolver(batterySchema),
    defaultValues: {
      title: "EV Battery Sizing",
      "battery-manufacturer": "Panasonic",
      "battery-class": "cylindrical",
      "battery-model": "NCR18650B",
      "battery-length": 1,
      "battery-diameter": 1,
      "battery-height": 0,
      "battery-width": 0,
      "battery-thickness": 0,
      "battery-mass": 1,
      "battery-capacity": 3,
      "battery-voltage": 3,
      "battery-peak-C-rate": 1,
      "battery-continous-C-rate": 1,
      "average-energy-consumption": 161,
      "vehicle-range": 250,
      "nominal-voltage": 450,
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data: BatteryFormValues) => {
    console.log("EV Battery Form Data:", data);
    await AddBattery(data);
    navigate("/basic-consumer/buildingInformation");
  };

  const battery = [
    { name: "title", label: "Title", type: "text" },
    {
      name: "battery-manufacturer",
      label: "Battery Manufacturer",
      type: "text",
    },
    { name: "battery-class", label: "Battery Class", type: "text" },
    { name: "battery-model", label: "Battery Model", type: "text" },
    {
      name: "battery-length",
      label: "Battery Length (m)",
      type: "number",
    },
    {
      name: "battery-diameter",
      label: "Battery Diameter (m)",
      type: "number",
    },
    {
      name: "battery-height",
      label: "Battery Height (m)",
      type: "number",
    },
    {
      name: "battery-width",
      label: "Battery Width (m)",
      type: "number",
    },
    {
      name: "battery-thickness",
      label: "Battery Thickness (m)",
      type: "number",
    },
    {
      name: "battery-mass",
      label: "Battery Mass (kg)",
      type: "number",
    },
    {
      name: "battery-capacity",
      label: "Battery Capacity (Ah)",
      type: "number",
    },
    {
      name: "battery-voltage",
      label: "Battery Voltage (V)",
      type: "number",
    },
    {
      name: "battery-peak-C-rate",
      label: "Peak C-Rate",
      type: "number",
    },
    {
      name: "battery-continous-C-rate",
      label: "Continuous C-Rate",
      type: "number",
    },
    {
      name: "average-energy-consumption",
      label: "Avg Energy Consumption (Wh/km)",
      type: "number",
    },
    {
      name: "vehicle-range",
      label: "Vehicle Range (km)",
      type: "number",
    },
    {
      name: "nominal-voltage",
      label: "Nominal Voltage (V)",
      type: "number",
    },
  ];
  return (
    <CommonWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-6 bg-white space-y-5"
        >
          <h2 className="text-2xl font-bold mb-2 text-primary">
            EV Battery Sizing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {battery.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="text-primary-gray block mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name as keyof BatteryFormValues, {
                    valueAsNumber: field.type === "number",
                  })}
                  className="w-full border border-primary-gray p-2 rounded-md outline-none"
                />
                {errors[field.name as keyof BatteryFormValues] && (
                  <p className="mt-1 text-sm text-red-600">
                    {
                      (errors[field.name as keyof BatteryFormValues] as any)
                        ?.message
                    }
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-fit bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition ml-auto block cursor-pointer"
          >
            Add Battery
          </button>
        </form>
      )}
    </CommonWrapper>
  );
};

export default EvBatteryForm;
