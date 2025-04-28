interface TwoTitleProps {
  blackHeader: string;
  greenHeader: string;
}
const TwoTitle: React.FC<TwoTitleProps> = ({ blackHeader, greenHeader }) => {
  return (
    <div className=" flex flex-col gap-4">
      <h2
        className={` font-extrabold text-[#112518] font-secondary  text-base `}
      >
        {blackHeader}
      </h2>
      <h2
        className={` font-extrabold text-primary font-secondary text-base sm:text-xl md:text-2xl `}
      >
        {greenHeader}
      </h2>
    </div>
  );
};

export default TwoTitle;
