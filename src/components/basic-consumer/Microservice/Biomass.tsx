import BioRechart from "@/components/basic-consumer/chart/BioRechart";
import TwoTitle from "@/components/basic-consumer/TwoTitle";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";
import {
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Rectangle,
} from "recharts";
const Biomass = () => {
  const { biomassMicroservice } = useConsumerStore();

  const ranges = biomassMicroservice?.ranges ?? [];
  const results = biomassMicroservice?.results || {};

  const transformedData = Object.entries(ranges).map(([key, value]) => ({
    name: key,
    value: Array.isArray(value) ? value : [], // Ensure value is a number[]
  }));
  type ResultEntry = {
    name: string;
    value: number;
  };

  const data: ResultEntry[] = Object.entries(results || {}).map(
    ([key, value]) => ({
      name: key,
      value: parseFloat(Number(value).toFixed(2)),
    })
  );

  return (
    <div className="flex flex-col gap-10">
      <TwoTitle
        blackHeader=" BIOMASS ENERGY POTENTIAL & SIZING REPORT"
        greenHeader="Bioproduct and Bioenergy
        Potential"
      />

      {transformedData.map((item, i) => (
        <div className="flex flex-col gap-10" key={i}>
          <BioRechart key={i} data={item} />
        </div>
      ))}

      <div className="w-full p-2 bg-white rounded-lg shadow-[0_0_1px_2px_rgba(0,0,0,0.04)] text-xs">
        <div className="py-4">
          <h2 className="text-sm font-bold">Total Results</h2>
        </div>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Biomass;
