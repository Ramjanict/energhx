import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect } from "react";
interface AllCourse {
  handleCourseChange: (value: string) => void;
  selectedCourseId: string;
}
const AllCourse: React.FC<AllCourse> = ({
  handleCourseChange,
  selectedCourseId,
}) => {
  const { allCourse, getAllCourse } = useAdminStore();

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);
  return (
    <div className="">
      <Select onValueChange={handleCourseChange} value={selectedCourseId}>
        <SelectTrigger className="outline-none text-primary-gray rounded ">
          <SelectValue placeholder="Choose Course" />
        </SelectTrigger>
        <SelectContent className="bg-light-green">
          {allCourse?.map((course) => (
            <SelectItem key={course.id} value={course.id}>
              {course.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AllCourse;
