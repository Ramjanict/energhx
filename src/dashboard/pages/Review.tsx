import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useState } from "react";
import AllReviewCard from "../components/AllReviewCard";
import AllCourse from "../components/AllCourse";
import SingleReviewCard from "../components/SingleReviewCard";
import AdminCommonButton from "../Common/AdminCommonButton";
import AdminCommonHeader from "../Common/AdminCommonHeader";

const Review = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [showAllReview, setShowAllReview] = useState(false);

  const {
    getAllReview,
    allReview,
    getSingleReview,
    singleReview,
    isSingleContentFetching,
    isAllReviewFetching,
  } = useAdminStore();

  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    setShowAllReview(false); // Hide all reviews when a course is selected
    if (value) {
      getSingleReview(value);
    }
  };

  const handleClick = async () => {
    setSelectedCourseId(""); // Deselect any course
    setShowAllReview(true); // Show all reviews
    await getAllReview();
  };

  return (
    <>
      <AdminCommonHeader>All Review</AdminCommonHeader>

      <div className="flex items-center gap-2">
        <AdminCommonHeader className="!pb-0">
          Show review based on course
        </AdminCommonHeader>
        <AllCourse
          handleCourseChange={handleCourseChange}
          selectedCourseId={selectedCourseId}
        />
      </div>

      {selectedCourseId && !showAllReview ? (
        singleReview.length > 0 ? (
          <SingleReviewCard singleReview={singleReview} />
        ) : (
          <AdminCommonHeader className="!text-sm pt-2">
            This course does not contain any review
          </AdminCommonHeader>
        )
      ) : null}

      {showAllReview && allReview.length > 0 && (
        <AllReviewCard allReview={allReview} />
      )}
      <AdminCommonButton onClick={handleClick} className="!w-fit my-6">
        {isAllReviewFetching ? "Processing..." : "Show all reviews"}
      </AdminCommonButton>
    </>
  );
};

export default Review;
