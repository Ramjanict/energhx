import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import { Link, useParams } from "react-router-dom";
import Loading from "@/components/basic-consumer/Loading";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const batterySchema = z.object({
  title: z.string().min(1, "Title is required"),
  powerRating: z.string().min(1, "PowerRating is required"),
  noOfEvs: z.string().min(1, "Number of EVs is required"),
  chargingHours: z.string().min(1, "Charging hours is required"),
  name: z.string().min(1, "Name is required"),
  "battery-manufacturer": z.string().min(1, "Manufacturer is required"),
  "battery-class": z.string().min(1, "Class is required"),
  "battery-model": z.string().min(1, "Model is required"),
  "battery-length": z.number(),
  "battery-diameter": z.number(),
  "battery-height": z.number(),
  "battery-width": z.number(),
  "battery-thickness": z.number(),
  "battery-mass": z.number(),
  "battery-capacity": z.number(),
  "battery-voltage": z.number(),
  "battery-peak-C-rate": z.number(),
  "battery-continous-C-rate": z.number(),
  "average-energy-consumption": z.number(),
  "vehicle-range": z.number(),
  "nominal-voltage": z.number(),
  chargerModel: z.string().min(1, "chargerModel is required"),
});

type BatteryFormValues = z.infer<typeof batterySchema>;

const EvBatteryForm: React.FC = () => {
  const { AddBattery, isLoading, getBatteryTypes, allBatteryType } =
    useConsumerStore();

  const [selectBatteryType, setSelectBatteryType] = useState("");
  const { buildingId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BatteryFormValues>({
    resolver: zodResolver(batterySchema),
    defaultValues: {
      powerRating: "40",
      noOfEvs: "3",
      chargingHours: "5",
      name: "Faithful's EV",
      title: "EV Battery Sizing",
      "battery-manufacturer": "Panasonic",
      "battery-class": "cylindrical",
      "battery-model": "NCR18650B",
      "battery-length": 1,
      "battery-diameter": 0,
      "battery-height": 0,
      "battery-width": 0,
      "battery-thickness": 0,
      "battery-mass": 1,
      "battery-capacity": 3.2,
      "battery-voltage": 3.6,
      "battery-peak-C-rate": 1,
      "battery-continous-C-rate": 1,
      "average-energy-consumption": 161.7451,
      "vehicle-range": 250,
      "nominal-voltage": 450,
      chargerModel: "",
    },
  });

  useEffect(() => {
    getBatteryTypes();
  }, [getBatteryTypes]);

  const onSubmit = async (data: BatteryFormValues) => {
    // Use selectBatteryType from dropdown state for chargerModel override
    const addBatteryData = {
      ...data,
      buildingId: buildingId!,
      chargerModel: selectBatteryType || data.chargerModel,
    };

    try {
      await AddBattery(addBatteryData);
    } catch (error) {
      console.error("Error adding battery:", error);
    }
  };

  // Input fields config
  const batteryFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "name", label: "Name", type: "text" },
    { name: "powerRating", label: "Power Rating", type: "text" },
    { name: "noOfEvs", label: "Number of EVs", type: "text" },
    { name: "chargingHours", label: "Charging Hours", type: "text" },
    {
      name: "battery-manufacturer",
      label: "Battery Manufacturer",
      type: "text",
    },
    { name: "battery-class", label: "Battery Class", type: "text" },
    { name: "battery-model", label: "Battery Model", type: "text" },
    { name: "battery-length", label: "Battery Length (m)", type: "number" },
    { name: "battery-diameter", label: "Battery Diameter (m)", type: "number" },
    { name: "battery-height", label: "Battery Height (m)", type: "number" },
    { name: "battery-width", label: "Battery Width (m)", type: "number" },
    {
      name: "battery-thickness",
      label: "Battery Thickness (m)",
      type: "number",
    },
    { name: "battery-mass", label: "Battery Mass (kg)", type: "number" },
    {
      name: "battery-capacity",
      label: "Battery Capacity (Ah)",
      type: "number",
    },
    { name: "battery-voltage", label: "Battery Voltage (V)", type: "number" },
    { name: "battery-peak-C-rate", label: "Peak C-Rate", type: "number" },
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
    { name: "vehicle-range", label: "Vehicle Range (km)", type: "number" },
    { name: "nominal-voltage", label: "Nominal Voltage (V)", type: "number" },
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
          <h2 className="text-xl font-bold mb-2 text-primary">
            Select EV Types
          </h2>

          {/* Battery Dropdown */}
          <div>
            <label
              htmlFor="chargerModel"
              className="text-primary-gray block mb-1"
            >
              Charger Model
            </label>
            <Controller
              name="chargerModel"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedBattery = allBatteryType?.find(
                      (c) => c.name === value
                    );
                    if (selectedBattery)
                      setSelectBatteryType(selectedBattery.id);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                    <SelectValue placeholder="Choose charger model" />
                  </SelectTrigger>
                  <SelectContent className="bg-light-green">
                    {allBatteryType?.map((battery, index) => (
                      <SelectItem
                        key={index}
                        value={battery.name}
                        className="hover:bg-primary-green hover:text-white"
                      >
                        {battery.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.chargerModel && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.chargerModel.message}
              </p>
            )}
          </div>

          {/* EV Battery Sizing Fields */}
          <h2 className="text-xl font-bold mb-2 text-primary">
            EV Battery Sizing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batteryFields.map((field) => (
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
                  step={field.type === "number" ? "any" : undefined} // <-- Allow decimals
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

          <div className="py-10 flex gap-4 items-center">
            <Link
              to="/basic-consumer/buildingInformation"
              className="w-fit bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition  block cursor-pointer"
            >
              Back
            </Link>
            <button
              type="submit"
              className="w-fit bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition  block cursor-pointer"
            >
              Add Battery
            </button>
          </div>
        </form>
      )}
    </CommonWrapper>
  );
};

export default EvBatteryForm;
