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
import { AllAdmin } from "@/store/AdminStore/type/allAdmin";

const adminFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  sex: z.enum(["MALE", "FEMALE"]),
  companyName: z.string().min(1, "Company name is required"),
  streetNumber: z.number({
    invalid_type_error: "Street number must be a number",
  }),
  street: z.string().min(1, "Street is required"),
  postalCode: z.number({ invalid_type_error: "Postal code must be a number" }),
  city: z.string().min(1, "City is required"),
  countryId: z.string().uuid("Invalid country ID"),
  stateId: z.string().uuid("Invalid state ID"),
  canAccess: z.enum(["DEVELOPER", "SERVER"]),
  thumbnail: z.union([
    z.instanceof(File).refine((file) => file.size > 0, "Thumbnail is required"),
    z.string().min(1, "Thumbnail is required"),
  ]),
});

type AdminFormSchema = z.infer<typeof adminFormSchema>;

const CreateAdmin = () => {
  const {
    allCountry,
    allSates,
    countries,
    states,
    addAdmin,
    updateAdmin,
    allAdmin,
    isAdminAdding,
    isAdminFetchingAll,
    isAdminUpdating,
    getAllAdmin,
  } = useAdminStore();

  const [preview, setPreview] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminFormSchema | null>(
    null
  );
  const [adminId, setAdminId] = useState<string | null>(null);

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
    if (thumbnail instanceof File) formData.append("file", thumbnail);

    adminId && selectedAdmin
      ? await updateAdmin(adminId, formData)
      : await addAdmin(formData);

    getAllAdmin();
    setIsAdminOpen(false);
    setSelectedAdmin(null);
    setAdminId(null);
    setPreview(null);
    reset();
  };

  useEffect(() => {
    countries();
  }, [countries]);

  useEffect(() => {
    if (selectedAdmin) {
      const { thumbnail, ...rest } = selectedAdmin;
      setPreview(typeof thumbnail === "string" ? thumbnail : null);
      reset(rest);
    } else {
      setPreview(null);
      reset();
    }
  }, [selectedAdmin, reset]);

  const handleEditAdmin = (admin: AllAdmin) => {
    const { user, canAccess } = admin;
    setSelectedAdmin({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      companyName: user.companyName,
      streetNumber: user.streetNumber,
      street: user.street,
      postalCode: user.postalCode,
      city: user.city,
      countryId: user.countryId,
      stateId: user.stateId,
      canAccess,
      thumbnail: user.profile_photo,
    });
    setIsAdminOpen(true);
    setAdminId(admin.id);
  };
  return (
    <div className="">
      <AdminCommonHeader>All Admin</AdminCommonHeader>

      <AdminCommonButton onClick={() => getAllAdmin()} className="!w-fit">
        {isAdminFetchingAll ? "Processing..." : "Show Admin"}
      </AdminCommonButton>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
          allAdmin.length > 0 ? "py-8" : ""
        }`}
      >
        {allAdmin?.map((admin) => (
          <AdminCard
            key={admin.id}
            admin={admin}
            onEdit={() => handleEditAdmin(admin)}
          />
        ))}
      </div>
      {!isAdminOpen && (
        <AdminCommonButton
          onClick={() => setIsAdminOpen(true)}
          className={`!w-fit mb-20 ${allAdmin.length > 0 ? "" : "mt-6"}`}
        >
          Create Admin
        </AdminCommonButton>
      )}
      {isAdminOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity min-h-screen flex items-center justify-center">
          <div className="w-full  flex flex-col justify-center items-center gap-10 h-full overflow-hidden">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8 my-10   overflow-y-scroll"
            >
              <div className="w-full flex justify-between items-center ">
                <AdminCommonHeader className="!pb-0">
                  {selectedAdmin ? "Update Admin" : "Create Admin"}
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsAdminOpen(false);
                    setSelectedAdmin(null);
                  }}
                  className="text-xl cursor-pointer hover:text-red-500"
                >
                  <RiCloseLargeLine />
                </div>
              </div>

              <div>
                <label
                  htmlFor="firstName"
                  className="text-primary-gray text-md"
                >
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
                <label
                  htmlFor="sex"
                  className="text-primary-gray text-md block mb-1"
                >
                  Sex
                </label>

                <Controller
                  control={control}
                  name="sex"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full border border-primary-gray p-2 outline-none">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sex && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.sex.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="text-primary-gray text-md"
                >
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
                <label
                  htmlFor="streetNumber"
                  className="text-primary-gray text-md"
                >
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
                <label
                  htmlFor="postalCode"
                  className="text-primary-gray text-md"
                >
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
                <label
                  htmlFor="countryId"
                  className="text-primary-gray block mb-1"
                >
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
                <label
                  htmlFor="stateId"
                  className="text-primary-gray block mb-1"
                >
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
                <label
                  htmlFor="canAccess"
                  className="text-primary-gray text-md block mb-1"
                >
                  Access Level
                </label>

                <Controller
                  control={control}
                  name="canAccess"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full border border-primary-gray p-2 outline-none rounded-none">
                        <SelectValue placeholder="Select Admin" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        <SelectItem value="DEVELOPER">DEVELOPER</SelectItem>
                        <SelectItem value="SERVER">SERVER</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.canAccess && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
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

              <AdminCommonButton>
                {isAdminAdding || isAdminUpdating
                  ? "Processing..."
                  : selectedAdmin
                  ? "Update Admin"
                  : "Create Admin"}
              </AdminCommonButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAdmin;
