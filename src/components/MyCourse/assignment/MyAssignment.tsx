import StatusBadge from "@/components/ui/StatusBadge";

export interface CourseAssignment {
  id: string;
  name: string;
  submissionDate: Date;
  status: string;
}

interface MyAssignmentProps {
  assignmentList: CourseAssignment[];
}

const MyAssignment = ({ assignmentList }: MyAssignmentProps) => {
  return (
    <div>
      <div className="my-5"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="">
            <tr className="bg-secondary text-[12px] sm:text-base text-[#758179] text-left">
              <th className="py-4 px-2 sm:px-6 font-normal">Service Name</th>
              <th className="py-4 px-2 sm:px-6 font-normal hidden sm:block">
                Submission Date
              </th>
              <th className="py-4 px-2 sm:px-6 font-normal">Status</th>
              <th className="py-4 px-2 sm:px-6 font-normal">Option</th>
            </tr>
          </thead>
          <tbody>
            {assignmentList.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="border border-[#E7E9E8] text-[12px] sm:text-lg"
                >
                  <td className="px-2 py-4  sm:p-4  text-[#758179] bo ">
                    {item.name}
                  </td>
                  <td className="px-2 py-4  sm:p-4 text-[14px] text-[#758179] hidden sm:block">
                    {item.submissionDate.toLocaleDateString()}
                  </td>
                  <td className="px-2 py-4  sm:p-4 ">
                    {<StatusBadge status={item.status} />}
                  </td>
                  <td className="px-2 py-4  sm:p-4 ">
                    <button
                      className={`px-4 py-2 text-sm font-normal border-[1px] rounded-full bg-[#FFFAE9] text-[#F1BB00] border-[#F1BB00] cursor-pointer text-[12px] sm:text-lg`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignment;
