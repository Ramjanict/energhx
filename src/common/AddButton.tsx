import { LuSquarePlus } from "react-icons/lu";

interface AddButton {
  title: string;
}
const AddButton = ({ title }: AddButton) => {
  return (
    <div className="w-fit flex items-center gap-1 bg-primary rounded-sm py-2 px-4 text-white cursor-pointer">
      <span className="text-lg text-white">
        <LuSquarePlus />
      </span>
      {title}
    </div>
  );
};

export default AddButton;
