import { MdOutlineStarBorder } from "react-icons/md";

const Review = () => {
  return (
    <div className=" py-10">
      <form className=" flex flex-col gap-3 font-primary bg-secondary p-10 rounded-2xl shadow-[0px_0px_15px_0px_rgba(0,0,0,.4)] border border-[#E7E9E8]">
        <h2 className=" font-secondary font-extrabold text-sm sm:text-lg md:text-xl ">
          Send me Your Review
        </h2>

        <div className="w-full">
          <p className="text-accent text-lg pb-1">
            Enter your valuable comment here.
          </p>

          <textarea
            className=" w-full border border-accent rounded-xs outline-none bg-white p-4"
            rows={10}
            placeholder="Your name or user name here"
          />
        </div>
        <div className=" text-accent text-4xl flex items-center gap-2 pb-5">
          <span className=" cursor-pointer">
            <MdOutlineStarBorder />
          </span>
          <span className=" cursor-pointer">
            <MdOutlineStarBorder />
          </span>
          <span className=" cursor-pointer">
            <MdOutlineStarBorder />
          </span>
          <span className=" cursor-pointer">
            <MdOutlineStarBorder />
          </span>
          <span className=" cursor-pointer">
            <MdOutlineStarBorder />
          </span>
        </div>
        <button className="bg-primary text-white rounded-md p-2  cursor-pointer">
          Review
        </button>
      </form>
    </div>
  );
};

export default Review;
