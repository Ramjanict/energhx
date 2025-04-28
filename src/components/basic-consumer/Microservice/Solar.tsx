import DashBoardHeader from "@/common/DashBoardHeader";
import EnergyConvertChart from "@/components/basic-consumer/chart/EnergyConvertChart";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";

const Solar = () => {
  const { postSolarMicroServices, solarMicroservice } = basicConsumerStore();

  const solarCellData = {
    wavelength: 550, // nm
    sam_ri: 1.5,
    sam_k: 0.01,
    sam_thickness: 0.05, // mm
    substrate_ri: 1.52,
    substrate_thickness: 1000, // mm
    electrode_ri: 2.0,
    electrode_k: 0.05,
    electrode_thickness: 0.5, // mm
    photoanode_ri: 2.5,
    photoanode_k: 0.1,
    photoanode_thickness: 10, // mm
    dye_ri: 1.7,
    dye_k: 0.01,
    dye_thickness: 0.2, // mm
    solar_irradiance: 1000, // W/m^2
    area: 1, // m^2
    num_hours: 10, // hrs
    total_plug_load: 300,
    sam_type: "ramjan",
    custom_sam_ri: 25,
    custom_sam_k: 15,
    substrate_type: "tjrdks",
    custom_substrate_ri: 14,
    custom_substrate_k: 25,
    electrode_type: "rerwea",
    custom_electrode_ri: 25,
    custom_electrode_k: 15,
    custom_photoanode_ri: 14,
    custom_photoanode_k: 17,
    custom_dye_ri: 18,
    custom_dye_k: 23,
  };

  const microService = solarMicroservice?.plots;
  const plots = EnergyConvertChart(microService);

  useEffect(() => {
    postSolarMicroServices(solarCellData);
  }, []);

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
