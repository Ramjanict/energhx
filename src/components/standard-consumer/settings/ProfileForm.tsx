import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserFormData } from "./ProfileSchema";

interface ProfileFormProps {
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;
  profilePhotoPreview: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  register,
  errors,

  onSubmit,
  isSubmitting,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16"
    >
      <div>
        <label htmlFor="firstName" className="text-primary-gray text-md ">
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          className=" w-full  border border-primary-gray p-2 outline-none"
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
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          className=" w-full  border border-primary-gray p-2 outline-none"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs sm:text-sm">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="otherName" className="text-primary-gray text-md">
          Other Name
        </label>
        <input
          type="text"
          id="otherName"
          className=" w-full  border border-primary-gray p-2 outline-none"
          {...register("otherName")}
        />
      </div>

      <div>
        <label htmlFor="sex" className="text-primary-gray text-md">
          Sex *
        </label>
        <select
          id="sex"
          className=" w-full  border border-primary-gray p-2 outline-none"
          {...register("sex")}
        >
          <option value="">Select Gender</option>
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
          className=" w-full  border border-primary-gray p-2 outline-none"
          {...register("companyName")}
        />
      </div>

      <div>
        <label htmlFor="streetNumber" className="text-primary-gray text-md">
          Street Number *
        </label>
        <input
          type="number"
          id="streetNumber"
          className=" w-full  border border-primary-gray p-2 outline-none"
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
          className=" w-full  border border-primary-gray p-2 outline-none"
          {...register("street")}
        />
      </div>

      <div>
        <label htmlFor="postalCode" className="text-primary-gray text-md">
          Postal Code *
        </label>
        <input
          type="number"
          id="postalCode"
          className=" w-full  border border-primary-gray p-2 outline-none"
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
          className=" w-full  border border-primary-gray p-2 outline-none"
          {...register("city")}
        />
      </div>

      <div className="col-span-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
