import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // adjust to your project structure
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import AllCourse from "../components/AllCourse";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import { useState } from "react";

const quizSchema = z.object({
  contentId: z.string().uuid({ message: "Please select a content ID" }),
  quizzesData: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        options: z
          .array(z.string().min(1, "Option is required"))
          .length(4, "Exactly 4 options required"),
        correctAnswer: z
          .number()
          .min(1, "Select the correct answer")
          .max(4, "Answer must be between 1 and 4"),
      })
    )
    .min(1, "At least one question is required"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

const defaultQuestion = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 1,
};

const QuizForm = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const {
    isLoading,
    allModule,
    getAllModule,
    allContent,
    getAllContent,
    createQuiz,
  } = useAdminStore();
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      contentId: "",
      quizzesData: [defaultQuestion],
    },
  });

  const { control, register, handleSubmit, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quizzesData",
  });

  const { errors } = formState;

  const onSubmit = async (data: QuizFormValues) => {
    console.log("data", data);
    try {
      await createQuiz(data);
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
  };

  // Handle course change & fetch modules for that course
  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    if (value) {
      getAllModule(value);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <AdminCommonHeader>Create Quiz</AdminCommonHeader>

      <AdminCommonHeader>Choose course and module</AdminCommonHeader>
      <div className="max-w-xl flex items-center gap-6 pb-6">
        <AllCourse
          handleCourseChange={handleCourseChange}
          selectedCourseId={selectedCourseId}
        />

        <div>
          <Select
            onValueChange={(value) => {
              getAllContent(value);
            }}
          >
            <SelectTrigger className="outline-none text-primary-gray rounded w-[180px]">
              <SelectValue placeholder="Choose Module" />
            </SelectTrigger>
            <SelectContent className="bg-light-green">
              {allModule?.modules?.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Content ID Selector */}
      <div>
        <label className="block font-medium mb-1">Select Content</label>
        <Controller
          control={control}
          name="contentId"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border  p-2">
                <SelectValue placeholder="Select content..." />
              </SelectTrigger>
              <SelectContent>
                {allContent.contents.map((content) => (
                  <SelectItem
                    key={content.id}
                    value={content.id}
                    className="bg-white"
                  >
                    {content.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.contentId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contentId.message}
          </p>
        )}
      </div>

      {/* Questions */}
      {fields.map((field, index) => (
        <div key={field.id} className="  relative">
          <label className="block font-medium mb-1">Question {index + 1}</label>
          <input
            type="text"
            {...register(`quizzesData.${index}.question`)}
            className="w-full border  p-2 mb-2"
            placeholder="Enter the question"
          />
          {errors.quizzesData?.[index]?.question && (
            <p className="text-red-500 text-sm">
              {errors.quizzesData[index].question?.message}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 mb-3">
            {["A", "B", "C", "D"].map((label, i) => (
              <div key={i}>
                <label className="block text-sm font-medium">
                  Option {label}
                </label>
                <input
                  type="text"
                  {...register(`quizzesData.${index}.options.${i}`)}
                  className="w-full border  p-2 outline-none"
                  placeholder={`Option ${label}`}
                />
                {errors.quizzesData?.[index]?.options?.[i] && (
                  <p className="text-red-500 text-sm">
                    {errors.quizzesData[index].options?.[i]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <label className="block font-medium mb-1">Correct Answer</label>
          <Controller
            control={control}
            name={`quizzesData.${index}.correctAnswer`}
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
              >
                <SelectTrigger className="w-full border  p-2">
                  <SelectValue placeholder="Select correct option..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1">Option A</SelectItem>
                  <SelectItem value="2">Option B</SelectItem>
                  <SelectItem value="3">Option C</SelectItem>
                  <SelectItem value="4">Option D</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.quizzesData?.[index]?.correctAnswer && (
            <p className="text-red-500 text-sm">
              {errors.quizzesData[index].correctAnswer?.message}
            </p>
          )}
        </div>
      ))}

      {/* Single Remove Button */}
      <button
        type="button"
        onClick={() => remove(fields.length - 1)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        Remove Question
      </button>

      {/* Controls */}
      <div className="flex gap-4 pb-10">
        <button
          type="button"
          onClick={() => append(defaultQuestion)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          {isLoading ? "Processing..." : "Submit Quiz"}
        </button>
      </div>
    </form>
  );
};
export default QuizForm;
