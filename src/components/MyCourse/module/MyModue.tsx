import MySingleModuleCard from "./MySingleModule";
import { Course } from "./MySingleModule";

interface modulePops {
  moduleList: Course[];
}

const MyModue = ({ moduleList }: modulePops) => {
  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        {moduleList.map((course) => (
          <MySingleModuleCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyModue;
