import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BioRechartProps {
  data: {
    name: string;
    value: number[];
  };
}
const BioRechart = ({ data }: BioRechartProps) => {
  const chartData = data.value.map((value) => ({
    name: data.name,
    value: value,
  }));

  return (
    <div className="w-full p-2 bg-white rounded-lg shadow-[0_0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="py-4">
        <h2 className="text-sm font-bold">
          Graphical representation of ${data.name}
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            name={data.name}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BioRechart;
