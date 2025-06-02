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
// Zod Schema
export const moduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  courseId: z
    .string()
    .uuid("Course ID must be a valid UUID")
    .min(1, "Course ID is required"),
});

export type ModuleFormData = z.infer<typeof moduleSchema>;

const Module: React.FC = () => {
  const {
    createModule,
    isLoading,
    getAllCourse,
    allCourse,
    getAllModule,
    allModule,
  } = useAdminStore();

  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleFormData | null>(
    null
  );

  console.log("allModule", allModule);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "solar video",
      thumbnail:
        "https://images.pexels.com/photos/1025990/pexels-photo-1025990.jpeg?auto=compress&cs=tinysrgb&w=600",
      courseId: "",
    },
  });

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  useEffect(() => {
    getAllModule();
  }, [getAllModule]);
  useEffect(() => {
    if (selectedModule) {
      reset(selectedModule);
    }
  }, [selectedModule, reset]);
  const onSubmit = async (data: ModuleFormData) => {
    await createModule(data);
    setIsModuleOpen(false);
    setSelectedModule(null);
    reset(); // clear form
  };

  return (
    <div>
      <div className="">
        <AdminCommonHeader>Your all Module</AdminCommonHeader>
        {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {allProgram?.map((program) => (
          <ModuleCard
            key={program.id}
            program={program}
            onEdit={() => {
              setSelectedProgram(program);
              setIsProgramOpen(true);
              updateProgram(program.id, program);
              getAllProgram();
            }}
          />
        ))} */}
      </div>
      <div className="pb-10">
        <button
          onClick={() => setIsModuleOpen(true)}
          className="w-fit bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer "
        >
          Create Module
        </button>
      </div>
      {isModuleOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]  rounded-xl p-8"
            >
              <div className="w-full flex justify-between items-center ">
                <AdminCommonHeader className="!pb-0">
                  Create Module
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsModuleOpen(false);
                    setSelectedModule(null);
                  }}
                  className=" text-xl cursor-pointer hover:text-red-500 "
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
                  placeholder="Enter lesson title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="text-primary-gray block mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  {...register("thumbnail")}
                  className="w-full border border-primary-gray p-2 outline-none"
                  placeholder="https://example.com/thumbnail.jpg"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              {/* Program ID */}

              <div>
                <label
                  htmlFor="publishedFor"
                  className="text-primary-gray block mb-1"
                >
                  courseId
                </label>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                        <SelectValue placeholder="Choose Course" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        {allCourse?.map((course) => (
                          <SelectItem value={course.id}>
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
                {isLoading
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
  );
};

export default Module;
