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
  thumbnail: z.union([
    z.instanceof(File).refine((file) => file.size > 0, "Thumbnail is required"),
    z.string().min(1, "Thumbnail is required"),
  ]),
  programId: z.string().min(1, "Program is required"),
});

type CourseFormData = z.infer<typeof courseSchema>;

const Course: React.FC = () => {
  const {
    createCourse,
    isCourseCreating,
    isCourseUpdating,
    allProgram,
    getAllProgram,
    getAllCourse,
    updateCourse,
    allCourse,
  } = useAdminStore();

  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseFormData | null>(
    null
  );
  const [courseId, setCourseId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      programId: "",
    },
  });

  useEffect(() => {
    getAllProgram();
  }, [getAllProgram]);

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  useEffect(() => {
    if (selectedCourse) {
      const { title, thumbnail, programId } = selectedCourse;
      setPreview(typeof thumbnail === "string" ? thumbnail : null);
      reset({ title, thumbnail, programId });
    } else {
      setPreview(null);
      reset();
    }
  }, [selectedCourse, reset]);

  const onSubmit = async (data: CourseFormData) => {
    const formData = new FormData();
    const { thumbnail, ...restData } = data;
    formData.append("text", JSON.stringify(restData));
    if (thumbnail instanceof File) {
      formData.append("file", thumbnail);
    }

    courseId && selectedCourse
      ? await updateCourse(courseId, formData)
      : await createCourse(formData);

    getAllCourse();
    getAllProgram();
    setIsCourseOpen(false);
    setSelectedCourse(null);
    setCourseId(null);
    setPreview(null);
    reset();
  };

  return (
    <div>
      <AdminCommonHeader>All Courses</AdminCommonHeader>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
          allCourse.length > 0 ? "pb-8" : ""
        }`}
      >
        {allCourse?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={() => {
              setSelectedCourse(course);
              setCourseId(course.id);
              setIsCourseOpen(true);
            }}
          />
        ))}
      </div>

      <AdminCommonButton
        onClick={() => {
          setIsCourseOpen(true);
          setSelectedCourse(null);
          setCourseId(null);
        }}
        className={`!w-fit ${allCourse.length > 0 ? "mb-6" : "mt-6"}`}
      >
        Create Course
      </AdminCommonButton>

      {isCourseOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity min-h-screen flex items-center justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8"
            >
              <div className="w-full flex justify-between items-center">
                <AdminCommonHeader className="!pb-0">
                  {selectedCourse ? "Update Course" : "Create Course"}
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsCourseOpen(false);
                    setSelectedCourse(null);
                    setCourseId(null);
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
                  placeholder="Enter course title"
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
                <label className="text-primary-gray block mb-1">Program</label>
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

              <AdminCommonButton>
                {isCourseCreating || isCourseUpdating
                  ? "Processing..."
                  : selectedCourse
                  ? "Update Course"
                  : "Create Course"}
              </AdminCommonButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
