import DashBoardHeader from "@/common/DashBoardHeader";
import EnergyConvertChart from "@/components/basic-consumer/chart/EnergyConvertChart";
import { basicConsumerStore } from "@/store/ConsumerStore";

const Solar = () => {
  const { solarMicroservice } = basicConsumerStore();

  const microService = solarMicroservice?.plots;
  const plots = EnergyConvertChart(microService);

  return (
    <div className="flex flex-col gap-10">
      <DashBoardHeader>SOLAR ENERGY POTENTIAL & SIZING REPORT</DashBoardHeader>
      <div>
        <p className="py-2">Solar Panel Sizing Results:</p>
        <table className=" min-w-full table-fixed border-collapse text-[#394A3F] text-xs sm:text-base">
          <thead>
            <tr className="text-left">
              <th className="border border-[#9DA6A0] p-2">
                <h2>Metric</h2>
              </th>
              <th className="border border-[#9DA6A0] p-2">
                <h2>Value</h2>
              </th>
              <th className="border border-[#9DA6A0] p-2">
                <h2>Unit</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#9DA6A0] p-2">
                <h2>Efficiency</h2>
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2> [{solarMicroservice?.efficiency}_%]</h2>
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2>%</h2>
              </td>
            </tr>
            <tr>
              <td className="border border-[#9DA6A0] p-2">
                {<h2>Energy_output</h2>}
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2>E_{solarMicroservice?.energy_output}kWh</h2>
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2>kwh</h2>
              </td>
            </tr>
            <tr>
              <td className="border border-[#9DA6A0] p-2">
                {<h2>Num_cells</h2>}
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2>{solarMicroservice?.num_cells}n</h2>
              </td>
              <td className="border border-[#9DA6A0] p-2">
                <h2>%</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {plots.map((plot, i) => (
        <div key={i}>
          <DashBoardHeader>{plot.name}</DashBoardHeader>
          <img src={`data:image/jpeg;base64,${plot.value}`} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Solar;
