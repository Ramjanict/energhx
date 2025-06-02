import React, { useState } from "react";
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
// Zod Schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  contentType: z.enum(["DESCRIPTION", "VIDEO", "QUIZ"]),
  description: z.string().optional(),
  video: z.string().url("Must be a valid URL").optional(),
  thumbnail: z.string().url("Must be a valid URL").optional(),
  moduleId: z.string().uuid("Invalid module ID"),
});

type FormData = z.infer<typeof formSchema>;

const Content: React.FC = () => {
  const { isLoading } = useAdminStore();
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<FormData | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    control,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contentType: "DESCRIPTION",
      moduleId: "",
    },
  });

  const contentType = watch("contentType");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <>
      <div className="pb-10">
        <button
          onClick={() => setIsContentOpen(true)}
          className="w-fit bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer "
        >
          Create Content
        </button>
      </div>

      {isContentOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]  rounded-xl p-8"
            >
              <div className="w-full flex justify-between items-center ">
                <AdminCommonHeader className="!pb-0">
                  Create Program
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsContentOpen(false);
                    setSelectedContent(null);
                  }}
                  className=" text-xl cursor-pointer hover:text-red-500 "
                >
                  <RiCloseLargeLine />
                </div>
              </div>
              <div>
                <label
                  htmlFor="publishedFor"
                  className="text-primary-gray block mb-1"
                >
                  Content Type
                </label>
                <Controller
                  name="contentType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                        <SelectValue placeholder="Choose program" />
                      </SelectTrigger>
                      <SelectContent className="bg-light-green">
                        <SelectItem
                          value="DESCRIPTION"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          DESCRIPTION
                        </SelectItem>
                        <SelectItem
                          value="VIDEO"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          VIDEO
                        </SelectItem>
                        <SelectItem
                          value="QUIZ"
                          className="hover:bg-primary-green hover:text-white"
                        >
                          QUIZ
                        </SelectItem>
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

              {contentType === "DESCRIPTION" && (
                <div>
                  <label className="text-primary-gray block mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="w-full border border-primary-gray p-2 outline-none"
                  />
                  {errors.contentType && (
                    <p className="text-red-500 text-xs">
                      {errors.contentType.message}
                    </p>
                  )}
                </div>
              )}

              {contentType === "VIDEO" && (
                <div>
                  <label className="text-primary-gray block mb-1">
                    Video URL
                  </label>
                  <input
                    type="url"
                    {...register("video")}
                    className="w-full border border-primary-gray p-2 outline-none"
                    placeholder="https://www.example.com/"
                  />
                  {errors.contentType && (
                    <p className="text-red-500 text-xs">
                      {errors.contentType.message}
                    </p>
                  )}
                </div>
              )}

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
                  <p className="text-red-500 text-xs">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <input type="hidden" {...register("moduleId")} />

              <AdminCommonButton>
                {isLoading
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
