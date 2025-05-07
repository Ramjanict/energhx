import DashBoardHeader from "@/common/DashBoardHeader";
import Rechart from "@/components/basic-consumer/chart/Rechart";
import OverviewTable from "@/components/basic-consumer/OverviewTable";
import TwoTitle from "@/components/basic-consumer/TwoTitle";
import { basicConsumerStore } from "@/store/ConsumerStore";
import EnergyConvertChart from "@/components/basic-consumer/chart/EnergyConvertChart";
import CoolingTable from "@/components/basic-consumer/chart/CoolingTable";
import SummaryTable from "@/components/basic-consumer/chart/SummaryTable";
import EnergyTable from "@/components/basic-consumer/chart/EnergyTable";
import ConvertToMapData from "../chart/ConvertToMapData";
import { useEffect } from "react";

const tableList1 = [
  "Gross Floor Area",
  "Number of Floors Above-Grade",
  "...",
  "Number of Occupants",
  "Number of PCs and/or Laptops",
  "Use (hours/week)",
  "Principal HVAC Type",
  "Principal Lighting Type",
];
const tableList2 = [
  "Roof",
  "Type",
  "...",
  "Wall",
  "Winddow",
  " . ",
  "Appliances",
  " .",
];
const RoomOverView = () => {
  const { energyAudit, getEnergyAudit, isLoading } = basicConsumerStore();

  useEffect(() => {
    const fetchData = async () => {
      await getEnergyAudit();
    };
    fetchData();
  }, []);

  if (isLoading || !energyAudit || energyAudit.length === 0) {
    return (
      <div>
        <h2>The request analysis/v3/energy/audit did not give any response</h2>
      </div>
    ); // you can use a spinner instead
  }
  //Building cooling and energy
  const totalBuildingInfo = energyAudit[0]["Cooling Load Calculation"]; // BuildingInfo obj
  const buildingCooling = ConvertToMapData(totalBuildingInfo);
  const EUITable =
    energyAudit[0]["Energy Audit, Characterization, Optimization"][
      "Optimal-Parameters"
    ];
  const buildingEnergy = EnergyConvertChart(EUITable);
  const BuildingEUI =
    energyAudit[0]["Energy Audit, Characterization, Optimization"][
      "Objective-Function-Value-(EUI)"
    ];

  // EV-Battery Sizing
  const evBattery = energyAudit[0]["EV-Battery Sizing"]; // its an array;
  console.log("energyAudit[0]");

  //Room under Building cooling and energy
  const totalRoomsInfo =
    energyAudit[0]["Energy Audit, Characterization, Optimization"].rooms; //its an array

  return (
    <div className="flex flex-col gap-10">
      <TwoTitle
        blackHeader=" BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
        greenHeader="OVERVIEW"
      />
      <div>
        <DashBoardHeader className="!text-lg !text-[#207B00] !font-normal tracking-widest pb-3">
          BUILDING INFORMATION
        </DashBoardHeader>

        <SummaryTable />
      </div>
      <div>
        <DashBoardHeader className="!text-lg !font-normal !text-[#207B00]  tracking-widest pb-3">
          DATA SUMMARY
        </DashBoardHeader>

        <p className="text-secondary-gray text-sm">
          This report was generated from by the EnerghxPlus tool, developed by
          Energhx Green Energy Corporation, Ottawa, Canada. EnerghxPlus is a
          digital energy management tool for monitoring of energy demand,
          management of energy utilization, designing of renewable energy system
          towards a net-zero energy management, and controlling thermal comfort
          & indoor air quality in residential and commercial building envelopes.
          It also facilitates third-party data collection and reporting from
          clients’ local distribution companies. This report follows the
          ASHRAE/ACCA Standard 211P, Standard for Residential and Commercial
          Building Energy Audits. It also includes additional data fields
          required by specific cities, where applicable. The audit team listed
          above is responsible for any information entered and reported through
          Asset Score. DOE and PNNL do not warranty data accuracy, completeness,
          legality, and reliability.
        </p>
      </div>
      <div>
        <TwoTitle
          blackHeader=" BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
          greenHeader="   CONTACT INFORMATION AND AUDIT DETAIL"
        />
      </div>
      <div>
        <DashBoardHeader className="!text-lg !text-[#207B00] !font-normal tracking-widest pb-3">
          Number of Floors Above-Grades
        </DashBoardHeader>

        <OverviewTable item={tableList1} />
      </div>
      <div>
        <DashBoardHeader className="!text-lg !text-[#207B00] !font-normal tracking-widest pb-3">
          BUILDING TYPE & BEHAVIOURAL CHARACTERISTICS
        </DashBoardHeader>

        <OverviewTable item={tableList2} />
      </div>
      <div>
        {/* Building analysis */}

        <TwoTitle
          blackHeader=" BUILDING ENERGY AUDIT & ANALYSIS DATA REPORT"
          greenHeader="FACILITY DESCRIPTION AND PERFORMANCE"
        />
        <h2 className="text-primary-gray text-2xl">WHOLE BUILDING ANALYSIS</h2>
      </div>
      {/* Building cooling and Energy Audit  */}
      <div>
        <h2 className="py-2">{`COOLING LOAD ANALYSIS FOR BUILDING ${energyAudit[0].title}`}</h2>
        <Rechart data={buildingCooling} />
      </div>
      <CoolingTable
        data={buildingCooling}
        title={`Total Cooling Load  ${energyAudit[0].title}`}
        heading1="Hour"
        heading2="Cooling Load (kW)"
      />
      <EnergyTable
        data={buildingEnergy}
        title={`Energy Audit  ${energyAudit[0].title}`}
        id="#06"
        EUI={parseFloat(BuildingEUI.toFixed(2))}
        building_title={`${energyAudit[0].title}`}
      />

      <div className=" flex flex-col gap-10">
        {evBattery.map((item) => (
          <>
            <EnergyTable
              data={EnergyConvertChart(item)}
              title={`EV BATTERY `}
            />
          </>
        ))}
      </div>

      {/* Building's room analysis */}
      <TwoTitle
        blackHeader="ENERGY AUDIT, CHARACTERIZATION, AND OPTIMIZATION"
        greenHeader="Energy Audit, Characterization, and Optimization Values"
      />
      <div className="flex flex-col gap-10">
        {totalRoomsInfo.map((room, i) => (
          <div className="flex flex-col gap-10" key={i}>
            <TwoTitle
              blackHeader="ROOM-BY-ROOM ANALYSIS"
              greenHeader={room.title}
            />
            <Rechart
              data={ConvertToMapData(
                room["cooling load"]["total cooling load profile"]
              )}
            />
            <CoolingTable
              data={ConvertToMapData(
                room["cooling load"]["total cooling load profile"]
              )}
              title={`Total Cooling Load for ${room.title}`}
              heading1="Hour"
              heading2="Cooling Load (kW)"
            />
            <EnergyTable
              data={EnergyConvertChart(room["energy audit"])}
              title={`Energy Audit  ${room.title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomOverView;
