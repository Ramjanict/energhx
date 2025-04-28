import BioRechart from "@/components/basic-consumer/chart/BioRechart";
import TwoTitle from "@/components/basic-consumer/TwoTitle";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";
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
  const { postBiomassMicroServices, biomassMicroservice } =
    basicConsumerStore();

  const biomassCellData = {
    feedstock: "animal_dung",
    t: 30,
    TS: 0.3,
    VS: 0.8,
    FADin: 120,
    VADCH4: 236,
    THTC: 1073,
    QAD: 86400,
    SADin: 4,
    XADin: 2,
    SHTC0: 0,
    ZAD0: 0,
    CO20: 0,
    H20: 0,
    NH30: 0,
    μADmax: 0.35,
    D: 0.029,
    Kd: 0.02,
    Ks: 150,
    KI: 0.5,
    Yx: 0.82,
    Ksx: 0.983,
    Kmx: 0.4,
    Ys: 4.35,
    YCH4: 0.27,
    YCO2: 0.4,
    YH2: 0.03,
    YNH3: 0.01,
    Ta: 473,
    A: 1,
    αs: 1,
    ρCH4: 0.75,
  };

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

  useEffect(() => {
    postBiomassMicroServices(biomassCellData);
  }, []);
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
