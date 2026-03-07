import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "WhatsApp", value: 52.1, color: "#22C55E" },
  { name: "Instagram", value: 22.8, color: "#F472B6" },
  { name: "Facebook", value: 13.9, color: "#38BDF8" },
];

const PlatformChart = () => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 lg:p-8 border border-[#262626] w-full">

      <h3 className="text-white mb-6 font-medium">
        Platform Distribution
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-8">

        {/* Chart */}
        <div className="w-full h-[200px] max-w-[200px] mx-auto md:mx-0">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4 w-full">

          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="text-[#BFBFBF]">
                  {item.name}
                </span>
              </div>

              <span className="text-gray-400">
                {item.value}%
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default PlatformChart;