import banner from "../../../assets/profile-banner.jpeg";
import user from "../../../assets/man.jpeg";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera } from "lucide-react";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherName: z.string().optional(),
  profile_photo: z.string().optional(),
  companyName: z.string().optional(),
  streetNumber: z.number().min(1, "Street number must be positive"),
  street: z.string().optional(),
  postalCode: z.number().min(1, "Postal code must be positive"),
  city: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "John",
    lastName: "Doe",
    otherName: "",
    profile_photo: "",
    companyName: "",
    streetNumber: 0,
    street: "",
    postalCode: 0,
    city: "",
  });

  const [originalData, setOriginalData] = useState<ProfileFormData>(formData);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    if (field === "streetNumber" || field === "postalCode") {
      const numericValue = Number(value);
      setFormData((prev) => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const file = event.target.files?.[0];
    if (file && type === "profile") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhotoPreview(result);
        setFormData((prev) => ({ ...prev, profile_photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const zodErrors = result.error.flatten().fieldErrors;
      const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
      for (const key in zodErrors) {
        const typedKey = key as keyof ProfileFormData;
        newErrors[typedKey] = zodErrors[typedKey]?.[0] || "";
      }
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditMode(true);
    setErrors({});
    setProfilePhotoPreview(formData.profile_photo || "");
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditMode(false);
    setErrors({});
    setProfilePhotoPreview(originalData.profile_photo || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Profile saved:", formData);
      setOriginalData(formData);
      setIsEditMode(false);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const DisplayField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
        {label}
      </Label>
      <div className="p-3 bg-gray-50 border">
        <p className="text-gray-900">{value || "Not specified"}</p>
      </div>
    </div>
  );

  // *** FIXED typed fields array with optional type ***
  const fields: {
    id: keyof ProfileFormData;
    label: string;
    type?: string;
  }[] = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "otherName", label: "Other Name" },
    { id: "companyName", label: "Company Name" },
    { id: "streetNumber", label: "Street Number", type: "number" },
    { id: "street", label: "Street" },
    { id: "postalCode", label: "Postal Code", type: "number" },
    { id: "city", label: "City" },
  ];

  return (
    <div className="min-h-screen">
      <div>
        <div
          className="relative h-48 bg-cover bg-center bg-no-repeat rounded-md"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute -bottom-16 right-0 flex gap-2">
            {isEditMode ? (
              <button
                className="bg-red-400 text-white text-lg rounded-md px-6 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            ) : (
              <button
                className="bg-primary text-white text-lg rounded-md px-6 py-2"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={profilePhotoPreview || user} />
                <AvatarFallback className="bg-gray-200 text-2xl">
                  <User className="h-12 w-12 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              {isEditMode && (
                <>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0"
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
                    onChange={(e) => handlePhotoUpload(e, "profile")}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20 pb-4 px-8" />

        <CardContent>
          {isEditMode ? (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {fields.map(({ id, label, type }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input
                    id={id}
                    type={type || "text"}
                    value={
                      formData[id] === undefined ? "" : formData[id]?.toString()
                    }
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="w-full outline-none rounded-xs border border-[#9DA6A0] p-2"
                  />
                  {errors[id] && (
                    <p className="text-sm text-red-500">{errors[id]}</p>
                  )}
                </div>
              ))}

              <div className="pt-6 flex gap-4 col-span-full">
                {isSubmitting ? (
                  <span>Saving...</span>
                ) : (
                  <button
                    type="submit"
                    className="bg-primary text-white text-lg rounded-md px-6 py-2"
                  >
                    Save profile
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DisplayField label="First Name" value={formData.firstName} />
              <DisplayField label="Last Name" value={formData.lastName} />
              <DisplayField
                label="Other Name"
                value={formData.otherName || ""}
              />
              <DisplayField
                label="Company Name"
                value={formData.companyName || ""}
              />
              <DisplayField
                label="Street Number"
                value={formData.streetNumber?.toString() || ""}
              />
              <DisplayField label="Street" value={formData.street || ""} />
              <DisplayField
                label="Postal Code"
                value={formData.postalCode?.toString() || ""}
              />
              <DisplayField label="City" value={formData.city || ""} />
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}
