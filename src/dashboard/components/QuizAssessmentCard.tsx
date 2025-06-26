import React from "react";

type QuizSubmission = {
  id: string;
  correctAnswers: number;
  incorrectAnswers: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  quizInstanceId: string;
  userId: string;
};

type QuizAssessmentCardProps = {
  submission: QuizSubmission;
  score: number;
  total: number;
};

const QuizAssessmentCard: React.FC<QuizAssessmentCardProps> = ({
  submission,
  score,
  total,
}) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quiz Assessment</h2>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <span className="font-medium">Score:</span> {score} / {total}
        </li>
        <li>
          <span className="font-medium">Correct Answers:</span>
          {submission?.correctAnswers}
        </li>
        <li>
          <span className="font-medium">Incorrect Answers:</span>
          {submission?.incorrectAnswers}
        </li>
        <li>
          <span className="font-medium">Status:</span>
          {submission?.isCompleted ? (
            <span className="text-green-600 font-semibold">Completed</span>
          ) : (
            <span className="text-red-600 font-semibold">Incomplete</span>
          )}
        </li>
        <li>
          <span className="font-medium">Submitted At:</span>
          {new Date(submission?.createdAt).toLocaleString()}
        </li>
      </ul>
    </div>
  );
};

export default QuizAssessmentCard;
