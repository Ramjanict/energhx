import { Button } from "../ui/button";
import { CiSquarePlus } from "react-icons/ci";

const AddExperience = () => {
  return (
    <div>
      <Button className="bg-primary-green text-white " type="button">
        <CiSquarePlus />
        Add Experience
      </Button>
    </div>
  );
};

export default AddExperience;
