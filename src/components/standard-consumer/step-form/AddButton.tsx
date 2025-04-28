import { LuSquarePlus } from "react-icons/lu";

const AddButton = () => {
  return (
    <div className="w-fit flex items-center gap-1 bg-primary rounded-sm py-2 px-4 text-white cursor-pointer">
      <span className="text-lg text-white">
        <LuSquarePlus />
      </span>
      Add
    </div>
  );
};

export default AddButton;
