// src/components/RoomForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonWrapper from "@/common/CommonWrapper";
import { Link, useParams } from "react-router-dom";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import Loading from "@/components/basic-consumer/Loading";

// src/schemas/roomSchema.ts
const roomSchema = z.object({
  title: z.string(),
  construction: z.string(),
  "construction-subtype": z.string(),
  "percentage-glass": z.string(),
  "wall-type": z.string(),
  city: z.string(),
  month: z.string(),
  "percentage-MDDB": z.string(),
  LSM: z.number(),
  "north-wall-area": z.number(),
  "east-wall-area": z.number(),
  "south-wall-area": z.number(),
  "west-wall-area": z.number(),
  "roof-type": z.string(),
  "roof-area": z.number(),
  "north-fenestration-area-shaded": z.number(),
  "north-fenestration-area-sunlit": z.number(),
  "east-fenestration-area-shaded": z.number(),
  "east-fenestration-area-sunlit": z.number(),
  "south-fenestration-area-shaded": z.number(),
  "south-fenestration-area-sunlit": z.number(),
  "west-fenestration-area-shaded": z.number(),
  "west-fenestration-area-sunlit": z.number(),
  "indoor-shading": z.string(),
  "u-value-window": z.number(),
  "beam-solar-heat-gain-coefficient": z.number(),
  "diffuse-solar-heat-gain-coefficient": z.number(),
  "beam-indoor-solar-attenuation-coefficient": z.number(),
  "diffuse-indoor-solar-attenuation-coefficient": z.number(),
  "lighting-type": z.string(),
  "number-lighting": z.number(),
  "lighting-rating": z.number(),
  "activity-type": z.string(),
  "activity-location": z.string(),
  "velocity-type": z.string(),
  "occupant-capacity": z.number(),
  "start-hour": z.string(),
  "end-hour": z.string(),
  "percentage-MDHR": z.string(),
  "infiltration-rate": z.number(),
  "fenestration-area": z.number(),
  "floor-area": z.number(),
});

export type RoomData = z.infer<typeof roomSchema>;

const fieldNames: { name: keyof RoomData; label: string; type?: string }[] = [
  { name: "title", label: "Title" },
  { name: "construction", label: "Construction" },
  { name: "construction-subtype", label: "Construction Subtype" },
  { name: "percentage-glass", label: "Percentage Glass" },
  { name: "wall-type", label: "Wall Type" },
  { name: "city", label: "City" },
  { name: "month", label: "Month" },
  { name: "percentage-MDDB", label: "Percentage MDDB" },
  { name: "LSM", label: "LSM", type: "number" },
  { name: "north-wall-area", label: "North Wall Area", type: "number" },
  { name: "east-wall-area", label: "East Wall Area", type: "number" },
  { name: "south-wall-area", label: "South Wall Area", type: "number" },
  { name: "west-wall-area", label: "West Wall Area", type: "number" },
  { name: "roof-type", label: "Roof Type" },
  { name: "roof-area", label: "Roof Area", type: "number" },
  {
    name: "north-fenestration-area-shaded",
    label: "North Fenestration Shaded",
    type: "number",
  },
  {
    name: "north-fenestration-area-sunlit",
    label: "North Fenestration Sunlit",
    type: "number",
  },
  {
    name: "east-fenestration-area-shaded",
    label: "East Fenestration Shaded",
    type: "number",
  },
  {
    name: "east-fenestration-area-sunlit",
    label: "East Fenestration Sunlit",
    type: "number",
  },
  {
    name: "south-fenestration-area-shaded",
    label: "South Fenestration Shaded",
    type: "number",
  },
  {
    name: "south-fenestration-area-sunlit",
    label: "South Fenestration Sunlit",
    type: "number",
  },
  {
    name: "west-fenestration-area-shaded",
    label: "West Fenestration Shaded",
    type: "number",
  },
  {
    name: "west-fenestration-area-sunlit",
    label: "West Fenestration Sunlit",
    type: "number",
  },
  { name: "indoor-shading", label: "Indoor Shading" },
  { name: "u-value-window", label: "U-Value Window", type: "number" },
  {
    name: "beam-solar-heat-gain-coefficient",
    label: "Beam SHGC",
    type: "number",
  },
  {
    name: "diffuse-solar-heat-gain-coefficient",
    label: "Diffuse SHGC",
    type: "number",
  },
  {
    name: "beam-indoor-solar-attenuation-coefficient",
    label: "Beam Indoor SAC",
    type: "number",
  },
  {
    name: "diffuse-indoor-solar-attenuation-coefficient",
    label: "Diffuse Indoor SAC",
    type: "number",
  },
  { name: "lighting-type", label: "Lighting Type" },
  {
    name: "number-lighting",
    label: "Number of Lighting Fixtures",
    type: "number",
  },
  { name: "lighting-rating", label: "Lighting Rating", type: "number" },
  { name: "activity-type", label: "Activity Type" },
  { name: "activity-location", label: "Activity Location" },
  { name: "velocity-type", label: "Velocity Type" },
  { name: "occupant-capacity", label: "Occupant Capacity", type: "number" },
  { name: "start-hour", label: "Start Hour" },
  { name: "end-hour", label: "End Hour" },
  { name: "percentage-MDHR", label: "Percentage MDHR" },
  { name: "infiltration-rate", label: "Infiltration Rate", type: "number" },
  { name: "fenestration-area", label: "Fenestration Area", type: "number" },
  { name: "floor-area", label: "Floor Area", type: "number" },
];

const defaultValues: RoomData = {
  title: "Room 123",
  construction: "light",
  "construction-subtype": "with carpet",
  "percentage-glass": "50%",
  "wall-type": "Wall 1",
  city: "Atlanta",
  month: "Jul",
  "percentage-MDDB": "5.0%",
  LSM: 75,
  "north-wall-area": 5.57,
  "east-wall-area": 5.57,
  "south-wall-area": 5.57,
  "west-wall-area": 5.57,
  "roof-type": "Roof 1",
  "roof-area": 12,
  "north-fenestration-area-shaded": 0.0,
  "north-fenestration-area-sunlit": 0.0,
  "east-fenestration-area-shaded": 3.72,
  "east-fenestration-area-sunlit": 0.0,
  "south-fenestration-area-shaded": 3.72,
  "south-fenestration-area-sunlit": 0.0,
  "west-fenestration-area-shaded": 3.72,
  "west-fenestration-area-sunlit": 0.0,
  "indoor-shading": "True",
  "u-value-window": 3.15,
  "beam-solar-heat-gain-coefficient": 0.3978,
  "diffuse-solar-heat-gain-coefficient": 0.41,
  "beam-indoor-solar-attenuation-coefficient": 0.653,
  "diffuse-indoor-solar-attenuation-coefficient": 0.79,
  "lighting-type": "non-in-celing fluorescent luminaire",
  "number-lighting": 5,
  "lighting-rating": 19,
  "activity-type": "seated",
  "activity-location": "theater (matinee)",
  "velocity-type": "low velocity",
  "occupant-capacity": 4,
  "start-hour": "08:00",
  "end-hour": "17:00",
  "percentage-MDHR": "5.0%",
  "infiltration-rate": 0.041,
  "fenestration-area": 20.2,
  "floor-area": 9.1,
};

const RoomForm = () => {
  const { buildingId } = useParams();
  const { AddRoomWithBuilding, isLoading } = useConsumerStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomData>({
    resolver: zodResolver(roomSchema),
    defaultValues,
  });

  const onSubmit = async (data: RoomData) => {
    const addRoomData = {
      ...data,
      buildingId: buildingId!,
    };

    console.log("addRoomData", addRoomData);
    try {
      if (addRoomData) {
        await AddRoomWithBuilding(addRoomData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <CommonWrapper>
      <h2 className="text-2xl font-bold mb-2 text-primary py-5">
        Add room with building
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center"
      >
        {fieldNames.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-primary-gray block mb-1">
              {field.label}
            </label>
            <input
              {...register(field.name)}
              type={field.type ?? "text"}
              step={field.type === "number" ? "any" : undefined}
              className="w-full border border-primary-gray p-2"
            />
            {errors[field.name] && (
              <span className="text-red-500 text-xs sm:text-sm">
                {errors[field.name]?.message?.toString()}
              </span>
            )}
          </div>
        ))}

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
      {isLoading && <Loading />}
    </CommonWrapper>
  );
};
export default RoomForm;
