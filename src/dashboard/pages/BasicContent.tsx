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
import AllCourse from "../components/AllCourse";
import BasicContentCard from "../Common/BasicContentCard";

// Zod Schema
export const basicContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  video: z.union([
    z
      .instanceof(File)
      .refine((file) => file && file.type.startsWith("video/"), {
        message: "Must be a valid video file",
      }),
    z.string().min(1, "Video is required"),
  ]),
  courseId: z
    .string()
    .uuid("Course ID must be a valid UUID")
    .min(1, "Course ID is required"),
});

export type BasicContentFormData = z.infer<typeof basicContentSchema>;

const BasicContent: React.FC = () => {
  const {
    createBasicContent,
    isBasicContentCreating,
    isBasicContentUpdating,
    getAllCourse,
    allCourse,
    getAllModule,
    allModule,
    updateModule,
  } = useAdminStore();

  const [isBasicContentOpen, setIsBasicContentOpen] = useState(false);
  const [selectedBasicContent, setSelectedBasicContent] =
    useState<BasicContentFormData | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [BasicContentId, setBasicContentId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BasicContentFormData>({
    resolver: zodResolver(basicContentSchema),
    defaultValues: {
      title: "",
      video: "",
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
    if (selectedBasicContent) {
      const { title, video, courseId } = selectedBasicContent;
      reset({ title, video, courseId });
      if (typeof video === "string") {
        setPreview(video);
      }
    } else {
      reset();
      setPreview(null);
    }
  }, [selectedBasicContent, reset]);

  const onSubmit = async (data: BasicContentFormData) => {
    const formData = new FormData();
    const { video, ...restData } = data;
    formData.append("text", JSON.stringify(restData));
    if (video instanceof File) {
      formData.append("file", video);
    }

    BasicContentId && selectedBasicContent
      ? await updateModule(BasicContentId, formData)
      : await createBasicContent(formData);

    if (selectedCourseId) {
      getAllModule(selectedCourseId);
    }

    setIsBasicContentOpen(false);
    setSelectedBasicContent(null);
    setBasicContentId(null);
    setPreview(null);
    reset();
  };

  return (
    <div>
      {/* Course selection */}
      <div className="flex items-center gap-6">
        <AdminCommonHeader className="!pb-0">Choose course</AdminCommonHeader>
        <AllCourse
          handleCourseChange={handleCourseChange}
          selectedCourseId={selectedCourseId}
        />
      </div>

      {/* Header and Content Grid */}
      <div className="">
        <div className="">
          <AdminCommonHeader className="pt-6">
            {Array.isArray(allModule?.basicContents) &&
            allModule.basicContents.length > 0
              ? `Basic Content (${allModule.basicContents.length})`
              : "This course does not contain any Basic Content"}
          </AdminCommonHeader>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ${
            (allModule?.basicContents?.length ?? 0) > 0 ? "pb-8" : ""
          }`}
        >
          {allModule?.basicContents?.map((basicContent) => (
            <BasicContentCard
              key={basicContent.id}
              basicContent={basicContent}
              selectedCourseId={selectedCourseId}
              onEdit={() => {
                setSelectedBasicContent(basicContent);
                setIsBasicContentOpen(true);
                setBasicContentId(basicContent.id);
              }}
            />
          ))}
        </div>

        <AdminCommonButton
          onClick={() => {
            setIsBasicContentOpen(true);
            setSelectedBasicContent(null);
            setBasicContentId(null);
            setPreview(null);
            reset();
          }}
          className="!w-fit"
        >
          Create Basic Content
        </AdminCommonButton>

        {isBasicContentOpen && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center">
            <div className="w-full h-full flex flex-col justify-center items-center gap-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]  rounded-xl p-8"
              >
                <div className="w-full flex justify-between items-center ">
                  <AdminCommonHeader className="!pb-0">
                    {selectedBasicContent
                      ? "Update Basic Content"
                      : "Create Basic Content"}
                  </AdminCommonHeader>

                  <div
                    onClick={() => {
                      setIsBasicContentOpen(false);
                      setSelectedBasicContent(null);
                      setPreview(null);
                      setBasicContentId(null);
                      reset();
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
                    placeholder="Enter Basic content title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Video Upload */}
                <div>
                  <label className="text-primary-gray block mb-1">Video</label>
                  <input
                    id="Video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        setValue("video", file, { shouldValidate: true });
                      }
                    }}
                  />

                  {!preview && (
                    <label
                      htmlFor="Video"
                      className="block cursor-pointer border border-primary-gray py-2 px-4 text-primary-gray hover:bg-primary-green hover:text-white transition"
                    >
                      Upload video
                    </label>
                  )}

                  {preview && (
                    <div className="w-full mt-2">
                      <video
                        src={preview}
                        controls
                        className="w-full max-h-40 border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setValue("video", "", { shouldValidate: true });
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {errors.video && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.video.message as string}
                    </p>
                  )}
                </div>

                {/* Course ID */}
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
                        <SelectTrigger className="w-full outline-none text-primary-gray  rounded-none">
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
                  {isBasicContentCreating || isBasicContentUpdating
                    ? "Processing..."
                    : selectedBasicContent
                    ? "Update Basic Content"
                    : "Create Basic Content"}
                </AdminCommonButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicContent;
