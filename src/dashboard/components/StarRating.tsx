import { useState } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const StarRating = () => {
  const [rating, setRating] = useState(0); // Current saved rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  const handleClick = (value: number) => {
    if (rating === value) {
      setRating(0); // toggle off
    } else {
      setRating(value);
    }
  };

  const renderStar = (index: number) => {
    const effectiveRating = hoverRating || rating;

    if (effectiveRating >= index + 1) {
      return <IoIosStar key={index} />;
    } else if (effectiveRating >= index + 0.5) {
      return <IoIosStarHalf key={index} />;
    } else {
      return <IoIosStarOutline key={index} />;
    }
  };

  return (
    <div className="flex items-center text-yellow-500 text-2xl">
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
          className="cursor-pointer"
        >
          {renderStar(index)}
        </span>
      ))}
      <span className="text-sm text-gray-500 ml-2">
        ({rating > 0 ? `Rated: ${rating}` : "0 Reviews"})
      </span>
    </div>
  );
};

export default StarRating;
