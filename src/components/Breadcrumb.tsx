interface BreadcrumbProps {
  steps: string[];
  currentStep: number;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`text-sm font-medium px-3 py-1 rounded-md ${
            i + 1 === currentStep
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
