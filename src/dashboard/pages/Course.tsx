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
import CourseCard from "../Common/CourseCard";
import { RiCloseLargeLine } from "react-icons/ri";
// Zod Schema
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  programId: z
    .string()
    .uuid("Program ID must be a valid UUID")
    .min(1, "Program ID is required"),
});

type CourseFormData = z.infer<typeof courseSchema>;

const Course: React.FC = () => {
  const {
    createCourse,
    isLoading,
    allProgram,
    getAllProgram,
    getAllCourse,
    allCourse,
  } = useAdminStore();

  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseFormData | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "React developer",
      thumbnail:
        "https://images.pexels.com/photos/19895867/pexels-photo-19895867/free-photo-of-engineer-standing-among-solar-panels.jpeg?auto=compress&cs=tinysrgb&w=600",
      programId: "",
    },
  });

  console.log("selectedCourse", selectedCourse);

  useEffect(() => {
    getAllProgram();
  }, [getAllProgram]);
  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  useEffect(() => {
    if (selectedCourse) {
      reset(selectedCourse);
    }
  }, [selectedCourse, reset]);

  const onSubmit = async (data: CourseFormData) => {
    await createCourse(data);
    setIsCourseOpen(false);
    setSelectedCourse(null);
    reset();
    getAllCourse();
  };

  return (
    <div>
      <AdminCommonHeader>Your all Course</AdminCommonHeader>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {allCourse?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={() => {
              setSelectedCourse(course);
              setIsCourseOpen(true);
            }}
          />
        ))}
      </div>

      <div className="pb-10">
        <button
          onClick={() => {
            setIsCourseOpen(true);
            setSelectedCourse(null);
          }}
          className="w-fit bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer  "
        >
          Create Course
        </button>
      </div>

      {isCourseOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white  w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8"
            >
              <div className="w-full flex justify-between items-center ">
                <AdminCommonHeader className="!pb-0">
                  Create Course
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsCourseOpen(false);
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

              <div>
                <label
                  htmlFor="publishedFor"
                  className="text-primary-gray block mb-1"
                >
                  Program
                </label>
                <Controller
                  name="programId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                        <SelectValue placeholder="Choose program" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        {allProgram?.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.programId && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.programId.message}
                  </p>
                )}
              </div>

              <div className="">
                <AdminCommonButton>
                  {isLoading
                    ? "Processing..."
                    : selectedCourse
                    ? "Update Course"
                    : "Create Course"}
                </AdminCommonButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
