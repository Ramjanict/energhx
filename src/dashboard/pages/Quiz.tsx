import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import AllCourse from "../components/AllCourse";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import QuizCard, { SingleQuiz } from "../Common/QuizCard";

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
          .min(0, "Select the correct answer") // Changed to 0-based
          .max(3, "Answer must be between 1 and 4"), // Changed max to 3
      })
    )
    .min(1, "At least one question is required"),
});

type QuizSchemaType = z.infer<typeof quizSchema>;

const defaultQuestion: QuizSchemaType["quizzesData"][0] = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0, // Changed to 0-based
};

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizSchemaType | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const {
    isLoading,
    allModule,
    getAllModule,
    allContent,
    getAllContent,
    createQuiz,
    getAllQuiz,
    UpdateQuiz,
    allQuiz,
  } = useAdminStore();

  const form = useForm<QuizSchemaType>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      contentId: "",
      quizzesData: [defaultQuestion],
    },
  });

  const { control, register, handleSubmit, formState, reset, watch, setValue } =
    form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quizzesData",
  });
  const { errors } = formState;
  const watchedContentId = watch("contentId");

  useEffect(() => {
    if (watchedContentId) getAllQuiz(watchedContentId);
  }, [watchedContentId, getAllQuiz]);

  useEffect(() => {
    if (selectedQuiz) {
      reset({
        contentId: selectedQuiz.contentId,
        quizzesData: selectedQuiz.quizzesData,
      });
      setIsQuizOpen(true);
    } else {
      reset({ contentId: "", quizzesData: [defaultQuestion] });
      setIsQuizOpen(false);
    }
  }, [selectedQuiz, reset]);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedModuleId("");
    getAllModule(courseId);
    setValue("contentId", "");
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    getAllContent(moduleId);
    setValue("contentId", "");
  };

  const onSubmit = async (data: QuizSchemaType) => {
    try {
      if (quizId) {
        // Convert back to 1-based for API
        const quizToUpdate = {
          question: data.quizzesData[0].question,
          options: data.quizzesData[0].options,
          correctAnswer: data.quizzesData[0].correctAnswer + 1,
        };
        await UpdateQuiz(quizId, quizToUpdate);
      } else {
        // For creation, convert to 1-based
        const quizToCreate = {
          ...data,
          quizzesData: data.quizzesData.map((quiz) => ({
            ...quiz,
            correctAnswer: quiz.correctAnswer + 1,
          })),
        };
        await createQuiz(quizToCreate);
      }

      if (data.contentId) {
        await getAllQuiz(data.contentId);
      }
      setIsQuizOpen(false);
      setSelectedQuiz(null);
      setQuizId("");
      reset({ contentId: "", quizzesData: [defaultQuestion] });
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const handleQuiz = (quizId: string, quiz: SingleQuiz) => {
    setSelectedQuiz({
      contentId: allQuiz.contentId,
      quizzesData: [
        {
          question: quiz.question,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer - 1,
        },
      ],
    });
    setQuizId(quizId);
    setIsQuizOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminCommonHeader>Create Quiz</AdminCommonHeader>
      <div className="flex gap-4 items-center">
        <AllCourse
          handleCourseChange={handleCourseChange}
          selectedCourseId={selectedCourseId}
        />
        <div>
          <Select onValueChange={handleModuleChange} value={selectedModuleId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose Module" />
            </SelectTrigger>
            <SelectContent>
              {allModule?.modules?.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Controller
            control={control}
            name="contentId"
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select content..." />
                </SelectTrigger>
                <SelectContent className=" bg-white">
                  {allContent.contents
                    ?.filter((c) => c.contentType === "QUIZ")
                    .map((content) => (
                      <SelectItem key={content.id} value={content.id}>
                        {content.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.contentId && (
            <p className="text-red-600 text-sm mt-1">
              {errors.contentId.message}
            </p>
          )}
        </div>
      </div>
      {allQuiz?.quizzes?.length > 0 && (
        <QuizCard allQuiz={allQuiz} handleQuiz={handleQuiz} />
      )}
      {!isQuizOpen && (
        <button
          type="button"
          onClick={() => setIsQuizOpen(true)}
          className="bg-primary text-white py-2 px-4 rounded cursor-pointer"
        >
          Add Quiz
        </button>
      )}
      {isQuizOpen && (
        <div className="p-4 border rounded space-y-6">
          <div
            onClick={() => {
              setIsQuizOpen(false);
              setSelectedQuiz(null);
              setQuizId("");
              reset({ contentId: "", quizzesData: [defaultQuestion] });
            }}
            className="cursor-pointer text-xl  w-fit ml-auto  hover:text-red-600"
          >
            <RiCloseLargeLine />
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-3">
              <label className="font-semibold">Question {index + 1}</label>
              <input
                type="text"
                {...register(`quizzesData.${index}.question`)}
                placeholder="Enter the question"
                className="w-full border p-2 rounded"
              />
              {errors.quizzesData?.[index]?.question && (
                <p className="text-red-600 text-sm">
                  {errors.quizzesData[index].question.message}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {["A", "B", "C", "D"].map((label, i) => (
                  <div key={i}>
                    <label>Option {label}</label>
                    <input
                      type="text"
                      {...register(`quizzesData.${index}.options.${i}`)}
                      placeholder={`Option ${label}`}
                      className="w-full border p-2 rounded"
                    />
                    {errors.quizzesData?.[index]?.options?.[i] && (
                      <p className="text-red-600 text-xs">
                        {errors.quizzesData[index].options[i].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <label>Correct Answer</label>
              <Controller
                control={control}
                name={`quizzesData.${index}.correctAnswer`}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={String(field.value)}
                  >
                    <SelectTrigger className="w-full border p-2 rounded bg-white">
                      <SelectValue placeholder="Select correct option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="0">Option A</SelectItem>
                      <SelectItem value="1">Option B</SelectItem>
                      <SelectItem value="2">Option C</SelectItem>
                      <SelectItem value="3">Option D</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.quizzesData?.[index]?.correctAnswer && (
                <p className="text-red-600 text-sm">
                  {errors.quizzesData[index].correctAnswer.message}
                </p>
              )}
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => append(defaultQuestion)}
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Add Question
            </button>
            <button
              type="button"
              onClick={() => fields.length > 1 && remove(fields.length - 1)}
              className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
              disabled={fields.length === 1}
            >
              Remove Question
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded cursor-pointer"
            >
              {isLoading
                ? "Processing..."
                : selectedQuiz
                ? "Update Quiz"
                : "Add Quiz"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Quiz;
