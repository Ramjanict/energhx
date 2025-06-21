import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseLargeLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect, useState } from "react";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import AdminCard from "../Common/AdminCard";
import AdminCommonButton from "../Common/AdminCommonButton";

// Zod Schema
const adminFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  sex: z.enum(["MALE", "FEMALE"]),
  companyName: z.string().min(1, { message: "Company name is required" }),
  streetNumber: z.number({
    invalid_type_error: "Street number must be a number",
  }),
  street: z.string().min(1, { message: "Street is required" }),
  postalCode: z.number({ invalid_type_error: "Postal code must be a number" }),
  city: z.string().min(1, { message: "City is required" }),
  countryId: z.string().uuid({ message: "Invalid country ID" }),
  stateId: z.string().uuid({ message: "Invalid state ID" }),
  canAccess: z.enum(["DEVELOPER", "ADMIN", "SERVER"]),
  thumbnail: z.union([
    z.instanceof(File).refine((file) => file.size > 0, "Thumbnail is required"),
    z.string().min(1, "Thumbnail is required"),
  ]),
});

type AdminFormSchema = z.infer<typeof adminFormSchema>;

const CreateAdmin = () => {
  const {
    allCountry,
    states,
    allSates,
    countries,
    addAdmin,
    isLoading,
    allAdmin,
    getAllAdmin,
  } = useAdminStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AdminFormSchema>({
    resolver: zodResolver(adminFormSchema),
  });

  const onSubmit = async (data: AdminFormSchema) => {
    const { thumbnail, ...restData } = data;
    const formData = new FormData();

    formData.append("text", JSON.stringify(restData));
    formData.append("file", thumbnail);
    try {
      await addAdmin(formData);
      reset();
    } catch (error) {}
    console.log("Submitted Data:", data);
  };

  useEffect(() => {
    countries();
  }, [countries]);
  useEffect(() => {
    getAllAdmin();
  }, [getAllAdmin]);

  return (
    <div>
      <AdminCommonHeader>All Admin</AdminCommonHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {allAdmin?.map((admin) => (
          <AdminCard key={admin.id} admin={admin} />
        ))}
      </div>

      {!isAdminOpen && (
        <div className="pb-10">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="w-fit bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Add Admin
          </button>
        </div>
      )}

      {isAdminOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" gap-6 bg-white   shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
        >
          <div className="w-full flex justify-between items-center sm:col-span-2 md:col-span-3">
            <AdminCommonHeader className="!pb-0">Add Admin</AdminCommonHeader>
            <div
              onClick={() => {
                setIsAdminOpen(false);
              }}
              className="text-xl cursor-pointer hover:text-red-500"
            >
              <RiCloseLargeLine />
            </div>
          </div>

          <div>
            <label htmlFor="firstName" className="text-primary-gray text-md">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="text-primary-gray text-md">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-primary-gray text-md">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="sex" className="text-primary-gray text-md">
              Sex
            </label>
            <select
              id="sex"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("sex")}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.sex && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.sex.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="companyName" className="text-primary-gray text-md">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="streetNumber" className="text-primary-gray text-md">
              Street Number
            </label>
            <input
              type="number"
              id="streetNumber"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("streetNumber", { valueAsNumber: true })}
            />
            {errors.streetNumber && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.streetNumber.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="street" className="text-primary-gray text-md">
              Street
            </label>
            <input
              type="text"
              id="street"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("street")}
            />
            {errors.street && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.street.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="text-primary-gray text-md">
              Postal Code
            </label>
            <input
              type="number"
              id="postalCode"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("postalCode", { valueAsNumber: true })}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="text-primary-gray text-md">
              City
            </label>
            <input
              type="text"
              id="city"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.city.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="countryId" className="text-primary-gray block mb-1">
              Country
            </label>
            <Controller
              name="countryId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    states(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                    <SelectValue placeholder="Choose country" />
                  </SelectTrigger>
                  <SelectContent className="bg-light-green">
                    {allCountry?.map((country) => (
                      <SelectItem
                        key={country.id}
                        value={country.id}
                        className="hover:bg-primary-green hover:text-white"
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.countryId && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.countryId.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="stateId" className="text-primary-gray block mb-1">
              Province
            </label>
            <Controller
              name="stateId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                    <SelectValue placeholder="Choose province" />
                  </SelectTrigger>
                  <SelectContent className="bg-light-green">
                    {allSates?.map((state) => (
                      <SelectItem
                        key={state.id}
                        value={state.id}
                        className="hover:bg-primary-green hover:text-white"
                      >
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.stateId && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.stateId.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="canAccess" className="text-primary-gray text-md">
              Access Level
            </label>
            <select
              id="canAccess"
              className="w-full border border-primary-gray p-2 outline-none"
              {...register("canAccess")}
            >
              <option value="">Select</option>
              <option value="DEVELOPER">Developer</option>
              <option value="SERVER">Admin</option>
            </select>
            {errors.canAccess && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.canAccess.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="text-primary-gray block mb-1">Photo</label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setValue("thumbnail", file, { shouldValidate: true });
                }
              }}
            />

            {!preview && (
              <label
                htmlFor="thumbnail"
                className="block cursor-pointer border border-primary-gray py-2 px-4 text-primary-gray hover:bg-primary-green hover:text-white transition"
              >
                Upload Thumbnail
              </label>
            )}

            {preview && (
              <div className="w-full mt-2">
                <img
                  src={preview}
                  alt="Thumbnail Preview"
                  className="w-fit max-h-20 object-contain border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setValue("thumbnail", "", { shouldValidate: true });
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer mt-1"
                >
                  Remove
                </button>
              </div>
            )}

            {errors.thumbnail && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2 md:col-span-3 w-fit py-5">
            <AdminCommonButton>
              {isLoading ? "Processing..." : "Add Admin"}
            </AdminCommonButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateAdmin;
