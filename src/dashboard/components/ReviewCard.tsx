import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { MyReview } from "@/store/AdminStore/type/myReview";
import { useState } from "react";

interface Comment {
  rating: number;
  comment: string;
}

interface ReviewCardProps {
  review: MyReview[];
  handleReview(data: Comment, id: string): void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, handleReview }) => {
  const { deleteMyReview, getMyReview } = useAdminStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (reviewId: string) => {
    try {
      setIsDeleting(true);
      await deleteMyReview(reviewId);
      await getMyReview();
    } catch (error) {
      console.error("Failed to delete review:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {review.map((r) => (
        <div
          key={r.id}
          className="p-4 rounded shadow bg- space-y-3 bg-gray-50 hover:bg-gray-100"
        >
          <h3 className="text-lg font-semibold">{r.course.title}</h3>

          <div className="text-yellow-500 text-xl">{"★".repeat(r.rating)}</div>

          <p className="text-gray-700">{r.comment}</p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                handleReview({ rating: r.rating, comment: r.comment }, r.id);
              }}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(r.id)}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
