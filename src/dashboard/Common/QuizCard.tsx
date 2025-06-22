import { useAdminStore } from "@/store/AdminStore/AdminStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export type SingleQuiz = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  createdAt: string;
  updatedAt: string;
  quizInstanceId: string;
};

export type AllQuiz = {
  id: string;
  totalMark: number;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  contentId: string;
  quizzes: SingleQuiz[];
};

type QuizCardProps = {
  allQuiz: AllQuiz;
  handleQuiz: (quizId: string, quiz: SingleQuiz) => void;
};

const QuizCard: React.FC<QuizCardProps> = ({ allQuiz, handleQuiz }) => {
  const { deleteQuiz, getAllQuiz, isQuizDeleting } = useAdminStore();

  const handleDelete = async (quizId: string) => {
    try {
      await deleteQuiz(quizId);
      await getAllQuiz(allQuiz.contentId);
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
      {allQuiz?.quizzes?.map((quiz, index) => (
        <div
          key={quiz.id}
          className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border p-4"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Quiz {index + 1}
          </h2>
          <p className="text-sm text-gray-700 font-medium">{quiz.question}</p>

          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mt-2">
            {quiz.options.map((option, i) => (
              <li
                key={i}
                className={
                  i + 1 === quiz.correctAnswer
                    ? "font-semibold text-green-600"
                    : ""
                }
              >
                {option}
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(quiz.createdAt).toLocaleString()}
          </p>

          <div className="flex justify-end items-center gap-2 pt-4">
            <EditButton type="button" onClick={() => handleQuiz(quiz.id, quiz)}>
              Edit
            </EditButton>
            <DeleteButton type="button" onClick={() => handleDelete(quiz.id)}>
              {isQuizDeleting ? "Deleting..." : "Delete"}
            </DeleteButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
