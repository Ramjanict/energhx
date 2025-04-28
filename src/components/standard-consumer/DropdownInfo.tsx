import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

const typeOptions: Option[] = [
  { label: "Servers", value: "servers" },
  { label: "Workstations", value: "workstations" },
];

const locationOptions: Option[] = [
  { label: "Near Address", value: "near_address" },
  { label: "Remote", value: "remote" },
];

const availabilityOptions: Option[] = [
  { label: "Available", value: "available" },
  { label: "Busy", value: "busy" },
];

const Dropdown = ({ label, options }: { label: string; options: Option[] }) => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="w-full bg-secondary text-primary py-4 px-4 rounded-[12px] flex flex-col">
        <p className="text-accent text-[12px] mb-1">{label}</p>
        <button
          className="flex justify-between items-center w-full text-primary font-semibold text-[18px]"
          onClick={() => setOpen(!open)}
        >
          <span>{selected.label}</span>
          <ChevronDown className="w-4 h-4 text-primary" />
        </button>
      </div>
      {open && (
        <ul className="absolute left-0 w-full bg-white shadow-md mt-1 rounded-lg overflow-hidden z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-secondary cursor-pointer"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DropdownInfo = () => {
  return (
    <div className="pb-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Dropdown label="Type" options={typeOptions} />
        <Dropdown label="Location" options={locationOptions} />
        <Dropdown label="Availability" options={availabilityOptions} />
      </div>
    </div>
  );
};

export default DropdownInfo;
