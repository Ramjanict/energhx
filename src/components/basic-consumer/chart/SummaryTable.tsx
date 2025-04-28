const SummaryTable = () => {
  return (
    <table className=" min-w-full table-fixed border-collapse text-[#394A3F] text-xs sm:text-base">
      <thead>
        <tr>
          <th className="border border-[#9DA6A0] p-2">
            <h2>Building Address</h2>
          </th>
          <th className="border border-[#9DA6A0] p-2">
            <h2>Report Type: [Basic/Standard/Premium]</h2>
          </th>
          <th className="border border-[#9DA6A0] p-2">
            <h2>Report Date: October, 20, 2024</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-[#9DA6A0] p-2">
            <h2>123 Main Street Washington, DC 20037</h2>
          </td>
          <td className="border border-[#9DA6A0] p-2">
            <h2>Building Type: [Residential/Bungalow]</h2>
          </td>
          <td className="border border-[#9DA6A0] p-2">
            <h2>Auditor’s ID: [Consumer/Server/Developer]</h2>
          </td>
        </tr>
        <tr>
          <td className="border border-[#9DA6A0] p-2">
            <h2>Building Address</h2>
          </td>
          <td className="border border-[#9DA6A0] p-2">
            <h2>Building Address</h2>
          </td>
          <td className="border border-[#9DA6A0] p-2">
            <h2>Building Address</h2>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SummaryTable;
