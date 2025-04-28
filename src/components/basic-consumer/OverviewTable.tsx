interface TableListProps {
  item: string[];
}

const OverviewTable: React.FC<TableListProps> = ({ item }) => {
  return (
    <table className="min-w-full table-fixed border-collapse text-[#394A3F]">
      <tbody>
        {item.map((list, index) => (
          <tr
            key={index}
            className="border border-[#9DA6A0] border-b-0 last:border-b"
          >
            <td className="p-2 border-r border-[#9DA6A0] w-1/2">
              <h2>{list}</h2>
            </td>
            <td className="p-2 w-1/2"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OverviewTable;
