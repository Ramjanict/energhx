interface EnergyTable {
  data: any[];
  id?: string;
  building_title?: string;
  title: string;
  EUI?: number;
}
const EnergyTable: React.FC<EnergyTable> = ({
  data,
  title,
  building_title,
  EUI,
  id,
}) => {
  return (
    <div>
      <h2 className="pt-4 pb-2">{title}</h2>

      <table className="w-full  table-auto border-collapse text-secondary-gray text-xs sm:text-base ">
        <tbody>
          {building_title && (
            <>
              <tr>
                <td className="border border-[#9DA6A0] p-2">Building ID</td>
                <td className="border border-[#9DA6A0] p-2">{id}</td>
              </tr>
              <tr>
                <td className="border border-[#9DA6A0] p-2">Building title</td>
                <td className="border border-[#9DA6A0] p-2">
                  {building_title}
                </td>
              </tr>
              <tr>
                <td className="border border-[#9DA6A0] p-2">
                  Objective Function Value (EUI)
                </td>
                <td className="border border-[#9DA6A0] p-2">{EUI}</td>
              </tr>
            </>
          )}

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

export default EnergyTable;
