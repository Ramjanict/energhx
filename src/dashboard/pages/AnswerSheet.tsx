import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminCommonHeader from "../Common/AdminCommonHeader";
import AdminCommonButton from "../Common/AdminCommonButton";

// Question data with text
const quizData = {
  contentId: "373318ff-0e99-4637-818d-1619435d5b19",
  answerSheet: [
    { quizId: "a3de4cd2-42ed-43ae-9145-1c34069081fe" },
    { quizId: "be88b7f3-2f83-48c3-8dbf-12710a0d6082" },
    { quizId: "43eba362-1279-406c-bbde-8e8cee7731e8" },
    { quizId: "b9d8553f-328d-4619-b137-d9e91b632c0d" },
    { quizId: "cfcb95c6-ce78-40f4-b9fe-114107eb92d4" },
    { quizId: "ac1039ff-88da-4dd5-a0f8-9ad297cc62b3" },
    { quizId: "b7fefa5b-d290-4994-ae05-f3b30819b2fb" },
    { quizId: "847931c5-d179-4a7c-b0d3-f491d110e3ac" },
    { quizId: "b4927a67-3757-4c98-913e-8e8e816970f0" },
    { quizId: "edfa7ec3-0359-4b83-bc53-9acc726e5152" },
  ],
};

const quizQuestions: Record<string, string> = {
  "a3de4cd2-42ed-43ae-9145-1c34069081fe": "What is the capital of France?",
  "be88b7f3-2f83-48c3-8dbf-12710a0d6082":
    "Which planet is known as the Red Planet?",
  "43eba362-1279-406c-bbde-8e8cee7731e8": "What is 2 + 2?",
  "b9d8553f-328d-4619-b137-d9e91b632c0d": "Who wrote 'To Kill a Mockingbird'?",
  "cfcb95c6-ce78-40f4-b9fe-114107eb92d4": "What is the boiling point of water?",
  "ac1039ff-88da-4dd5-a0f8-9ad297cc62b3": "Which gas do plants absorb?",
  "b7fefa5b-d290-4994-ae05-f3b30819b2fb": "Who painted the Mona Lisa?",
  "847931c5-d179-4a7c-b0d3-f491d110e3ac": "What is the currency of Japan?",
  "b4927a67-3757-4c98-913e-8e8e816970f0": "How many continents are there?",
  "edfa7ec3-0359-4b83-bc53-9acc726e5152": "Which element has the symbol 'O'?",
};

// Zod schema
const answerFormSchema = z.object({
  contentId: z.string().uuid(),
  answerSheet: z.array(
    z.object({
      quizId: z.string().uuid(),
      answer: z
        .number({ invalid_type_error: "Please choose an answer." })
        .min(1, "Select a valid option")
        .max(4, "Select a valid option"),
    })
  ),
});

type AnswerFormData = z.infer<typeof answerFormSchema>;

const AnswerSheet: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      contentId: quizData.contentId,
      answerSheet: quizData.answerSheet.map((q) => ({
        quizId: q.quizId,
        answer: undefined,
      })),
    },
  });

  const onSubmit: SubmitHandler<AnswerFormData> = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <AdminCommonHeader className="">Your Quiz lists</AdminCommonHeader>

      {quizData.answerSheet.map((question, index) => (
        <div key={question.quizId} className="space-y-2">
          <label className="block font-medium text-gray-700">
            {index + 1}.{" "}
            {quizQuestions[question.quizId] ?? "Question text missing"}
          </label>

          <div className="space-y-1">
            {[1, 2, 3, 4].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  value={option}
                  {...register(`answerSheet.${index}.answer` as const, {
                    valueAsNumber: true,
                  })}
                  className="accent-blue-600"
                />
                <span>Option {option}</span>
              </label>
            ))}
          </div>

          {errors.answerSheet?.[index]?.answer && (
            <p className="text-red-500 text-xs">
              {errors.answerSheet[index]?.answer?.message}
            </p>
          )}

          {/* Hidden input for quizId */}
          <input
            type="hidden"
            {...register(`answerSheet.${index}.quizId`)}
            value={question.quizId}
          />
        </div>
      ))}

      <input
        type="hidden"
        {...register("contentId")}
        value={quizData.contentId}
      />
      <div className="py-10">
        <AdminCommonButton className=" !w-fit">Submit Answer</AdminCommonButton>
      </div>
    </form>
  );
};
export default AnswerSheet;
