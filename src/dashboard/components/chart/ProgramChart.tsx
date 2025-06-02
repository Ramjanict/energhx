import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { name: "Page A", program: 65 },
  { name: "Page B", program: 60 },
  { name: "Page C", program: 80 },
  { name: "Page D", program: 150 },
  { name: "Page E", program: 30 },
  { name: "Page F", program: 20 },
  { name: "Page G", program: 10 },
];

const ProgramChart: React.FC = () => {
  return (
    <div className=" h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="right" orientation="right" stroke="#2dad00" />
          <Tooltip />
          <Legend />

          <Bar yAxisId="right" dataKey="program" fill="#2dad00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgramChart;
