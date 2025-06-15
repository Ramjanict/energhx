import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiCloseLargeLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminCommonButton from "../Common/AdminCommonButton";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import ProgramCard from "../Common/ProgramCard";
import { z } from "zod";

// Schema
export const programSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be positive"),
  thumbnail: z.union([
    z.instanceof(File).refine((file) => file.size > 0, "Thumbnail is required"),
    z.string().min(1, "Thumbnail is required"),
  ]),
  publishedFor: z.enum(["DEVELOPER", "SERVER"]),
});

type ProgramFormData = z.infer<typeof programSchema>;

const Program: React.FC = () => {
  const { createProgram, isLoading, allProgram, getAllProgram, updateProgram } =
    useAdminStore();

  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] =
    useState<ProgramFormData | null>(null);
  const [programId, setProgramId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    getAllProgram();
  }, [getAllProgram]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
      publishedFor: "DEVELOPER",
    },
  });

  const onSubmit = async (data: ProgramFormData) => {
    const formData = new FormData();
    const { thumbnail, ...restData } = data;
    formData.append("text", JSON.stringify(restData));

    if (thumbnail instanceof File) {
      formData.append("file", thumbnail);
    }

    programId && selectedProgram
      ? await updateProgram(programId, formData)
      : await createProgram(formData);

    getAllProgram();
    setIsProgramOpen(false);
    setSelectedProgram(null);
    setProgramId(null);
    setPreview(null);
    reset();
  };

  useEffect(() => {
    if (selectedProgram) {
      const { thumbnail, ...rest } = selectedProgram;
      setPreview(typeof thumbnail === "string" ? thumbnail : null);
      reset({ ...rest, thumbnail });
    } else {
      setPreview(null);
    }
  }, [selectedProgram, reset]);

  return (
    <div>
      <AdminCommonHeader>All Programs</AdminCommonHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {allProgram?.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onEdit={() => {
              setSelectedProgram(program);
              setIsProgramOpen(true);
              setProgramId(program.id);
            }}
          />
        ))}
      </div>

      <div className="pb-10">
        <button
          onClick={() => setIsProgramOpen(true)}
          className="w-fit bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Create Program
        </button>
      </div>

      {isProgramOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity min-h-screen flex items-center justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8"
            >
              <div className="w-full flex justify-between items-center">
                <AdminCommonHeader className="!pb-0">
                  {selectedProgram ? "Update Program" : "Create Program"}
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsProgramOpen(false);
                    setSelectedProgram(null);
                    setPreview(null);
                    reset();
                  }}
                  className="text-xl cursor-pointer hover:text-red-500"
                >
                  <RiCloseLargeLine />
                </div>
              </div>

              <div>
                <label className="text-primary-gray block mb-1">Title</label>
                <input
                  {...register("title")}
                  className="w-full border border-primary-gray p-2 outline-none"
                  placeholder="Enter title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-primary-gray block mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full border border-primary-gray p-2 outline-none"
                  placeholder="Enter description"
                  rows={5}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-primary-gray block mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  className="w-full border border-primary-gray p-2 outline-none"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-primary-gray block mb-1">
                  Thumbnail
                </label>
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

              <div>
                <label className="text-primary-gray block mb-1">Publish</label>
                <Controller
                  name="publishedFor"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                        <SelectValue placeholder="Choose audience" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        <SelectItem
                          value="SERVER"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          SERVER
                        </SelectItem>
                        <SelectItem
                          value="DEVELOPER"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          DEVELOPER
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.publishedFor && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.publishedFor.message}
                  </p>
                )}
              </div>

              <AdminCommonButton>
                {isLoading
                  ? "Processing..."
                  : selectedProgram
                  ? "Update Program"
                  : "Create Program"}
              </AdminCommonButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Program;
