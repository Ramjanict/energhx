import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { AnswerSubmission } from "@/store/AdminStore/type/SubmitQuiz";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  createdAt: string;
  updatedAt: string;
  quizInstanceId: string;
};

interface SubmitQuizProps {
  quizzes: QuizQuestion[];
  contentId: string;
}

type QuizFormValues = {
  [quizId: string]: string; // selected option index as string
};

const SubmitQuiz: React.FC<SubmitQuizProps> = ({ quizzes, contentId }) => {
  const { submitQuiz, isQuizSubmitting } = useAdminStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormValues>();

  const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    const answerSheet = Object.entries(data).map(([quizId, answer]) => ({
      quizId,
      answer: Number(answer),
    }));

    const result: AnswerSubmission = {
      contentId,
      answerSheet,
    };

    try {
      await submitQuiz(result); // Assuming this is an async function (like an API call)
      console.log("Submitted successfully:", result);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="p-4 border rounded-md">
          <p className="font-semibold mb-2">{quiz.question}</p>
          <div className="space-y-2">
            {quiz.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={index}
                  {...register(quiz.id, {
                    required: "Please select an answer",
                  })}
                  className="accent-blue-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors[quiz.id] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[quiz.id]?.message as string}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        {isQuizSubmitting ? "Processing..." : " Submit Quiz"}
      </button>
    </form>
  );
};

export default SubmitQuiz;
