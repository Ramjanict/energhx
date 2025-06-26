import React from "react";
import { Star } from "lucide-react";
import { SingleReview } from "@/store/AdminStore/type/myReview";

type ReviewCardProps = {
  singleReview: SingleReview[];
};

const SingleReviewCard: React.FC<ReviewCardProps> = ({ singleReview }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {singleReview.map((review) => {
        const { comment, rating, user } = review;

        return (
          <div
            key={review.id}
            className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border"
          >
            {user?.profile_photo && (
              <img
                src={user.profile_photo}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold capitalize text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>

              <div className="flex items-center  text-yellow-500 pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? "fill-yellow-400" : "fill-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 text-sm pt-2 line-clamp-3">
                {comment}
              </p>

              <div className="text-xs text-gray-500 pt-1">
                Reviewed on {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleReviewCard;
