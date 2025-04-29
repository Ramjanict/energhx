import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashBoardHeader from "@/common/DashBoardHeader";
import CommonWrapper from "@/common/CommonWrapper";
import { basicConsumerStore } from "@/store/ConsumerStore";
// Define Zod schemas
const applianceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // Add other appliance fields as needed
});

const airConditionerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // Add other AC fields as needed
});

const batterySchema = z.object({
  title: z.string().min(1, "Title is required"),
  "battery-manufacturer": z.string().min(1, "Manufacturer is required"),
  "battery-class": z.string().min(1, "Class is required"),
  "battery-model": z.string().min(1, "Model is required"),
  "battery-length": z.number().min(0, "Must be positive"),
  "battery-diameter": z.number().min(0, "Must be positive"),
  "battery-height": z.number().min(0, "Must be positive").optional(),
  "battery-width": z.number().min(0, "Must be positive").optional(),
  "battery-thickness": z.number().min(0, "Must be positive").optional(),
  "battery-mass": z.number().min(0, "Must be positive"),
  "battery-capacity": z.number().min(0, "Must be positive"),
  "battery-voltage": z.number().min(0, "Must be positive"),
  "battery-peak-C-rate": z.number().min(0, "Must be positive"),
  "battery-continous-C-rate": z.number().min(0, "Must be positive"),
  "average-energy-consumption": z.number().min(0, "Must be positive"),
  "vehicle-range": z.number().min(0, "Must be positive"),
  "nominal-voltage": z.number().min(0, "Must be positive"),
});

const roomSchema = z.object({
  title: z.string().min(1, "Title is required"),
  construction: z.string().min(1, "Construction type is required"),
  "construction-subtype": z.string().min(1, "Construction subtype is required"),
  "percentage-glass": z.string().regex(/^\d+%$/, "Must be a percentage"),
  "wall-type": z.string().min(1, "Wall type is required"),
  city: z.string().min(1, "City is required"),
  month: z.string().min(1, "Month is required"),
  "percentage-MDDB": z.string().regex(/^\d+\.?\d*%$/, "Must be a percentage"),
  LSM: z.number().min(0, "Must be positive"),
  "north-wall-area": z.number().min(0, "Must be positive"),
  "east-wall-area": z.number().min(0, "Must be positive"),
  "south-wall-area": z.number().min(0, "Must be positive"),
  "west-wall-area": z.number().min(0, "Must be positive"),
  "roof-type": z.string().min(1, "Roof type is required"),
  "roof-area": z.number().min(0, "Must be positive"),
  "north-fenestration-area-shaded": z.number().min(0, "Must be positive"),
  "north-fenestration-area-sunlit": z.number().min(0, "Must be positive"),
  "east-fenestration-area-shaded": z.number().min(0, "Must be positive"),
  "east-fenestration-area-sunlit": z.number().min(0, "Must be positive"),
  "south-fenestration-area-shaded": z.number().min(0, "Must be positive"),
  "south-fenestration-area-sunlit": z.number().min(0, "Must be positive"),
  "west-fenestration-area-shaded": z.number().min(0, "Must be positive"),
  "west-fenestration-area-sunlit": z.number().min(0, "Must be positive"),
  "indoor-shading": z.union([z.literal("True"), z.literal("False")]),
  "u-value-window": z.number().min(0, "Must be positive"),
  "beam-solar-heat-gain-coefficient": z.number().min(0, "Must be positive"),
  "diffuse-solar-heat-gain-coefficient": z.number().min(0, "Must be positive"),
  "beam-indoor-solar-attenuation-coefficient": z
    .number()
    .min(0, "Must be positive"),
  "diffuse-indoor-solar-attenuation-coefficient": z
    .number()
    .min(0, "Must be positive"),
  "lighting-type": z.string().min(1, "Lighting type is required"),
  "number-lighting": z.number().min(0, "Must be positive"),
  "lighting-rating": z.number().min(0, "Must be positive"),
  "activity-type": z.string().min(1, "Activity type is required"),
  "activity-location": z.string().min(1, "Activity location is required"),
  "velocity-type": z.string().min(1, "Velocity type is required"),
  "occupant-capacity": z.number().min(0, "Must be positive"),
  "start-hour": z.string().regex(/^\d{2}:\d{2}$/, "Must be HH:MM format"),
  "end-hour": z.string().regex(/^\d{2}:\d{2}$/, "Must be HH:MM format"),
  "percentage-MDHR": z.string().regex(/^\d+\.?\d*%$/, "Must be a percentage"),
  "infiltration-rate": z.number().min(0, "Must be positive"),
  "fenestration-area": z.number().min(0, "Must be positive"),
  "floor-area": z.number().min(0, "Must be positive"),
  appliances: z.array(applianceSchema).optional(),
  "air-conditioners": z.array(airConditionerSchema).optional(),
});

const buildingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  rooms: z.array(roomSchema).min(1, "At least one room is required"),
  batteries: z.array(batterySchema).optional(),
});

const formSchema = z.object({
  buildings: z
    .array(buildingSchema)
    .min(1, "At least one building is required"),
});

type FormData = z.infer<typeof formSchema>;

export interface EnergyAuditMicroServiceForm {
  nextStep: () => void;
}
const EnergyAuditMicroServiceForm: React.FC<EnergyAuditMicroServiceForm> = ({
  nextStep,
}) => {
  const { postEnergyAudit } = basicConsumerStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildings: [
        {
          title: "Building 1",
          rooms: [
            {
              title: "Room 1",
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
              "occupant-capacity": 12,
              "start-hour": "08:00",
              "end-hour": "17:00",
              "percentage-MDHR": "5.0%",
              "infiltration-rate": 0.041,
              "fenestration-area": 20.2,
              "floor-area": 5.8,
              appliances: [],
              "air-conditioners": [],
            },
          ],
          batteries: [
            {
              title: "EV Battery Sizing",
              "battery-manufacturer": "Panasonic",
              "battery-class": "cylindrical",
              "battery-model": "NCR18650B",
              "battery-length": 0.0653,
              "battery-diameter": 0.0185,
              "battery-height": 0,
              "battery-width": 0,
              "battery-thickness": 0,
              "battery-mass": 0.0485,
              "battery-capacity": 3.2,
              "battery-voltage": 3.6,
              "battery-peak-C-rate": 1,
              "battery-continous-C-rate": 1,
              "average-energy-consumption": 161.7451,
              "vehicle-range": 250,
              "nominal-voltage": 450,
            },
          ],
        },
      ],
    },
  });

  const buildings = watch("buildings");

  const onSubmit = (data: FormData) => {
    postEnergyAudit(data);
    nextStep();
    console.log(data);
  };

  return (
    <CommonWrapper>
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-10">
          <DashBoardHeader>Energy Audit</DashBoardHeader>
          {buildings.length > 0 && (
            <div>
              {/* Current Building */}
              <div>
                <DashBoardHeader className="py-4">
                  {buildings[0].title}
                </DashBoardHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div>
                    <label className="text-primary-gray block mb-1">
                      Building Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-primary-gray p-2 outline-none"
                      {...register(`buildings.${0}.title`)}
                    />
                    {errors.buildings?.[0]?.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.buildings[0]?.title?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  {buildings[0].rooms.length > 0 && (
                    <div>
                      <DashBoardHeader className="py-4">
                        {buildings[0].rooms[0].title}
                      </DashBoardHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Basic Info */}
                        <div>
                          <label className="text-primary-gray block mb-1">
                            Room Title
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(`buildings.${0}.rooms.${0}.title`)}
                          />
                          {errors.buildings?.[0]?.rooms?.[0]?.title && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.buildings[0]?.rooms?.[0]?.title?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            Construction Type
                          </label>
                          <select
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.construction`
                            )}
                          >
                            <option value="light">Light</option>
                            <option value="medium">Medium</option>
                            <option value="heavy">Heavy</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            Construction Subtype
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.construction-subtype`
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            Percentage Glass
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.percentage-glass`
                            )}
                          />
                        </div>

                        {/* Wall Areas */}
                        <div>
                          <label className="text-primary-gray block mb-1">
                            North Wall Area (m²)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.north-wall-area`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            East Wall Area (m²)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.east-wall-area`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            South Wall Area (m²)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.south-wall-area`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            West Wall Area (m²)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.west-wall-area`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        {/* Fenestration Areas */}
                        <div>
                          <label className="text-primary-gray block mb-1">
                            North Fenestration Shaded (m²)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.north-fenestration-area-shaded`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            East Fenestration Shaded (m²)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.east-fenestration-area-shaded`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        {/* Add more fields as needed... */}

                        {/* Lighting */}
                        <div>
                          <label className="text-primary-gray block mb-1">
                            Lighting Type
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.lighting-type`
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            Number of Lighting
                          </label>
                          <input
                            type="number"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.number-lighting`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        {/* Activity */}
                        <div>
                          <label className="text-primary-gray block mb-1">
                            Activity Type
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.activity-type`
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            Occupant Capacity
                          </label>
                          <input
                            type="number"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.occupant-capacity`,
                              { valueAsNumber: true }
                            )}
                          />
                        </div>

                        {/* Time */}
                        <div>
                          <label className="text-primary-gray block mb-1">
                            Start Hour
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(
                              `buildings.${0}.rooms.${0}.start-hour`
                            )}
                          />
                        </div>

                        <div>
                          <label className="text-primary-gray block mb-1">
                            End Hour
                          </label>
                          <input
                            type="text"
                            className="w-full border border-primary-gray p-2 outline-none"
                            {...register(`buildings.${0}.rooms.${0}.end-hour`)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Batteries Section */}
                <div>
                  <DashBoardHeader className="py-4">Batteries</DashBoardHeader>
                  {buildings[0].batteries &&
                    buildings[0].batteries!.length > 0 && (
                      <div>
                        {buildings[0].batteries!.map((battery, batIndex) => (
                          <div key={batIndex}>
                            <h4 className="font-medium">{battery.title}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div>
                                <label className="text-primary-gray block mb-1">
                                  Battery Manufacturer
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-primary-gray p-2 outline-none"
                                  {...register(
                                    `buildings.${0}.batteries.${batIndex}.battery-manufacturer`
                                  )}
                                />
                              </div>

                              <div>
                                <label className="text-primary-gray block mb-1">
                                  Battery Model
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-primary-gray p-2 outline-none"
                                  {...register(
                                    `buildings.${0}.batteries.${batIndex}.battery-model`
                                  )}
                                />
                              </div>

                              <div>
                                <label className="text-primary-gray block mb-1">
                                  Battery Capacity (Ah)
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-full border border-primary-gray p-2 outline-none"
                                  {...register(
                                    `buildings.${0}.batteries.${batIndex}.battery-capacity`,
                                    { valueAsNumber: true }
                                  )}
                                />
                              </div>

                              <div>
                                <label className="text-primary-gray block mb-1">
                                  Nominal Voltage (V)
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-full border border-primary-gray p-2 outline-none"
                                  {...register(
                                    `buildings.${0}.batteries.${batIndex}.nominal-voltage`,
                                    { valueAsNumber: true }
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end py-6">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    </CommonWrapper>
  );
};

export default EnergyAuditMicroServiceForm;
