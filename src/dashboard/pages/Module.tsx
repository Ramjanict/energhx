import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminCommonButton from "../Common/AdminCommonButton";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { RiCloseLargeLine } from "react-icons/ri";
import ModuleCard from "../Common/ModuleCard";
import AllCourse from "../components/AllCourse";

// Zod Schema
export const moduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.union([
    z.instanceof(File).refine((file) => file.size > 0, "Thumbnail is required"),
    z.string().min(1, "Thumbnail is required"),
  ]),
  courseId: z
    .string()
    .uuid("Course ID must be a valid UUID")
    .min(1, "Course ID is required"),
});

export type ModuleFormData = z.infer<typeof moduleSchema>;

const Module: React.FC = () => {
  const {
    createModule,
    isModuleCreating,
    isModuleUpdating,
    getAllCourse,
    allCourse,
    getAllModule,
    allModule,
    updateModule,
  } = useAdminStore();

  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleFormData | null>(
    null
  );
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [moduleId, setModuleId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      courseId: "",
    },
  });

  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    if (value) {
      getAllModule(value);
    }
  };

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  useEffect(() => {
    if (selectedModule) {
      const { title, thumbnail, courseId } = selectedModule;
      setPreview(typeof thumbnail === "string" ? thumbnail : null);
      reset({ title, thumbnail, courseId });
    } else {
      setPreview(null);
      reset();
    }
  }, [selectedModule, reset]);

  const onSubmit = async (data: ModuleFormData) => {
    const formData = new FormData();
    const { thumbnail, ...restData } = data;
    formData.append("text", JSON.stringify(restData));

    if (thumbnail instanceof File) {
      formData.append("file", thumbnail);
    }

    moduleId && selectedModule
      ? await updateModule(moduleId, formData)
      : await createModule(formData);

    if (selectedCourseId) {
      getAllModule(selectedCourseId);
    }

    setIsModuleOpen(false);
    setSelectedModule(null);
    setModuleId(null);
    setPreview(null);
    reset();
  };

  return (
    <div>
      <div className="flex items-center gap-6">
        <AdminCommonHeader className="!pb-0">Choose course</AdminCommonHeader>
        <AllCourse
          handleCourseChange={handleCourseChange}
          selectedCourseId={selectedCourseId}
        />
      </div>

      <div>
        <AdminCommonHeader className="pt-6 !text-sm">
          {Array.isArray(allModule?.modules) && allModule.modules.length > 0
            ? `Modules (${allModule.modules.length})`
            : "This course does not contain any modules"}
        </AdminCommonHeader>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
            allModule?.modules?.length ?? 0 > 0 ? "pb-8" : ""
          }`}
        >
          {allModule?.modules?.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              selectedCourseId={selectedCourseId}
              onEdit={() => {
                setSelectedModule(module);
                setIsModuleOpen(true);
                setModuleId(module.id);
              }}
            />
          ))}
        </div>

        <AdminCommonButton
          onClick={() => {
            setIsModuleOpen(true);
            setSelectedModule(null);
            setModuleId(null);
            setPreview(null);
            reset();
          }}
          className={`!w-fit ${
            allModule?.modules?.length ?? 0 > 0 ? "" : "mt-6"
          }`}
        >
          Create Module
        </AdminCommonButton>

        {isModuleOpen && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity min-h-screen flex items-center justify-center">
            <div className="w-full h-full flex flex-col justify-center items-center gap-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8"
              >
                <div className="w-full flex justify-between items-center">
                  <AdminCommonHeader className="!pb-0">
                    {selectedModule ? "Update Module" : "Create Module"}
                  </AdminCommonHeader>
                  <div
                    onClick={() => {
                      setIsModuleOpen(false);
                      setSelectedModule(null);
                      setModuleId(null);
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
                    type="text"
                    {...register("title")}
                    className="w-full border border-primary-gray p-2 outline-none"
                    placeholder="Enter module title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.title.message}
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
                  <label className="text-primary-gray block mb-1">
                    Choose your course
                  </label>
                  <Controller
                    name="courseId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full outline-none text-primary-gray rounded-none">
                          <SelectValue placeholder="Choose Course" />
                        </SelectTrigger>
                        <SelectContent className="bg-light-green">
                          {allCourse?.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.courseId && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.courseId.message}
                    </p>
                  )}
                </div>

                <AdminCommonButton>
                  {isModuleCreating || isModuleUpdating
                    ? "Processing..."
                    : selectedModule
                    ? "Update Module"
                    : "Create Module"}
                </AdminCommonButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;
