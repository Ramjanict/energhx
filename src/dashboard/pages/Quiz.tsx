import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import AdminCommonButton from "../Common/AdminCommonButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnswerSheet from "./AnswerSheet";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

// Zod Schema
const quizQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .length(4, "Exactly 4 options required"),
  correctAnswer: z
    .number({ invalid_type_error: "Select the correct answer" })
    .min(0)
    .max(3, "Must select between Option 1 and 4"),
});

const formSchema = z.object({
  thumbnail: z.string().url("Must be a valid URL"),
  quizzesData: z
    .array(quizQuestionSchema)
    .min(1, "At least one question is required"),
});

type FormData = z.infer<typeof formSchema>;

const Quiz = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  // const [selectedQuiz, setSelectedQuiz] = useState<FormData | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail: "",
      quizzesData: [
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quizzesData",
  });

  const onSubmit = (data: FormData) => {
    console.log("Quiz submitted:", data);
    // You can send this `data` to your backend here
  };

  return (
    <>
      <div className="pb-10">
        <button
          onClick={() => setIsQuizOpen(true)}
          className="w-fit bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer "
        >
          Create Quiz
        </button>
      </div>
      {isQuizOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]  rounded-xl p-8"
            >
              <div className="w-full flex justify-between items-center ">
                <AdminCommonHeader className="!pb-0">
                  Create Quiz
                </AdminCommonHeader>
                <div
                  onClick={() => {
                    setIsQuizOpen(false);
                    // setSelectedQuiz(null);
                  }}
                  className=" text-xl cursor-pointer hover:text-red-500 "
                >
                  <RiCloseLargeLine />
                </div>
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

              <h2 className="text-lg font-semibold">Quiz Questions</h2>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-4 bg-gray-50 ">
                  {/* Question */}
                  <div>
                    <label className="text-primary-gray block mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      {...register(`quizzesData.${index}.question` as const)}
                      className="w-full border border-primary-gray p-2 outline-none"
                      placeholder="Enter the question"
                    />
                    {errors.quizzesData?.[index]?.question && (
                      <p className="text-red-500 text-xs">
                        {errors.quizzesData[index]?.question?.message}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, optIdx) => (
                      <div key={optIdx}>
                        <label className="text-primary-gray block mb-1">
                          Option {optIdx + 1}
                        </label>
                        <input
                          type="text"
                          {...register(
                            `quizzesData.${index}.options.${optIdx}` as const
                          )}
                          className="w-full border border-primary-gray p-2 outline-none"
                          placeholder={`Option ${optIdx + 1}`}
                        />
                        {errors.quizzesData?.[index]?.options?.[optIdx] && (
                          <p className="text-red-500 text-xs">
                            {
                              errors.quizzesData[index]?.options?.[optIdx]
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer Select */}
                  <div>
                    <label className="text-primary-gray block mb-1">
                      Correct Answer
                    </label>
                    <Controller
                      name={`quizzesData.${index}.correctAnswer`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(val) => field.onChange(Number(val))}
                          value={field.value.toString()}
                        >
                          <SelectTrigger className="w-full outline-none text-primary-gray py-2 border border-primary-gray">
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {[0, 1, 2, 3].map((optIdx) => (
                              <SelectItem
                                key={optIdx}
                                value={optIdx.toString()}
                                className="hover:bg-primary-green hover:text-white"
                              >
                                Option {optIdx + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.quizzesData?.[index]?.correctAnswer && (
                      <p className="text-red-500 text-xs">
                        {errors.quizzesData[index]?.correctAnswer?.message}
                      </p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:underline text-sm self-start"
                  >
                    Remove Question
                  </button>
                </div>
              ))}

              {/* Add / Submit Buttons */}
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() =>
                    append({
                      question: "",
                      options: ["", "", "", ""],
                      correctAnswer: 0,
                    })
                  }
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
                >
                  Add Question
                </button>

                <AdminCommonButton>Submit Quiz</AdminCommonButton>
              </div>
            </form>
          </div>
        </div>
      )}

      <AnswerSheet />
    </>
  );
};

export default Quiz;
