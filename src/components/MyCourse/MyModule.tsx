import MySingleModuleCard, { Course } from "./MySingleModuleCard";

interface modulePops {
  moduleList: Course[];
}

const MyModule = ({ moduleList }: modulePops) => {
  return (
    <div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {moduleList.map((course) => (
          <MySingleModuleCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyModule;
