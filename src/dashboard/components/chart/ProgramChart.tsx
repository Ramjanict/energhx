import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import { useAdminStore } from "@/store/AdminStore/AdminStore";

const ProgramChart = () => {
  const { getAllProgram, allProgram } = useAdminStore();
  useEffect(() => {
    getAllProgram();
  }, [getAllProgram]);

  const processChartData = () => {
    // For price distribution chart
    const priceData = allProgram?.map((program) => ({
      name: program.title,
      price: program.price,
      publishedFor: program.publishedFor,
    }));

    // For publication type pie chart
    const publicationCount = allProgram.reduce((acc, program) => {
      acc[program.publishedFor] = (acc[program.publishedFor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const publicationData = Object.entries(publicationCount).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    // For creation timeline
    const creationData = allProgram.map((program) => ({
      date: format(new Date(program.createdAt), "yyyy-MM-dd"),
      title: program.title,
      price: program.price,
      publishedFor: program.publishedFor,
    }));

    return { priceData, publicationData, creationData };
  };

  const { priceData, publicationData, creationData } = processChartData();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-8 p-4">
      {/* Price Distribution Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Program Price Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#2dad00" name="Price ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Publication Type Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Publication Type Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={publicationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#2dad00"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {publicationData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Creation Timeline Scatter Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Program Creation Timeline
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              dataKey="date"
              name="Date"
              tickFormatter={(date) => format(new Date(date), "MMM dd")}
            />
            <YAxis dataKey="price" name="Price ($)" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p>
                        <strong>{data.title}</strong>
                      </p>
                      <p>Price: ${data.price}</p>
                      <p>Published for: {data.publishedFor}</p>
                      <p>Created: {data.date}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Scatter
              name="Programs"
              data={creationData}
              fill="#8884d8"
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Program Details Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Program Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published For
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allProgram.map((program) => (
                <tr key={program.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {program.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${program.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.publishedFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(program.createdAt), "yyyy-MM-dd HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgramChart;
