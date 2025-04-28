import AddButton from "./AddButton";

interface DirectionButton {
  title: string;
  handleWallModal: () => void;
}

const DirectionButton: React.FC<DirectionButton> = ({
  title,
  handleWallModal,
}) => {
  return (
    <div onClick={handleWallModal} className=" max-w-72 cursor-pointer">
      <div className="w-full flex items-start justify-between">
        <h3 className=" text-accent text-lg">{title}</h3>
        <AddButton />
      </div>
    </div>
  );
};

export default DirectionButton;
