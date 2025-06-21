import { useAdminStore } from "@/store/AdminStore/AdminStore";
import UserProfileData from "./UserProfileData";
import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner from "../../../assets/profile-banner.jpeg";
import user from "../../../assets/man.jpeg";
import { UserFormData, userSchema } from "./ProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Profile = () => {
  const { DevUser, updateUser, getUser } = useAdminStore();
  const [isEdit, setIsEdit] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>(
    DevUser?.user?.profile_photo || ""
  );

  useEffect(() => {
    getUser();
  }, [getUser]);
  console.log("DevUser", DevUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: DevUser?.user?.firstName || "",
      lastName: DevUser?.user?.lastName || "",
      otherName: DevUser?.user?.otherName || "",
      companyName: DevUser?.user?.companyName || "",
      sex: DevUser?.user?.sex || "",
      streetNumber: DevUser?.user?.streetNumber || undefined,
      street: DevUser?.user?.street || "",
      postalCode: DevUser?.user?.postalCode || undefined,
      city: DevUser?.user?.city || "",
      profilePhoto: DevUser?.user?.profile_photo || "",
    },
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhotoPreview(result);
        setValue("profilePhoto", result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data: UserFormData) => {
    try {
      const formdata = new FormData();
      const { profilePhoto, ...restData } = data;

      // Handle profile photo if it exists (as File from upload)
      const photoInput = document.getElementById(
        "profile-upload"
      ) as HTMLInputElement;
      if (photoInput?.files?.[0]) {
        formdata.append("file", photoInput.files[0]);
      }

      // Append all other form data as JSON
      formdata.append("text", JSON.stringify(restData));

      await updateUser(formdata);
      getUser();
      setIsEdit(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    reset();
    setProfilePhotoPreview(DevUser?.user?.profile_photo || "");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div
        className="relative h-48 bg-cover bg-center bg-no-repeat rounded-md"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={profilePhotoPreview || user} />
              <AvatarFallback>
                <User className="h-12 w-12 text-gray-400" />
              </AvatarFallback>
            </Avatar>

            {isEdit && (
              <>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 cursor-pointer"
                  onClick={() =>
                    document.getElementById("profile-upload")?.click()
                  }
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={isEdit ? handleCancel : () => setIsEdit(true)}
        className={`${
          isEdit
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-primary-dark"
        } text-white text-lg rounded-md px-6 py-2 cursor-pointer w-fit ml-auto block my-5 transition-colors`}
      >
        {isEdit ? "Cancel" : "Edit Profile"}
      </button>

      {/* Form vs View */}
      {isEdit ? (
        <ProfileForm
          register={register}
          errors={errors}
          profilePhotoPreview={profilePhotoPreview}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          onPhotoUpload={handlePhotoUpload}
        />
      ) : (
        DevUser && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
            <UserProfileData
              label="First Name"
              value={DevUser?.user?.firstName}
            />
            <UserProfileData
              label="Last Name"
              value={DevUser?.user?.lastName}
            />
            <UserProfileData
              label="Other Name"
              value={DevUser?.user?.otherName}
            />
            <UserProfileData
              label="Company Name"
              value={DevUser?.user?.companyName}
            />
            <UserProfileData label="Sex" value={DevUser?.user?.sex} />
            <UserProfileData
              label="Street Number"
              value={DevUser?.user?.streetNumber}
            />
            <UserProfileData label="Street" value={DevUser?.user?.street} />
            <UserProfileData
              label="Postal Code"
              value={DevUser?.user?.postalCode}
            />
            <UserProfileData label="City" value={DevUser?.user?.city} />
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
