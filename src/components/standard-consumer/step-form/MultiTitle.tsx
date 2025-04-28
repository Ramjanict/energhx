interface MultiTitle {
  heading?: string;
  paragraph?: string;
  subtitle?: string;
}
const MultiTitle: React.FC<MultiTitle> = ({ heading, paragraph, subtitle }) => {
  return (
    <div className="flex flex-col gap-6 pb-6">
      {heading && (
        <h2 className=" text-lg font-semibold text-[#112518]">{heading}</h2>
      )}
      {paragraph && <p className=" text-[#758179] text-base">{paragraph}</p>}

      {subtitle && (
        <h3 className=" font-semibold text-base text-[#758179]">{subtitle}</h3>
      )}
    </div>
  );
};

export default MultiTitle;
