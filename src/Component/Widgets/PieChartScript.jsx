/* eslint-disable react/prop-types */
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PieChartScript = ({ data, name, value }) => {
  const bookCategories = [
    { name: "Fiction", value: 450 },
    { name: "Non-Fiction", value: 300 },
    { name: "Science", value: 200 },
    { name: "Technology", value: 100 },
    { name: "Arts", value: 50 },
  ];

  const dataBookCategories = data ? data : bookCategories;

  const nameData = name ? name : "name";

  const valueData = value ? value : "value";

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA3377"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const categoryName = dataBookCategories[index][nameData] || ""; // Get category name using index

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "12px", fontWeight: "bold" }} // Adjust text size if needed
      >
        {`${categoryName} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataBookCategories}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={({ category, percent }) =>
            //   `${category} (${(percent * 100).toFixed(0)}%)`
            // }
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey={valueData}
            nameKey={nameData}
          >
            {bookCategories.map((entry, index) => (
              <Cell
                // name={entry}
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
  );
};

export default PieChartScript;
