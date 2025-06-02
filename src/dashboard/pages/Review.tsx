import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AdminCommonHeader from "../Common/AdminCommonHeader";

// Zod schema
const answerSchema = z.object({
  contentId: z.string().uuid("Invalid content ID"),
  answerSheet: z
    .array(
      z.object({
        quizId: z.string().uuid("Invalid quiz ID"),
        answer: z
          .number({
            invalid_type_error: "Answer must be a number",
            required_error: "Answer is required",
          })
          .min(1, "Answer must be between 1 and 4")
          .max(4, "Answer must be between 1 and 4"),
      })
    )
    .min(1, "At least one answer is required"),
});

type AnswerFormData = z.infer<typeof answerSchema>;

export default function Review() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      contentId: "",
      answerSheet: [{ quizId: "", answer: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answerSheet",
  });

  const onSubmit = (data: AnswerFormData) => {
    console.log("Submitted Answer Sheet:", data);
  };

  return (
    <>
      <AdminCommonHeader>Review Lists</AdminCommonHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content ID
          </label>
          <input
            {...register("contentId")}
            placeholder="Content UUID"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.contentId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contentId.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Answers</h2>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-gray-200 rounded space-y-2"
            >
              <div>
                <label className="block text-sm text-gray-700">Quiz ID</label>
                <input
                  {...register(`answerSheet.${index}.quizId` as const)}
                  placeholder="Quiz UUID"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {errors.answerSheet?.[index]?.quizId && (
                  <p className="text-red-500 text-sm">
                    {errors.answerSheet[index]?.quizId?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700">
                  Answer (1-4)
                </label>
                <input
                  type="number"
                  min={1}
                  max={4}
                  {...register(`answerSheet.${index}.answer` as const)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {errors.answerSheet?.[index]?.answer && (
                  <p className="text-red-500 text-sm">
                    {errors.answerSheet[index]?.answer?.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                quizId: "",
                answer: 1,
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Answer
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Submit Answer Sheet
        </button>
      </form>
    </>
  );
}
