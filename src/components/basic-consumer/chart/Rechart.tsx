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
type DataPoint = {
  name: number;
  value: number;
};

type RechartProps = {
  data: DataPoint[];
};

const Rechart = ({ data }: RechartProps) => {
  return (
    <div className="w-full p-2 bg-white rounded-lg shadow-[0_0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="py-4">
        <h2 className="text-sm font-bold">Cooling Load profile</h2>
        <p className="text-xs text-primary-gray">
          24-hour cooling load in watts
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: "Hour", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Cooling Load",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            name="Cooling Load"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Rechart;
