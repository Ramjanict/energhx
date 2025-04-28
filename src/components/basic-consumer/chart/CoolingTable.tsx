interface ChartTable {
  data: any[];
  heading1: string;
  heading2: string;
  title: string;
}
const CoolingTable: React.FC<ChartTable> = ({
  data,
  title,
  heading1,
  heading2,
}) => {
  return (
    <div>
      <h2 className="pt-4 pb-2">{title}</h2>

      <table className="w-full  table-auto border-collapse text-secondary-gray text-xs sm:text-base ">
        <thead className=" font-normal">
          <tr className="text-left">
            <th className="border border-[#9DA6A0] p-2">
              <h2>{heading1}</h2>
            </th>
            <th className="border border-[#9DA6A0] p-2">
              <h2>{heading2}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => (
            <tr key={i}>
              <td className="border border-[#9DA6A0] p-2">
                <h2>{item.name}</h2>
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2>{item.value}</h2>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoolingTable;
