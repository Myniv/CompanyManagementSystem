/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartScript = ({ data, name, value }) => {
  const activeMembers = [
    { name: "John Doe", borrowCount: 15 },

    { name: "Jane Smith", borrowCount: 12 },

    { name: "Bob Johnson", borrowCount: 10 },

    { name: "Alice Brown", borrowCount: 9 },
  ];

  const dataActiveMembers = data ? data : activeMembers;

  const nameData = name ? name : "name";

  const valueData = value ? value : "borrowCount";

  const formatRupiah = (value) => {
    return `Rp. ${value.toLocaleString("id-ID")}`;
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataActiveMembers} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey={nameData}
            type="category"
            width={100}
            tick={{ fontSize: 13 }}
            interval={0} // Show all labels
            angle={-7} // Rotate labels
          />

          <YAxis
            type="number"
            tickFormatter={formatRupiah}
            tick={{ fontSize: 13 }}
          />

          <Tooltip formatter={(value) => formatRupiah(value)} />

          <Bar dataKey={valueData} fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartScript;
