import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminCommonButton from "../Common/AdminCommonButton";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { RiCloseLargeLine } from "react-icons/ri";
import AllCourse from "../components/AllCourse";
import AllModules from "../components/AllModules";
import ContentCard from "../Common/ContentCard";

// ----------------------
// Zod Schema
// ----------------------

const baseFields = {
  title: z.string().min(1, "Title is required"),
  moduleId: z.string().uuid("Invalid module ID"),
};

const descriptionSchema = z.object({
  ...baseFields,
  contentType: z.literal("DESCRIPTION"),
  description: z.string().min(1, "Description is required"),
});

const videoSchema = z.object({
  ...baseFields,
  contentType: z.literal("VIDEO"),
  video: z.union([
    z
      .instanceof(File)
      .refine((file) => file && file.type.startsWith("video/"), {
        message: "Must be a valid video file",
      }),
    z.undefined(),
  ]),
});

const quizSchema = z.object({
  ...baseFields,
  contentType: z.literal("QUIZ"),
});

const formSchema = z.discriminatedUnion("contentType", [
  descriptionSchema,
  videoSchema,
  quizSchema,
]);

export type AllContentType = z.infer<typeof formSchema>;

type ContentItem =
  | {
      id: string;
      contentType: "DESCRIPTION";
      title: string;
      moduleId: string;
      description: string;
    }
  | {
      id: string;
      contentType: "VIDEO";
      title: string;
      moduleId: string;
      video?: File | string;
    }
  | { id: string; contentType: "QUIZ"; title: string; moduleId: string };

// ----------------------
// Component
// ----------------------

const Content: React.FC = () => {
  const {
    isContentCreating,
    isContentUpdating,
    createContent,
    allModule,
    getAllModule,
    allContent,
    updateContent,
    getAllContent,
  } = useAdminStore();

  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );
  const [contentId, setContentId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AllContentType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contentType: "DESCRIPTION",
      moduleId: "",
      description: "",
    },
  });

  const contentType = watch("contentType");

  // Handle course change & fetch modules for that course
  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    if (value) {
      getAllModule(value);
    }
  };

  const onSubmit: SubmitHandler<AllContentType> = async (data) => {
    const formData = new FormData();

    let restData = data;
    if (data.contentType === "VIDEO" && data.video instanceof File) {
      formData.append("file", data.video);
      const { video, ...withoutVideo } = data;
      restData = withoutVideo;
    }

    formData.append("text", JSON.stringify(restData));

    try {
      if (contentId && selectedContent) {
        await updateContent(contentId, formData);
      } else {
        await createContent(formData);
      }

      if (data.moduleId) {
        await getAllContent(data.moduleId);
      }
    } finally {
      setIsContentOpen(false);
      setSelectedContent(null);
      setContentId(null);
      setPreview(null);
      reset();
    }
  };

  useEffect(() => {
    if (selectedContent) {
      if (selectedContent.contentType === "VIDEO") {
        reset({
          contentType: "VIDEO",
          title: selectedContent.title,
          moduleId: selectedContent.moduleId,
          video: undefined, // We never set video as File for default
        });

        if (typeof selectedContent.video === "string") {
          setPreview(selectedContent.video); // <-- Set preview here on edit
        } else {
          setPreview(null);
        }
      } else if (selectedContent.contentType === "DESCRIPTION") {
        reset({
          contentType: "DESCRIPTION",
          title: selectedContent.title,
          moduleId: selectedContent.moduleId,
          description: selectedContent.description,
        });
        setPreview(null);
      } else if (selectedContent.contentType === "QUIZ") {
        reset({
          contentType: "QUIZ",
          title: selectedContent.title,
          moduleId: selectedContent.moduleId,
        });
        setPreview(null);
      }
    } else {
      reset();
      setPreview(null);
    }
  }, [selectedContent, reset]);

  // Cleanup preview URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <AdminCommonHeader>Choose course and module</AdminCommonHeader>
      <div className="max-w-xl flex items-center gap-6 pb-6">
        <AllCourse
          handleCourseChange={handleCourseChange}
          selectedCourseId={selectedCourseId}
        />
        <AllModules control={control} errors={errors} />
      </div>
      <AdminCommonHeader className="!text-sm">
        {Array.isArray(allModule?.modules) && allModule.modules.length > 0
          ? `Content (${allContent?.contents?.length || 0})`
          : "This module does not contain any Content"}
      </AdminCommonHeader>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ${
          (allContent?.contents?.length ?? 0) > 0 ? "pb-8" : ""
        }`}
      >
        {allContent?.contents?.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onEdit={() => {
              setSelectedContent(content as ContentItem);
              setIsContentOpen(true);
              setContentId(content.id);

              if (
                content.contentType === "VIDEO" &&
                typeof content.video === "string"
              ) {
                setPreview(content.video);
              } else {
                setPreview(null);
              }
            }}
          />
        ))}
      </div>

      <AdminCommonButton
        onClick={() => setIsContentOpen(true)}
        className="!w-fit"
      >
        Create Content
      </AdminCommonButton>

      {isContentOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity min-h-screen flex items-center justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-xl p-8 max-h-screen overflow-y-auto"
            >
              <div className="w-full flex justify-between items-center">
                <AdminCommonHeader className="!pb-0">
                  {selectedContent ? "Update Content" : "Create Content"}
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsContentOpen(false);
                    setSelectedContent(null);
                    setContentId(null);
                    setPreview(null);
                    reset();
                  }}
                  className="text-xl cursor-pointer hover:text-red-500"
                >
                  <RiCloseLargeLine />
                </div>
              </div>

              {/* Content Type */}
              <div>
                <label className="text-primary-gray block mb-1">
                  Content Type
                </label>
                <Controller
                  name="contentType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!!selectedContent}
                    >
                      <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                        <SelectValue placeholder="Choose content type" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        <SelectItem value="DESCRIPTION">DESCRIPTION</SelectItem>
                        <SelectItem value="VIDEO">VIDEO</SelectItem>
                        <SelectItem value="QUIZ">QUIZ</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.contentType && (
                  <p className="text-red-500 text-xs">
                    {errors.contentType.message}
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="text-primary-gray block mb-1">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full border border-primary-gray p-2 outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>

              {/* Description Field */}
              {contentType === "DESCRIPTION" && (
                <div>
                  <label className="text-primary-gray block mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="w-full border border-primary-gray p-2 outline-none min-h-[100px]"
                  />
                  {"description" in errors && errors.description && (
                    <p className="text-red-500 text-xs">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}

              {/* Video Fields */}
              {contentType === "VIDEO" && (
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
                      {selectedContent?.contentType === "VIDEO"
                        ? "Replace video"
                        : "Upload video"}
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
                          setValue("video", undefined, {
                            shouldValidate: true,
                          });
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {"video" in errors && errors.video && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.video.message as string}
                    </p>
                  )}
                </div>
              )}

              <div className="w-full flex items-center justify-between pb-6 gap-4 flex-wrap">
                <AllCourse
                  handleCourseChange={handleCourseChange}
                  selectedCourseId={selectedCourseId}
                />
                <AllModules control={control} errors={errors} />
              </div>

              <AdminCommonButton>
                {isContentCreating || isContentUpdating
                  ? "Processing..."
                  : selectedContent
                  ? "Update Content"
                  : "Create Content"}
              </AdminCommonButton>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
